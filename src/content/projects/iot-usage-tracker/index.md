---
title: IoT Electricity & Water Tracker
date: 2025-06-01
summary: ESP32 sensors in a FreeCAD-designed case, sending usage data to a multi-container Docker backend.
cover: ./cover.png
coverAlt: Pixel art of a microchip next to a water drop and a lightning bolt
tags: [iot, docker]
tools: [ESP32, FreeCAD, Docker]
pixelated: true
draft: true
---

<!-- TODO: still a draft. Fill in the gaps below, then remove "draft: true" -->

## What it does

Tracks electricity and water usage in real time. An ESP32 reads the sensors, and a small backend running in Docker stores and shows the data.

## Hardware

- ESP32 with a water flow sensor <!-- TODO: which electricity sensor -->
- A case designed in FreeCAD to hold the board and sensor <!-- TODO: 3D printed? add a photo to gallery -->

## Software

A multi-container Docker setup for collecting, storing and showing the readings. <!-- TODO: which containers, e.g. MQTT broker, database, dashboard -->

## Background

I started working with IoT during my internship at PT Forit, where I taught with and helped research plug-and-play IoT learning kits.
