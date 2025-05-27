# Ter Behome 

**Ter Behome** est une plateforme de réservation de biens immobiliers, où chaque **propriétaire** peut publier son logement et chaque **locataire** peut effectuer une réservation en toute simplicité.

<p align="center">
  <img src="logo_BeHome.jpg" alt="BeHome Logo" width="200"/>
</p>

## 🏗️ Description

Ce projet a été réalisé dans le cadre du projet de fin d'année universitaire 2024/2025. Il propose une solution complète pour la mise en relation entre propriétaires et locataires, avec gestion des annonces, réservations, et interactions entre utilisateurs.
Membre de groupe BeHome: 
  - **BELHAJ HSSINE Mohamed Aziz** – mohamed-aziz.belhaj-hssine@etu.umontpellier.fr  
  - **DOUHANE Nadim** – nadim.douhane@etu.umontpellier.fr  
  - **MANSOUR Malik** – malik.mansour@etu.umontpellier.fr  
  - **PECQUEUX Valentin** **(CMI)** – valentin.pecqueux@etu.umontpellier.fr  
## 🚀 Technologies utilisées

- ⚙️ **Backend** : Architecture **microservices** avec **Spring Boot**
- 🖥️ **Frontend** : Application web développée avec **Angular**
- ☁️ **Déploiement** : Environnement **Kubernetes** avec **Nginx Ingress Controller**

## 🧩 Architecture

L'architecture de **Ter Behome** repose sur une approche cloud-native avec Spring Cloud pour la gestion des microservices, un frontend Angular, et un déploiement complet sur Kubernetes via Minikube. Le routage est géré par un Ingress Controller, et les services sont orchestrés autour de Spring Cloud Gateway, Eureka Discovery, et Config Server.

<p align="center">
  <img src="photo_2025-05-25_17-05-30.jpg" alt="Architecture Ter Behome" width="700"/>
</p>

## 📦 Structure du projet
<pre> 
/Manifest Kubernetes/   -> Fichiers YAML de déploiement Kubernetes  
/logebien_front/        -> Application Angular  
/microservice/          -> Code des microservices Spring Boot  
</pre>

## 📋 Prérequis

- `Docker` installé
- `kubectl` installé et configuré
- `Minikube` installé
- Ingress Nginx activé

## 🛠️ Lancement du projet

### 🔧 1. Installation des outils nécessaires (si ce n’est pas déjà fait)

- Installer Docker : [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- Installer kubectl : [https://kubernetes.io/docs/tasks/tools/](https://kubernetes.io/docs/tasks/tools/)
- Installer Minikube : [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)

---

### 🚀 2. Démarrer Minikube

```bash
minikube start --driver=docker
```
### 🌐 3. Activer l’Ingress Controller
```bash
minikube addons enable ingress
```
### 📂 4. Cloner le dépôt
```bash
git clone https://github.com/medaziz2002/research-project-university-of-montpellier
cd research-project-university-of-montpellier/
```
### 📦 5. Appliquer les manifestes Kubernetes
```bash
cd "Manifest Kubernetes"
# Appliquer tous les fichiers YAML dans les dossiers /BackEnd, /FrontEnd, /Nginx Config Files
kubectl apply -f .
```
### 🔑 6. Accès à l’application

    Rendez-vous sur : www.behome.com

    Compte administrateur :

        Email : admin@gmail.com

        Mot de passe : 1234
