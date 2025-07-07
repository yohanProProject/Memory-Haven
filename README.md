# 🧠 Memory Haven

<div align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt="ASP.NET Core">
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
</div>

<div align="center">
  <h3>🌟 Plateforme d'accompagnement et de bien-être pour étudiants</h3>
  <p><em>Une application dédiée au soutien, à l'entraide et au bien-être des étudiants de l'enseignement supérieur</em></p>
</div>

---

## 📖 Description

**Memory Haven** est une plateforme de réseau social conçue spécialement pour accompagner les étudiants de l'enseignement supérieur dans leur parcours académique et personnel. L'application offre un environnement bienveillant où les étudiants peuvent échanger, s'entraider et accéder à des ressources pour améliorer leur bien-être et gérer leur stress scolaire.

## 🎯 Objectifs du Projet

- **🤝 Entraide Étudiante** : Créer une communauté solidaire où les étudiants peuvent s'entraider et partager leurs expériences
- **📚 Ressources Pédagogiques** : Centraliser des ressources éducatives et des outils d'apprentissage
- **🌱 Gestion du Stress** : Proposer des techniques de relaxation, exercices de bien-être et outils de gestion du stress
- **💬 Communication** : Faciliter les échanges via des forums de discussion et un système de questions/réponses
- **🎵 Bien-être Mental** : Intégrer des fonctionnalités de relaxation incluant musique et exercices cognitifs

## 🛠️ Technologies Utilisées

### Frontend
- **Angular 18** - Framework principal pour l'interface utilisateur
- **Bootstrap 5** - Framework CSS pour un design responsive et moderne
- **TypeScript** - Langage de programmation typé
- **SCSS** - Préprocesseur CSS pour des styles avancés
- **Font Awesome** - Bibliothèque d'icônes

### Backend
- **ASP.NET Core** - Framework pour l'API REST
- **Entity Framework Core** - ORM pour la gestion de base de données
- **C#** - Langage de programmation backend

### Base de Données
- **PostgreSQL** - Base de données relationnelle robuste et performante

### Outils & DevOps
- **Git** - Système de contrôle de version
- **GitHub** - Hébergement du code source
- **npm** - Gestionnaire de packages Node.js

## 🚀 Installation & Lancement

### Prérequis

Assurez-vous d'avoir installé :
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [Angular CLI](https://angular.io/cli) : `npm install -g @angular/cli`
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [PostgreSQL](https://www.postgresql.org/download/)

### 📥 Installation

#### 1. Cloner le repository

```bash
git clone https://github.com/yohanProProject/Memory-Haven.git
cd Memory-Haven
```

#### 2. Installation du Frontend (Angular)

```bash
# Naviguer vers le dossier frontend
cd frontend/memory-haven

# Installer les dépendances
npm install

# Installer Bootstrap et ses dépendances
npm install bootstrap @popperjs/core

# Lancer le serveur de développement
ng serve
```

L'application frontend sera accessible sur `http://localhost:4200`

#### 3. Installation du Backend (ASP.NET Core)

```bash
# Naviguer vers le dossier backend
cd backend/MemoryHaven.API

# Restaurer les packages NuGet
dotnet restore

# Mettre à jour la base de données (après configuration)
dotnet ef database update

# Lancer l'API
dotnet run
```

L'API backend sera accessible sur `https://localhost:7000`

#### 4. Configuration de la Base de Données

```bash
# Dans le dossier backend/MemoryHaven.API
# Modifier la chaîne de connexion dans appsettings.json

# Créer et appliquer les migrations
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 🎯 Commandes Utiles

```bash
# Frontend - Build de production
ng build --prod

# Backend - Tests
dotnet test

# Backend - Build de production
dotnet publish -c Release
```

## ✨ Fonctionnalités Principales

### 💬 Forum Communautaire
- **Discussions thématiques** organisées par catégories
- **Système de votes** pour valoriser les meilleures contributions
- **Modération** pour maintenir un environnement bienveillant
- **Notifications** en temps réel

### ❓ Questions & Réponses
- **Plateforme Q&A** avec experts et étudiants expérimentés
- **Système de réputation** pour identifier les contributeurs fiables
- **Recherche avancée** par mots-clés et catégories
- **Votes communautaires** sur les réponses

### 📚 Ressources Pédagogiques
- **Bibliothèque de documents** éducatifs
- **Liens vers ressources externes** vérifiées
- **Guides pratiques** pour la réussite étudiante
- **Outils d'organisation** et de planification

### 🌱 Espace Bien-être
- **Exercices de relaxation** guidés
- **Techniques de gestion du stress** adaptées aux étudiants
- **Playlist musicale** pour la concentration et la détente
- **Conseils nutrition** et hygiène de vie

### 👤 Espace Profil
- **Profil personnalisable** avec photo et bio
- **Historique des contributions** et badges de réussite
- **Paramètres de confidentialité** avancés
- **Suivi des progrès** personnel

### ⚙️ Administration & Modération
- **Tableau de bord** administrateur complet
- **Outils de modération** pour le contenu
- **Statistiques d'utilisation** en temps réel
- **Gestion des utilisateurs** et permissions

## 👥 Équipe de Développement

<table align="center">
  <tr>
    <td align="center">
      <h4>🚀 <strong>Ousmane Fall</strong></h4>
      <em>Lead Developer & Project Manager</em>
    </td>
    <td align="center">
      <h4>💻 <strong>Yohan Henry</strong></h4>
      <em>Frontend Developer & UI/UX</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <h4>🔧 <strong>Hamza Diaby</strong></h4>
      <em>Backend Developer & Database</em>
    </td>
    <td align="center">
      <h4>🎨 <strong>Samir Yagoubi</strong></h4>
      <em>Full-Stack Developer & QA</em>
    </td>
  </tr>
</table>

## 📸 Aperçu

### 🏠 Page d'Accueil
Interface moderne et intuitive avec navigation claire vers toutes les fonctionnalités.

### 💬 Forum Intégré
Espace de discussion organisé par thématiques avec système de modération.

### 🌱 Section Bien-être
Outils de relaxation et exercices pour gérer le stress étudiant.

## 🗺️ Roadmap

- [ ] **v1.0** - Fonctionnalités de base (Forum, Q&A, Profils)
- [ ] **v1.1** - Section Bien-être avec exercices guidés
- [ ] **v1.2** - Système de notifications push
- [ ] **v1.3** - Application mobile (React Native)
- [ ] **v2.0** - Intelligence artificielle pour recommandations personnalisées

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. Créer une **branche** pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une **Pull Request**

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">
  <h3>🌟 Memory Haven - Ensemble pour la réussite étudiante 🌟</h3>
  <p><em>Développé avec ❤️ par l'équipe Memory Haven</em></p>
  
  <a href="https://github.com/yohanProProject/Memory-Haven">
    <img src="https://img.shields.io/github/stars/yohanProProject/Memory-Haven?style=social" alt="GitHub Stars">
  </a>
  <a href="https://github.com/yohanProProject/Memory-Haven/fork">
    <img src="https://img.shields.io/github/forks/yohanProProject/Memory-Haven?style=social" alt="GitHub Forks">
  </a>
</div>
