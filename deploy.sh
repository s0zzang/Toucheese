#!/bin/bash
REPOSITORY=/home/ubuntu/deploy

cd $REPOSITORY

sudo pnpm install

sudo npx pm2 reload all