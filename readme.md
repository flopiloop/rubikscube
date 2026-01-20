# Application d'entrainement et de simulation rubik's cube


### Page d'acceuil
Dans la page d'acceuil il est possible de choisir entre deux options :
* Apprendre (_ouvre la liste des algorithmes de la dernière face_)
* Résoudre (_ouvre un simulateur de rubik's cube_)

### Page du rubik's cube
La page du simulateur de Rubik's cube ([index.html](index.html)) permet de manipuler un cube virtuel et de pratiquer les algorithmes appris.

#### Fonctionnalités principales :
1. **Visualisation 3D du cube** : Affichage d'une face du cube avec 9 cases colorées sur une grille 3x3
2. **Navigation entre les faces** : Boutons pour changer la vue (Gauche, Droite, Haut, Bas)
3. **Mouvements standard** : 6 boutons pour effectuer les mouvements de base du cube
    * **F** (Front/Avant) : Rotation de la face avant
    * **R** (Right/Droite) : Rotation de la face droite
    * **U** (Up/Haut) : Rotation de la face supérieure
    * **L** (Left/Gauche) : Rotation de la face gauche
    * **D** (Down/Bas) : Rotation de la face inférieure
    * **B** (Back/Arrière) : Rotation de la face arrière
* **Mélange aléatoire** : Bouton "Mélanger" qui effectue 15 mouvements aléatoires (norme WCA)
* **Réinitialisation** : Bouton "Redémarrer" pour revenir au cube résolu

#### Schéma des couleurs (standard WCA) :
<div align="center">

| Face | Couleur |
|:----:|:-------:|
| Avant | Vert |
| Droite | Rouge |
| Gauche | Orange |
| Arrière | Bleu |
| Haut | Blanc |
| Bas | Jaune |

</div>

### Page d'apprentissage
| Type   | Fonctionnement | Cas |
| :-------: | ---------------- | ------ |
| **OLL** ![Image de pll](https://www.speedsolving.com/wiki/images/1/18/OLL_step.png) | Les OLL pour orientation last layer permettent d'orienté les pièces de la dernière face | [**_Liste des cas (57)_**](https://www.francocube.com/deadalnix/oll) |
| **PLL** ![Image de pll](https://speedygonecuber.com/wp-content/uploads/2024/09/H-Perm-300x300.png) | Les PLL pour permutation last layer permettent d'orienté les pièces de la dernière face |[**_Liste des cas (21)_**](https://www.speedcubingtips.eu/pll/)|
| 
