# EU-platform
Platform for hosting European Union (EU) activities


node:
    container_name: web-service-REST
    build: ./server
    ports:
      - "8080:8080"
    volumes:
      - ./server:/app