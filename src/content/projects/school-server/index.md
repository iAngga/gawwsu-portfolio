---
title: One School Server, ~70 Containers
date: 2026-10-21
summary: How I host student projects, school apps, monitoring and remote access on a single Docker host.
cover: ./cover.png
coverAlt: Pixel art grid of small colored boxes, like containers on one server
tags: [devops, docker, linux]
role: Sole technician, setup and maintenance
tools: [Docker, Docker Compose, Cloudflare Tunnel, ZeroTier, Portainer, Prometheus, Grafana]
pixelated: true
featured: true
---

## The problem

The software engineering (RPL) department needed somewhere to host student and teacher web projects, and the school runs a few internal apps too. There is one server, no cloud budget, and one technician: me. Projects arrive in every shape: PHP, Node.js, different MySQL versions, some with Redis or a message queue.

## How it's set up

Everything runs in Docker on one Linux server, around 70 containers at the moment.

- **One folder per app.** Each project gets its own folder with a `docker-compose.yml`. A typical web app is three containers: nginx in front, the app (PHP-FPM or Node.js), and its own database.
- **A reusable Dockerfile template** for the most common PHP setup, so a new project starts from something that already works.
- **A port plan.** Web apps, databases and caches each get their own port range, so I can tell what a port is just by looking at it.
- **Public access through Cloudflare Tunnel.** Apps that need to be reachable from outside go through `cloudflared`, so no ports are opened on the school router.
- **Private access through ZeroTier** for admin work from outside the school network.
- **A self-hosted RustDesk server** for remote support on school machines.

## Tools that keep it manageable

| Need | Tool |
| --- | --- |
| See and restart containers from a browser | Portainer |
| Quick database access for students | Adminer |
| Share files with teachers | copyparty |
| Server metrics | Prometheus, node-exporter, Grafana, Beszel |
| Web application firewall | SafeLine |
| Small automations | Node-RED |

## What I learned

- **Isolation pays off.** One student's broken project never takes down another one, and a project can be rebuilt from its folder.
- **Old containers pile up.** Backups and test copies stay around unless someone cleans them up.
- **Not every port should be published.** Docker publishes ports on all interfaces by default and goes around the host firewall. Databases and caches only need to be reachable by their own app, so tightening this is my next task.

<!-- TODO: add one real incident: what broke, how you noticed, how you fixed it -->

## What's next

- Keep databases and caches on internal Docker networks only
- Alerts from Prometheus, not just dashboards
- A GitHub Actions pipeline that deploys a project to this server on push
