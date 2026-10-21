---
title: 30+ School Apps Online with Cloudflare Tunnel
date: 2026-10-21
summary: How one school server serves 30+ web apps on public domains without opening a single port, and what I'm changing next.
cover: ./cover.png
coverAlt: Pixel art of a cloud connected by a dotted line to a server rack, with users on both sides
tags: [devops, networking, cloudflare]
role: Setup and maintenance
tools: [Cloudflare Tunnel, cloudflared, Docker, Nginx]
pixelated: true
featured: true
---

## The problem

Students and teachers build web apps that need to be reachable from outside the school: report cards, a guest book, duty rosters, exam apps, student projects. But the school network has no public IP I can use and no port forwarding on the router.

I first used **ngrok**. It worked for demos, but it was never smooth for apps that need to stay online every day. <!-- TODO: what exactly went wrong with ngrok (random URLs, session limits, disconnects?) -->

So I moved all web apps to **Cloudflare Tunnel**. Game servers go through playit.gg instead, since they need raw TCP/UDP ([game server stack](/projects/game-server-stack/)).

## How it works today

```text
Visitor
  │  https://app-a.example.id
  ▼
Cloudflare edge  (DNS, TLS, caching)
  │  outbound-only tunnel, no open ports
  ▼
cloudflared  (container on the school server)
  ├── app-a.example.id   → http://localhost:8000
  ├── app-b.example.id   → http://localhost:8001
  ├── files.example.id   → http://<other LAN host>:3923
  └── ... 31 routes in total
```

- `cloudflared` opens an **outbound** connection to Cloudflare, so nothing on the school router has to be opened.
- The tunnel is managed from the Cloudflare dashboard. Each **published application** maps a hostname to a local service.
- The routes cover three domains: two for school and student projects, one for my own tools.
- A few routes point to other machines on the school LAN, not just the Docker host.
- Routes are matched **top to bottom**; the first match wins.

## Running cloudflared with Compose

Cloudflare's dashboard gives you a one-line `docker run` command with the token in it. I turned it into a Compose file so the token lives in `.env` and the container is easy to recreate:

```yaml
services:
  cloudflared:
    image: cloudflare/cloudflared:latest   # pin a version once it's stable
    container_name: cloudflared
    restart: unless-stopped
    network_mode: host                     # so "localhost:<port>" in the routes means the server itself
    command: tunnel --no-autoupdate --metrics 127.0.0.1:2000 run
    environment:
      TUNNEL_TOKEN: ${TUNNEL_TOKEN}
```

The `--metrics` flag exposes tunnel metrics, so Prometheus (already running on the same server) can scrape them and Grafana can show whether the tunnel is healthy.

## Problems and fixes

| Symptom | Cause | Fix |
| --- | --- | --- |
| **502 Bad Gateway** | The app is down, or the route points to the wrong port | `docker ps` to check the app, `curl -I http://localhost:<port>` from the server, then fix the route |
| 502 only when cloudflared runs in Docker | `localhost` inside a normal container means the container itself, not the server | Run cloudflared with `network_mode: host`, or put it on the same Docker network and use the container name |
| **Redirect loop or "mixed content"** | The app thinks it runs on plain HTTP behind the tunnel | Set the app URL to `https://...` and trust the proxy headers (e.g. Laravel `TrustProxies`, `APP_URL`) |
| **Upload fails for big files** | Cloudflare's free plan caps a request body at 100 MB | Use chunked uploads, or move big files over the LAN / ZeroTier instead of the tunnel |
| **524 timeout** | A request takes longer than about 100 seconds | Make long jobs run in the background and poll for the result |
| **Dev server blocked or hot reload broken** | A Vite dev server is exposed instead of a real build; it rejects unknown hosts and needs websockets | Build the frontend and serve the static files. For a quick demo, add the hostname to Vite's `server.allowedHosts` |
| **App under a sub-path returns 404** | The route uses a path (e.g. `/guacamole`), but the app expects to live at `/` | Make the route path match the path the app expects, or give the app its own subdomain |
| **Wrong app shows up** | Two routes overlap; the first match wins | Put more specific routes higher in the list |
| **Every site down at once** | The cloudflared container stopped | `restart: unless-stopped`, and an alert on the tunnel metrics |

<!-- TODO: add one real story: which of these hit you, how you noticed, and how long it took to fix -->

## What I'm changing next

1. **One Nginx reverse proxy in front of everything.** One wildcard route (`*.example.id`) goes from the tunnel to Nginx, and Nginx picks the app by hostname. Apps join a shared Docker network and stop publishing ports on the host at all.
2. **A clean port and folder layout.** Moving projects out of a home folder into the standard `/srv` layout:
   ```text
   /srv
   ├── infra/   # cloudflared, nginx, monitoring
   ├── apps/    # one folder per web app
   └── games/   # game servers
   ```
3. **Login in front of admin tools** with Cloudflare Access, so tools like the container dashboard and the database UI need a login before the page even loads.
4. **Tunnel metrics and alerts** in the existing Prometheus and Grafana setup.
