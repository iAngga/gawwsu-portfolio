---
title: Game Server Stack
date: 2026-10-21
summary: Minecraft, Terraria and Valheim servers in Docker for a school community, reachable from anywhere without port forwarding.
cover: ./cover.png
coverAlt: Pixel art of a server rack next to a grass block with a tunnel line going up
tags: [devops, docker, linux]
role: Setup and maintenance
tools: [Docker, Docker Compose, playit.gg, Linux]
links:
  - label: Source on GitHub
    url: https://github.com/iAngga/game-server-stack
pixelated: true
featured: true
---

## The problem

Students and friends wanted to play together on modded servers, but the server sits on a school network: no public IP and no access to the router for port forwarding. Every new "season" also meant a different game, version or mod list, and setting it up by hand each time was slow and easy to break.

## What I built

A set of game servers that each live in their own folder with one `docker-compose.yml`, plus a [playit.gg](https://playit.gg) agent that tunnels players in from outside.

| Game | Image | Notes |
| --- | --- | --- |
| Minecraft (NeoForge 1.21.1) | `itzg/minecraft-server:java21` | modded, 8 GB memory limit, tuned G1GC flags |
| Minecraft (Forge 1.12.2) | `itzg/minecraft-server:java8` | an older season, needs Java 8 |
| Terraria + mods | `jacobsmile/tmodloader1.4` | mods installed from Steam Workshop IDs |
| Terraria vanilla 1.4.5 | `ryshe/terraria` | world auto-created from a special seed |
| Valheim | `lloesche/valheim-server` | crossplay enabled |

The game servers and the playit agent run on the same Linux host. The agent uses the host network, so every tunnel on the playit.gg dashboard simply points to `127.0.0.1:<port>`.

## Decisions

- **One folder per game.** A season can be started, stopped or wiped without touching the others. Old seasons stay on disk as their own folders, so a world can be brought back later.
- **One shared playit agent on my server.** Fewer moving parts than one agent per game. The public repo also lets each game start its own agent with a compose profile, for people who only host one server.
- **Secrets in `.env`.** Passwords, RCON and the playit key stay out of git. World data lives in `data/` and is git-ignored.
- **Pinned images for modded servers.** Mod loaders break easily between versions, so modded servers use a pinned image tag and loader version.

## Problems I ran into

- **A mod that had to go.** On the modded Terraria season I removed one storage mod and its dependency from the mod list. <!-- TODO: what actually happened (crash on start? broken chests?) -->
- **An empty server password.** The tModLoader container misbehaved when the password was left empty, so I now always set it explicitly. <!-- TODO: the symptom -->
- **World file path.** On the vanilla Terraria server, the world-name variable did not behave the way I expected, so I pass the full world path, size, seed and difficulty as start arguments instead.
- **`FORCE_REDOWNLOAD` left on.** It re-downloads the server files on every restart. Now I only turn it on when changing versions.
- **Offline mode and operators.** The modded Minecraft server runs in offline mode, which means anyone who knows an operator's name can join as them. Locking this down is on my list.

<!-- TODO: add a story about lag, memory or a crash, and how many players joined a season -->

## Seasons and backups

<!-- TODO: how a new season starts, how often worlds are backed up, and whether you ever restored one -->
Each season gets a new folder and a new world. When a season ends, its folder stays on the server, so the world is still there if anyone wants to go back.

## What I'd do next

- Automatic world backups on a schedule
- Server metrics in the Grafana dashboard that already runs on the same host
- A small status page that shows which servers are online
