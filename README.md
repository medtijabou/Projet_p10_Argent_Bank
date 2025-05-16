
# Argent Bank

Projet OpenClassrooms - **Projet 10 : Argent Bank - Application bancaire avec React et Node.js**

## 🧾 Description

Ce projet consiste à créer une application web bancaire complète, avec un **frontend en React (Vite)** et un **backend en Node.js avec Express et MongoDB**.  
Il s'agit du 10e projet de la formation "Développeur Front-End" d'OpenClassrooms.

---

## 📁 Structure du projet

```bash
Projet_p10_Argent_Bank/
├── backend/              # Code du serveur Node.js
├── frontend/             # Code React (Vite)
└── README.md             # Fichier actuel
```

---

## ⚙️ Prérequis

- Node.js v12+ recommandé
- MongoDB Community Server
- npm ou yarn

---

## 🚀 Installation

### Backend

```bash
cd backend
npm install
npm run populate-db   # Pour insérer les utilisateurs Tony Stark & Steve Rogers
npm run dev:server    # Lancer le serveur en mode développement
```

Accès à l'API : [http://localhost:3001](http://localhost:3001)  
Docs Swagger : [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

### Frontend

```bash
cd frontend
npm install
npm run dev           # Lance l'application React
```

Application disponible sur [http://localhost:5173](http://localhost:5173)

---

## 👤 Données pré-remplies

Une fois le backend initialisé, deux comptes utilisateurs sont disponibles :

### Tony Stark

- Email : `tony@stark.com`
- Password : `password123`

### Steve Rogers

- Email : `steve@rogers.com`
- Password : `password456`

---

## 🛠️ Technologies utilisées

### Backend

- Node.js / Express
- MongoDB / Mongoose
- JWT Authentication
- Swagger pour la documentation

### Frontend

- React 19 (Vite)
- Redux (authentification & state global)
- SCSS

---

## 📐 Wireframes et design

Les maquettes sont situées dans le dossier `/designs` :
- Modification du nom d’utilisateur : `edit-user-name.png`
- Transactions utilisateur : `transactions.png`

---

## 📜 Scripts utiles

### Backend

```bash
npm run dev:server      # Lancer le serveur avec nodemon
npm run server          # Lancer le serveur simplement
npm run populate-db     # Remplir la base avec des utilisateurs fictifs
```

### Frontend

```bash
npm run dev             # Lancer React avec Vite
npm run build           # Générer la version de production
npm run preview         # Prévisualiser la version build
```

---

## ✅ Fonctionnalités principales

- Authentification sécurisée via token JWT
- Affichage des comptes utilisateurs
- Edition du nom d'utilisateur
- Liste des transactions (à venir dans phase 2)
- API RESTful documentée avec Swagger

---

## 🧼 Convention de commits

Le projet utilise la convention [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Exemples :
- `feat: ajout de la page de profil utilisateur`
- `fix: correction du token JWT expiré`
- `chore: code cleanup, remove unused files and finalize structure`

---

## 🧑‍💻 Auteur

Mohamed Boulyou Tijari  
Projet réalisé dans le cadre de la formation **OpenClassrooms - Développeur Front-End**

---

## 📄 Licence

Ce projet est open-source, fourni à des fins pédagogiques uniquement.
