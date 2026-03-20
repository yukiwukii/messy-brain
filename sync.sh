#!/bin/bash
VAULT="/Users/yuki/Library/Mobile Documents/iCloud~md~obsidian/Documents/Research"
QUARTZ="/Users/yuki/Documents/quartz"

rsync -a --delete --exclude='.git' "$VAULT/" "$QUARTZ/content/"
cd "$QUARTZ" && npx quartz sync
