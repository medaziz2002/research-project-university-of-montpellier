# Single-stage build (development-friendly)
FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Environment variables for Config Server
ENV SPRING_APPLICATION_NAME=microservice-gateway
ENV SPRING_CONFIG_IMPORT=configserver:http://config-server.default.svc.cluster.local:9090
ENV EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server.default.svc.cluster.local:8761/eureka/
ENV SERVER_PORT=8888

# Run directly via Maven
CMD ["mvn", "spring-boot:run"]

EXPOSE 8888