#!/bin/bash
REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo pnpm install

sudo pnpm exec pm2 reload all