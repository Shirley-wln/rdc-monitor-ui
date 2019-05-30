#!/bin/bash
chmod 777 -R rdc-monitor-ui
docker build --no-cache -f Dockerfile -t supermap/rdc-monitor-ui:latest .
