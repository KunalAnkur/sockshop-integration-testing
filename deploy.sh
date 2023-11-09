#!/usr/bin/env bash
GREEN='\033[0;32m'
NC='\033[0m'

printf "${GREEN}Docker Compose Up${NC}\n" && \
docker-compose -f docker-compose.yml -p localdeploy up

docker-compose -p localdeploy kill
docker-compose -p localdeploy rm -f
