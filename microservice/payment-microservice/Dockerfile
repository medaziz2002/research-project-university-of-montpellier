# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built JAR file
COPY --from=builder /app/target/*.jar app.jar

# PayPal configuration
ENV PAYPAL_CLIENT_ID=AXQ-L7tQ8jNI7Cz9tRhBa7OpCSaLjEmmSXkJ_WFz7tieRR_-gSMo9a_w5jaUQWb7cubyclQRg3WglJ4Q
ENV PAYPAL_CLIENT_SECRET=EEWh_km7Skr-L-4nQ1LyuZ7w9ZaPdL2L-Kmlky77p1SeKj5Y3fo9wFvnhA6RaUNasraLcmjsycEkI4bd
ENV PAYPAL_MODE=sandbox

# JWT configuration
ENV APPLICATION_SECURITY_JWT_SECRET_KEY=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
ENV APPLICATION_SECURITY_JWT_EXPIRATION=86400000

# Eureka configuration
ENV EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server.default.svc.cluster.local:8761/eureka
ENV EUREKA_CLIENT_REGISTERWITHEUREKA=true
ENV EUREKA_CLIENT_FETCHREGISTRY=true

# Actuator and error handling
ENV SERVER_ERROR_INCLUDE_MESSAGE=always
ENV MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=*

# Expose the application port
EXPOSE 8080

# Run the application with Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
