# 🌍 TCP/UP - Internationalisation & Traduction

Bienvenue sur le dépôt dédié à l'internationalisation (i18n) du projet **TCP/UP (Transparent Content Protocol / User-Powered)**. 

L'objectif de ce dépôt est de permettre à la communauté de contribuer à l'expansion multilingue du site. **Pour l'heure, nous concentrons nos efforts sur la version anglaise**, mais la structure est prête à accueillir d'autres langues par la suite. Nous utilisons un système de **génération statique** où le contenu textuel (JSON) est totalement dissocié de la structure (HTML).

## 🔗 Écosystème du projet
Ce dépôt est dédié uniquement à la **traduction**. 
* **Source de vérité** : Pour toute question sur le sens profond des labels ou de la charte, référez-vous au dépôt de doctrine : [taltan/tcp-up](https://github.com/taltan/tcp-up).
* **Communication** : Pour discuter de la terminologie, rejoignez-nous sur [Discord](https://discord.gg/PDzVrVA3x).

## 📂 Architecture du dépôt

Le projet est organisé pour séparer le contenu traduisible de la structure technique :

```text
├── locales/
│   ├── fr/             # Sources originales (Français)
│   ├── en/             # Traduction Anglaise <--- PRIORITÉ ACTUELLE
│   └── [lang]/         # Futures langues (es, de, it, etc.)
├── templates/
│   ├── 0_generic/      # SQUELETTES HTML : Fichiers de référence (Lecture seule)
│   ├── en/             # Pages finales générées en anglais
│   ├── css/            # Feuilles de style communes
│   ├── js/             # Scripts (main.js polyglotte)
│   └── img/            # Ressources visuelles
└── README.md           # Ce fichier
```

---

## 🛠 Procédure de contribution

Pour proposer une nouvelle langue ou compléter la version anglaise, suivez ces étapes :

### 1. Préparation du dossier et du fichier
1. Identifiez le code ISO de la langue cible (ex: `en` pour l'anglais, `es` pour l'espagnol).
2. Si le dossier n'existe pas, créez-le dans `locales/`.
3. Copiez le fichier source depuis `locales/fr/` (ex: `about_fr.json`).
4. Collez-le dans votre dossier de langue et renommez-le avec le bon suffixe (ex: `about_en.json` ou `about_es.json`).

### 2. Configuration de la langue (`lang_code`)
Ouvrez le fichier JSON et modifiez impérativement la première ligne :
* **Changez** `"lang_code": "fr"` par le code de votre langue (ex: **`"en"`**).
* *Cette étape est vitale : elle permet au navigateur d'adapter l'affichage et au script JS de charger les composants (header/footer) correspondants.*

### 3. Traduction du contenu
Traduisez les **valeurs** (le texte à droite des `:`). Ne modifiez jamais les **clés** (à gauche).

---

## 📖 Utilisation des Templates comme guide visuel

Pour comprendre où se situe une variable dans la mise en page, référez-vous aux fichiers du dossier :
👉 `templates/i18n/0_generic/`

Ces fichiers HTML sont des "moules". Ils contiennent des **placeholders** entre doubles accolades `{{...}}` qui correspondent exactement aux clés de vos fichiers JSON. Cela vous permet de visualiser le contexte (titre, paragraphe, bouton) avant de traduire.

---

## ⚠️ Règles d'or (Préservation du code)

### 1. Balises HTML intégrées
Certains textes contiennent des balises (ex: `<strong>`, `<a>`, `<i>`, `<br>`).
* **NE SUPPRIMEZ PAS CES BALISES.**
* Adaptez leur position pour qu'elles encadrent les bons mots dans votre langue cible.
* *Exemple :* `"Le projet <strong>TCP/UP</strong>"` $\rightarrow$ `"The <strong>TCP/UP</strong> project"`.

### 2. Syntaxe JSON
* Chaque ligne (sauf la dernière) doit se terminer par une virgule `,`.
* Utilisez des guillemets simples `'` dans votre texte, ou échappez les guillemets doubles avec un slash : `\"`.

---

## 🔄 Workflow de contribution
```text
    VOTRE POSTE            DÉPÔT GITHUB             ADMINISTRATION
    (Local)                (En ligne)               (Local / Site)
       |                       |                          |
       |      1. FORK          |                          |
       |---------------------->|                          |
       |                       |                          |
       |      2. EDIT          |                          |
       |   (JSON Files)        |                          |
       |<----------------------|                          |
       |                       |                          |
       |      3. PUSH          |                          |
       |---------------------->|                          |
       |                       |                          |
       |   4. PULL REQUEST     |      5. REVIEW           |
       |   (Proposition)       |   (Team TCP/UP)          |
       |---------------------->|------------+             |
       |                       |            |             |
       |                       |      6. MERGE / VALIDÉ   |
       |                       |<-----------+             |
       |                       |                          |
       |                       |      7. BUILD & DEPLOY   |
       |                       |------------------------->|
       |                       |                          |
```
### Détails des étapes :
1. **Fork** : Vous créez votre propre copie du projet sur votre compte GitHub.
2. **Edit** : Vous travaillez sur vos fichiers JSON (ex: `about_en.json`) dans votre copie
3. **Push** : Vous envoyez vos modifications vers votre dépôt en ligne.
4. **Pull Request** : Vous demandez l'intégration de votre travail au projet officiel.
5. **Review** : La team TCP/UP vérifie la cohérence éditoriale et la fidélité au sens original
6. **Merge** : Votre contribution est officiellement acceptée et fusionnée.
7. **Build & Deploy** : L'administrateur génère les pages HTML finales et met à jour le site.

---

## 🏗 Processus de Build (Génération des pages)

**Note importante :** La fusion des textes et du HTML ne se fait pas via GitHub. 

Une fois votre Pull Request (PR) validée :
1. L'administrateur télécharge vos fichiers JSON sur son poste local.
2. Un script de build manuel génère les pages HTML définitives.
3. Les fichiers résultants sont ensuite déployés sur l'hébergement du site.

Merci pour votre contribution à la transparence et à l'accessibilité du web ! 🚀
