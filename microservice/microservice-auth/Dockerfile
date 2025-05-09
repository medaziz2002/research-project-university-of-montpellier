# Stage 1: Build the JAR
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre
WORKDIR /app


# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar
COPY --from=builder /app/src/main/resources/sql/ /app/resources/sql/

ENV SPRING_DATASOURCE_URL=jdbc:mysql://mysql-service.default.svc.cluster.local:3306/AuthenTER?createDatabaseIfNotExist=true&serverTimezone=UTC
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=  

# Eureka configuration
ENV EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server.default.svc.cluster.local:8761/eureka
ENV EUREKA_INSTANCE_PREFERIPADDRESS=true
ENV EUREKA_INSTANCE_HOSTNAME=eureka-server.default.svc.cluster.local

# JPA/JWT configs
ENV SPRING_JPA_HIBERNATE_DDL_AUTO=update
ENV APPLICATION_SECURITY_JWT_SECRET_KEY=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
ENV MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=*
# Expose the application port


# Configure connection to Config Server
ENV SPRING_APPLICATION_NAME=microservice-authentification
ENV SPRING_CONFIG_IMPORT=configserver:http://config-server.default.svc.cluster.local:9090
# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

EXPOSE 8094

ENTRYPOINT ["java", "-jar", "app.jar"]