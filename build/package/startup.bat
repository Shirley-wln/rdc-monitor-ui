@echo off
SET ISPECO_PUBLISHER_UI_URL=http://127.0.0.1:8991
set DASHBOARD_BACKEND_URL=ignore
set FILE_MANAGER_URL=http://127.0.0.1:80
set K8S_DASHBOARD_URL = 'http://127.0.0.1:9090'
set K8S_NAMESPACE = 'default'
set FILEMANAGER_ROOT = '/'
set PRODUCT_TYPE = 'cloudnative'
node startup.js