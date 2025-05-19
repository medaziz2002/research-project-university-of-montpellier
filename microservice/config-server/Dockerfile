# Use Maven + JDK image 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
FROM maven:3.9.6-eclipse-temurin-17

# Set working directory
WORKDIR /app

# Copy the entire project (including pom.xml and src)
COPY . .

# Expose the server port
EXPOSE 9090

# Set environment variables (same as application.properties)
ENV SERVER_PORT=9090
ENV SPRING_APPLICATION_NAME=config-server
ENV SPRING_PROFILES_ACTIVE=git
ENV SPRING_CLOUD_CONFIG_SERVER_GIT_URI=https://github.com/malik-mnsr/kubernetesConfig
ENV SPRING_CLOUD_CONFIG_SERVER_GIT_CLONE_ON_START=true
ENV SPRING_CLOUD_CONFIG_SERVER_GIT_DEFAULT_LABEL=main
ENV MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=*
ENV LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_CLOUD_CONFIG=DEBUG
ENV SPRING_CLOUD_CONFIG_SERVER_GIT_USERNAME=malik.mnsr
ENV SPRING_CLOUD_CONFIG_SERVER_GIT_PASSWORD=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
# Run the app directly via Maven (no JAR packaging)
CMD ["mvn", "spring-boot:run"]
