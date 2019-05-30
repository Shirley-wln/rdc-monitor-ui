FROM registry.ispeco.com/node:alpine
MAINTAINER weilina@supermap.com

RUN mkdir -p /etc/icloud/rdc-monitor-ui
ADD rdc-monitor-ui/ /etc/icloud/rdc-monitor-ui/
WORKDIR /etc/icloud/rdc-monitor-ui
ENV IMANAGER_API_SERVER http://127.0.0.1:8390
ENV IMANAGER_USERNAME admin
ENV IMANAGER_PASSWORD admin
ENV OS linux
EXPOSE 8080
CMD ["node","startup.js"]
