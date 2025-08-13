# 🔥 Configuration Firebase pour le site de mariage

## 📋 Prérequis
- Compte Google avec accès à [Firebase Console](https://console.firebase.google.com/)
- Projet Next.js configuré

## 🚀 Étapes de configuration

### 1. Créer un projet Firebase
1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Nommez votre projet (ex: `celebration-mariage`)
4. Désactivez Google Analytics si vous n'en avez pas besoin
5. Cliquez sur "Créer le projet"

### 2. Activer Firestore Database
1. Dans le menu de gauche, cliquez sur "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Mode test" pour commencer
4. Sélectionnez l'emplacement de votre base de données (ex: `europe-west3`)
5. Cliquez sur "Terminé"

### 3. Configurer les règles de sécurité Firestore
1. Dans Firestore Database, allez dans l'onglet "Règles"
2. Remplacez les règles par défaut par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permettre la lecture et l'écriture pour la collection RSVP
    match /rsvp/{document} {
      allow read, write: if true;
    }
  }
}
```

### 4. Obtenir les clés de configuration
1. Cliquez sur l'icône ⚙️ (Paramètres) à côté de "Vue d'ensemble du projet"
2. Sélectionnez "Paramètres du projet"
3. Allez dans l'onglet "Général"
4. Faites défiler jusqu'à "Vos applications"
5. Cliquez sur l'icône Web (</>) pour ajouter une app web
6. Nommez votre app (ex: `celebration-mariage-web`)
7. Copiez la configuration Firebase

### 5. Configurer les variables d'environnement
1. Créez un fichier `.env.local` à la racine de votre projet
2. Ajoutez vos clés Firebase :

```env
NEXT_PUBLIC_FIREBASE_API_KEY=votre_api_key_ici
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_projet_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
```

### 6. Tester la configuration
1. Redémarrez votre serveur de développement
2. Remplissez le formulaire RSVP
3. Vérifiez dans Firebase Console > Firestore Database que les données sont bien enregistrées

## 🔒 Sécurité (Production)

### Règles Firestore sécurisées
Pour la production, utilisez des règles plus strictes :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvp/{document} {
      // Permettre seulement l'écriture (pas la lecture)
      allow write: if true;
      allow read: if false; // Seuls les administrateurs peuvent lire
    }
  }
}
```

### Authentification (Optionnel)
Pour plus de sécurité, vous pouvez ajouter l'authentification Firebase :
1. Activez l'authentification dans Firebase Console
2. Configurez les méthodes d'authentification (Email/Mot de passe)
3. Modifiez les règles Firestore pour vérifier l'authentification

## 📱 Fonctionnalités implémentées

- ✅ **Formulaire RSVP** avec validation
- ✅ **Date limite** (1er septembre 2025) avec vérification automatique
- ✅ **Compteur de jours** restants
- ✅ **Stockage Firestore** avec timestamp
- ✅ **Gestion des erreurs** et états de chargement
- ✅ **Messages de confirmation** et d'erreur
- ✅ **Interface responsive** et accessible

## 🐛 Dépannage

### Erreur "Firebase: Error (auth/unauthorized-domain)"
- Ajoutez votre domaine dans Firebase Console > Authentication > Settings > Authorized domains

### Erreur "Firebase: Error (firestore/permission-denied)"
- Vérifiez vos règles Firestore
- Assurez-vous que la collection `rsvp` existe

### Erreur "Firebase: Error (app/no-app)"
- Vérifiez que Firebase est bien initialisé avant d'utiliser Firestore
- Vérifiez vos variables d'environnement

## 📞 Support
Si vous rencontrez des problèmes, vérifiez :
1. Les variables d'environnement dans `.env.local`
2. Les règles Firestore
3. La console du navigateur pour les erreurs JavaScript
4. Les logs Firebase Console

---

**🎉 Votre formulaire RSVP est maintenant connecté à Firebase !**
