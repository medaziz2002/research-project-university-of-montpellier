# build_and_docker.sh
```bash
#!/usr/bin/env bash
set -euo pipefail

# Script pour compiler les microservices et construire les images Docker via Minikube
# Ordre :
# - microservice-auth
# - payment-microservice
# - gateway-service
# - discovery-server
# - config-server
# - bien

services=( 
  "microservice-auth:auth-service"
  "payment-microservice:payment-service"
  "gateway-service:gateway-service"
  "discovery-server:discovery-service"
  "config-server:config-service"
  "bien:bien-service"
)

# Charger l'environnement Docker de Minikube une seule fois
echo "Configuration de l'environnement Docker Minikube..."
eval \\$(minikube docker-env)

echo "Début de la compilation et du build Docker pour chaque service..."
for entry in "${services[@]}"; do
  IFS=":" read -r dir image <<< "$entry"
  echo "\n--- Processing $dir ---"
  cd "$dir"
  echo "Compilation de $dir..."
  ./mvnw clean package -DskipTests
  echo "Construction de l'image Docker $image..."
  docker build -t "$image" .
  cd - > /dev/null
done

echo "Tous les services ont été compilés et leurs images Docker générées avec succès."
```