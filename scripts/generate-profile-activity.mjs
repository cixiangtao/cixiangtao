#!/usr/bin/env node
// Composition only: upstream snk generates the animation; upstream 3D-contrib
// aggregates data and renders both charts. See scripts/profile-activity.md.
await import('./profile-activity/generate.mjs');
