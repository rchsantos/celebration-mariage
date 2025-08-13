# 🚀 Instructions de configuration Firebase

## 📝 Étape 1 : Créer le fichier .env.local

Créez un fichier `.env.local` à la racine de votre projet avec le contenu suivant :

```bash
# Dans le terminal, à la racine du projet mariage/
touch .env.local
```

Puis ajoutez ce contenu dans le fichier `.env.local` :

```env
# Configuration Firebase - Clés réelles
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD8yffVi3Lfjm-E93QiFTEA4FqBe5PTyWk
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=celebration-mariage.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=celebration-mariage
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=celebration-mariage.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=333074020119
NEXT_PUBLIC_FIREBASE_APP_ID=1:333074020119:web:af67460c29075a81d32952
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-NZB9NZ3TNM
```

## 🔧 Étape 2 : Configurer Firestore Database

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet `celebration-mariage`
3. Dans le menu de gauche, cliquez sur "Firestore Database"
4. Cliquez sur "Créer une base de données"
5. Choisissez "Mode test" pour commencer
6. Sélectionnez l'emplacement `europe-west3` (recommandé pour l'Europe)
7. Cliquez sur "Terminé"

## 🔒 Étape 3 : Configurer les règles de sécurité

Dans Firestore Database > Règles, remplacez les règles par :

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

## 🧪 Étape 4 : Tester la configuration

1. Redémarrez votre serveur de développement :
   ```bash
   yarn dev
   ```

2. Ouvrez votre navigateur sur `http://localhost:3000`

3. Allez à la section RSVP et testez le formulaire

4. Vérifiez dans Firebase Console > Firestore Database que les données sont bien enregistrées

## ✅ Vérification

Si tout fonctionne correctement :
- ✅ Le formulaire RSVP s'affiche sans erreur
- ✅ Vous pouvez remplir et envoyer le formulaire
- ✅ Les données apparaissent dans Firestore Database
- ✅ Le compteur de jours fonctionne
- ✅ La date limite (1er octobre 2025) est respectée

## 🐛 En cas de problème

### Erreur "Firebase: Error (firestore/permission-denied)"
- Vérifiez que Firestore Database est créé
- Vérifiez les règles de sécurité

### Erreur "Firebase: Error (app/no-app)"
- Vérifiez que le fichier `.env.local` est bien créé
- Redémarrez le serveur de développement

### Erreur "Firebase: Error (auth/unauthorized-domain)"
- Ajoutez `localhost` dans Firebase Console > Authentication > Settings > Authorized domains

---

**🎉 Votre formulaire RSVP est maintenant connecté à Firebase !**
