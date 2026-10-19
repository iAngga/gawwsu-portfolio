---
title: Homelab Notes (placeholder)
date: 2026-09-01
summary: Example of a Linux project entry. Self-hosted services, Docker, and the configs behind them.
cover: ./cover.png
coverAlt: Placeholder pixel art of a terminal window with a penguin
tags: [linux, docker]
tools: [Linux, Docker, Nginx]
links:
  - label: Source on GitHub
    url: https://github.com/iAngga
pixelated: true
---

<!-- TODO: contoh entri project Linux. Ganti atau hapus folder ini. -->

Use this format for Linux or infra projects: what problem it solves, the stack, and the interesting parts.

## Stack

| Part    | What            |
| ------- | --------------- |
| OS      | your distro     |
| Runtime | Docker Compose  |
| Proxy   | Nginx / Caddy   |

## Example config

```yaml
services:
  app:
    image: nginx:alpine
    ports:
      - "8080:80"
    restart: unless-stopped
```

For a long write-up, put the story in the blog and link it here.
