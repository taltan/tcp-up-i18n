Voici une version revue du **README.md**. J'ai élargi le champ à l'**Internationalisation (i18n)** globale tout en précisant que l'effort actuel se concentre sur l'anglais. 

J'ai également ajusté les instructions pour qu'elles soient valables pour n'importe quelle future langue (espagnol, allemand, etc.), tout en gardant l'anglais comme exemple principal.

---

# 🌍 TCP/UP - Internationalisation & Traduction

Bienvenue sur le dépôt dédié à l'internationalisation (i18n) du projet **TCP/UP (Transparent Content Protocol / User-Powered)**. 

L'objectif de ce dépôt est de permettre à la communauté de contribuer à l'expansion multilingue du site. **Pour l'heure, nous concentrons nos efforts sur la version anglaise**, mais la structure est prête à accueillir d'autres langues par la suite. Nous utilisons un système de **génération statique** où le contenu textuel (JSON) est totalement dissocié de la structure (HTML).

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

## 🏗 Processus de Build (Génération des pages)

**Note importante :** La fusion des textes et du HTML ne se fait pas via GitHub. 

Une fois votre Pull Request (PR) validée :
1. L'administrateur télécharge vos fichiers JSON sur son poste local.
2. Un script de build manuel génère les pages HTML définitives.
3. Les fichiers résultants sont ensuite déployés sur l'hébergement du site.

Merci pour votre contribution à la transparence et à l'accessibilité du web ! 🚀
