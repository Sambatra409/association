# Anjaramahasoa — Site statique (HTML / CSS / JS)

Version 100 % HTML/CSS/JS pur du site, sans framework ni étape de build.
Le design est identique à la version React/Lovable d'origine.

## Structure
- `index.html`, `qui-sommes-nous.html`, `projet.html`, `impact.html`,
  `soutenir.html`, `contact.html` — les 6 pages
- `css/styles.css` — tous les styles
- `js/main.js` — header + footer partagés, menu mobile, lien actif
- `assets/` — toutes les images (logo + photos)

## Lancer en local
Ouvrir un terminal dans ce dossier puis :

    python3 -m http.server 8000

Puis aller sur http://localhost:8000
(Ou simplement ouvrir `index.html` dans un navigateur.)

## Déployer sur Vercel
1. Pousser ce dossier sur un dépôt GitHub.
2. Sur vercel.com → "Add New Project" → importer le dépôt.
3. Framework Preset : **Other** (site statique, aucune commande de build).
4. Cliquer Deploy.

Aucune configuration supplémentaire n'est nécessaire : Vercel sert
directement les fichiers HTML.

## Remplacer les photos
Les images sont dans `assets/`. Pour changer une photo, remplacez le
fichier en gardant le même nom (ex. `hero-school.jpg`), ou changez le
nom dans le HTML correspondant.

| Fichier          | Pages où il apparaît              |
|------------------|-----------------------------------|
| logo.png         | header + footer                   |
| hero-school.jpg  | accueil, projet                   |
| classroom.jpg    | accueil, impact, projet           |
| construction.jpg | accueil, impact, projet           |
| wash.jpg         | accueil, impact, projet           |
| community.jpg    | accueil, impact, qui-sommes-nous  |
| village.jpg      | qui-sommes-nous                   |
| solar.jpg        | impact, projet                    |
| students.jpg     | impact, projet                    |
| before.jpg       | projet                            |
<<<<<<< HEAD
"# AA" 
=======
>>>>>>> d6ead93 (Premier envoi de mon projet)
