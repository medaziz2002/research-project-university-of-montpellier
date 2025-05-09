# Use Maven + JDK image
FROM maven:3.9.6-eclipse-temurin-17

# Set working directory
WORKDIR /app

# Copy only necessary files (pom.xml + src)
COPY pom.xml .
COPY src ./src

# Expose Eureka server port
EXPOSE 8761

# Set environment variables for Config Server
ENV SPRING_APPLICATION_NAME=microservice-eureka
ENV SPRING_CONFIG_IMPORT=configserver:http://config-server.default.svc.cluster.local:9090

# Run the app directly via Maven (no JAR packaging)
CMD ["mvn", "spring-boot:run"]