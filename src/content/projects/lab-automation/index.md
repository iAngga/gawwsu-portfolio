---
title: Running 8 Computer Labs Solo
date: 2026-10-01
summary: Batch scripts, NetSupport School and MikroTik scripts that let one technician look after eight school labs and run national exams.
cover: ./cover.png
coverAlt: Pixel art of eight monitors with an arrow sending something to all of them
tags: [sysadmin, windows, networking]
role: Sole lab technician
tools: [Batch, NetSupport School, MikroTik RouterOS, Diskpart]
pixelated: true
---

## The problem

I am the only technician for eight computer labs at a vocational high school. Installing an app, fixing a setting or preparing an exam means touching every PC. Doing that by hand, one machine at a time, does not scale.

## What I built

- **Batch scripts for repeat jobs:** silent app installs and uninstalls, desktop shortcuts, shrinking partitions with Diskpart, and setting up the exam browser.
- **NetSupport School to push them out.** Instead of walking to each PC, I send a script to a whole lab at once and watch it run.
- **Exam rollout for the national computer-based test (TKA).** Installing and checking the exam browser on every lab PC before test day.
- **MikroTik RouterOS scripts** that block games during school hours and harden the firewall.

## Beyond the scripts

Before the national exams I wrote an infrastructure report for the school leadership covering lab air conditioning repairs, the internet bandwidth we needed, and the fiber optic network for exam day.

<!-- TODO: results with real numbers, e.g. "installing an app on a lab went from about X minutes to Y", PCs per lab, how exam day went -->

## What I learned

<!-- TODO: one or two lessons, e.g. always test a script on one PC before pushing it to a whole lab -->
Test on one machine first. A script that works on my PC can still fail on a lab PC with a different setup, and pushing a broken script to a whole lab costs more time than it saves.
