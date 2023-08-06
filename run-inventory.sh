#!/bin/bash

pipenv sync
docker compose -f docker-compose.inventory.yaml up -d --build
