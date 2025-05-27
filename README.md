# Ter Behome

**Ter Behome** est une plateforme de réservation de biens immobiliers, où chaque **propriétaire** peut publier son logement et chaque **locataire** peut effectuer une réservation en toute simplicité.

## 🏗️ Description

Ce projet a été réalisé dans le cadre du projet de fin d'année universitaire 2024/2025. Il propose une solution complète pour la mise en relation entre propriétaires et locataires, avec gestion des annonces, réservations, et interactions entre utilisateurs.

## 🚀 Technologies utilisées

- ⚙️ **Backend** : Architecture **microservices** avec **Spring Boot**
- 🖥️ **Frontend** : Application web développée avec **Angular**
- ☁️ **Déploiement** : Environnement **Kubernetes** avec **Nginx Ingress Controller**

## 📦 Structure du projet

/backend/ # Code des microservices Spring Boot
/frontend/ # Application Angular
/manifest/ # Fichiers YAML de déploiement Kubernetes

## 📋 Prérequis

- `kubectl` installé et configuré
- Cluster Kubernetes opérationnel (Minikube)
- Ingress Nginx installé sur le cluster

## 🛠️ Lancement du projet

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/ton-utilisateur/ter-behome.git
   cd research-project-university-of-montpellier/
2. Appliquer les manifestes Kubernetes :
  ```bash
  cd manifest/
  kubectl apply -f .
