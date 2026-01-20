// État du cube complet
// Chaque face du cube est représentée par un tableau de 9 cases (comme une grille 3x3)
let cube = {
    Droite: ['red','red','red','red','red','red','red','red','red'],
    Avant: ['green','green','green','green','green','green','green','green','green'],
    Gauche: ['orange','orange','orange','orange','orange','orange','orange','orange','orange'],
    Arriere: ['blue','blue','blue','blue','blue','blue','blue','blue','blue'],
    Haut: ['white','white','white','white','white','white','white','white','white'],
    Bas: ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow']
};

// Orientation actuelle du cube
let orientation = {
    avant: 'Avant',
    arriere: 'Arriere',
    haut: 'Haut',
    bas: 'Bas',
    droite: 'Droite',
    gauche: 'Gauche'
};

// Face actuellement affichée a l'écran (vert par défaut)
// Ce sont les standards des mélanges WCA (World cube association)
let Face_actuelle = 'Avant';

// Dictionaire des couleurs
let colors = {
    red: '#ff0000',
    green: '#00ff00',
    orange: '#ff8800',
    blue: '#0000ff',
    white: '#ffffff',
    yellow: '#ffff00'
};

// Fonction pour dessiner un carré coloré sur un canvas
function Dessinecarre(ctx, color) {
    ctx.fillStyle = colors[color];
    ctx.fillRect(5, 5, 40, 40);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(5, 5, 40, 40);
}

// Fonction pour dessiner la face actuelle du cube
function DessineFace() {
    for(let i = 0; i < 9; i++) {
        const canvas = document.getElementById('piece' + i);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 50, 50);
        Dessinecarre(ctx, cube[Face_actuelle][i]);
    }
    document.getElementById('current-face').textContent = Face_actuelle.toUpperCase();
}

// Tableau des transformations pour changer de vue
// Quand on tourne le cube pour voir une autre face, on doit savoir quelle face devient la nouvelle face avant, arrière, etc.
const transformations = {
    droite: { avant: 'Gauche', arriere: 'Droite', gauche: 'Arriere', droite: 'Avant', haut: 'Haut', bas: 'Bas' },
    gauche: { avant: 'Droite', arriere: 'Gauche', gauche: 'Avant', droite: 'Arriere', haut: 'Haut', bas: 'Bas' },
    haut:   { avant: 'Haut', arriere: 'Bas', haut: 'Arriere', bas: 'Avant', droite: 'Droite', gauche: 'Gauche' },
    bas:    { avant: 'Bas', arriere: 'Haut', haut: 'Avant', bas: 'Arriere', droite: 'Droite', gauche: 'Gauche' }
};

// Fonction pour changer la vue du cube (tourner le cube pour voir une autre face)
function changevue(direction) {
    const t = transformations[direction];
    const ancien = {
        avant: orientation.avant,
        arriere: orientation.arriere,
        haut: orientation.haut,
        bas: orientation.bas,
        droite: orientation.droite,
        gauche: orientation.gauche
    };
    orientation.avant = ancien[t.avant.toLowerCase()];
    orientation.arriere = ancien[t.arriere.toLowerCase()];
    orientation.haut = ancien[t.haut.toLowerCase()];
    orientation.bas = ancien[t.bas.toLowerCase()];
    orientation.droite = ancien[t.droite.toLowerCase()];
    orientation.gauche = ancien[t.gauche.toLowerCase()];
    Face_actuelle = orientation.avant;
    DessineFace();
}

// Fonction pour réinitialiser le cube a son état de départ
function reinitialiser() {
    cube.Droite = ['red','red','red','red','red','red','red','red','red'];
    cube.Avant = ['green','green','green','green','green','green','green','green','green'];
    cube.Gauche = ['orange','orange','orange','orange','orange','orange','orange','orange','orange'];
    cube.Arriere = ['blue','blue','blue','blue','blue','blue','blue','blue','blue'];
    cube.Haut = ['white','white','white','white','white','white','white','white','white'];
    cube.Bas = ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'];
    orientation.avant = 'Avant';
    orientation.arriere = 'Arriere';
    orientation.haut = 'Haut';
    orientation.bas = 'Bas';
    orientation.droite = 'Droite';
    orientation.gauche = 'Gauche';
    Face_actuelle = 'Avant';
    DessineFace();
}

// Fonction pour tourner une face dans le sens horaire
function tourner(face) {
    return [
        face[6], face[3], face[0],
        face[7], face[4], face[1],
        face[8], face[5], face[2]
    ];
}

// Fonction principale pour effectuer un mouvement sur le cube
function mouvement(notation) {
    if (notation === 'F') {
        cube.Avant = tourner(cube.Avant);
        let temporaireAvant = [cube.Haut[6], cube.Haut[7], cube.Haut[8]];
        cube.Haut[6] = cube.Gauche[8];
        cube.Haut[7] = cube.Gauche[5];
        cube.Haut[8] = cube.Gauche[2];
        cube.Gauche[2] = cube.Bas[0];
        cube.Gauche[5] = cube.Bas[1];
        cube.Gauche[8] = cube.Bas[2];
        cube.Bas[0] = cube.Droite[6];
        cube.Bas[1] = cube.Droite[3];
        cube.Bas[2] = cube.Droite[0];
        cube.Droite[0] = temporaireAvant[0];
        cube.Droite[3] = temporaireAvant[1];
        cube.Droite[6] = temporaireAvant[2];
    }
    
    else if (notation === 'R') {
        cube.Droite = tourner(cube.Droite);
        let temporaireDroite = [cube.Avant[2], cube.Avant[5], cube.Avant[8]];
        cube.Avant[2] = cube.Bas[2];
        cube.Avant[5] = cube.Bas[5];
        cube.Avant[8] = cube.Bas[8];
        cube.Bas[2] = cube.Arriere[6];
        cube.Bas[5] = cube.Arriere[3];
        cube.Bas[8] = cube.Arriere[0];
        cube.Arriere[0] = cube.Haut[8];
        cube.Arriere[3] = cube.Haut[5];
        cube.Arriere[6] = cube.Haut[2];
        cube.Haut[2] = temporaireDroite[0];
        cube.Haut[5] = temporaireDroite[1];
        cube.Haut[8] = temporaireDroite[2];
    }

    else if (notation === 'U') {
        cube.Haut = tourner(cube.Haut);
        let temporaireHaut = [cube.Avant[0], cube.Avant[1], cube.Avant[2]];
        cube.Avant[0] = cube.Droite[0];
        cube.Avant[1] = cube.Droite[1];
        cube.Avant[2] = cube.Droite[2];
        cube.Droite[0] = cube.Arriere[0];
        cube.Droite[1] = cube.Arriere[1];
        cube.Droite[2] = cube.Arriere[2];
        cube.Arriere[0] = cube.Gauche[0];
        cube.Arriere[1] = cube.Gauche[1];
        cube.Arriere[2] = cube.Gauche[2];
        cube.Gauche[0] = temporaireHaut[0];
        cube.Gauche[1] = temporaireHaut[1];
        cube.Gauche[2] = temporaireHaut[2];
    }

    else if (notation === 'L') {
        cube.Gauche = tourner(cube.Gauche);
        let temporaireGauche = [cube.Avant[0], cube.Avant[3], cube.Avant[6]];
        cube.Avant[0] = cube.Haut[0];
        cube.Avant[3] = cube.Haut[3];
        cube.Avant[6] = cube.Haut[6];
        cube.Haut[0] = cube.Arriere[8];
        cube.Haut[3] = cube.Arriere[5];
        cube.Haut[6] = cube.Arriere[2];
        cube.Arriere[2] = cube.Bas[6];
        cube.Arriere[5] = cube.Bas[3];
        cube.Arriere[8] = cube.Bas[0];
        cube.Bas[0] = temporaireGauche[0];
        cube.Bas[3] = temporaireGauche[1];
        cube.Bas[6] = temporaireGauche[2];
    }

    else if (notation === 'D') {
        cube.Bas = tourner(cube.Bas);
        let temporaireBas = [cube.Avant[6], cube.Avant[7], cube.Avant[8]];
        cube.Avant[6] = cube.Gauche[6];
        cube.Avant[7] = cube.Gauche[7];
        cube.Avant[8] = cube.Gauche[8];
        cube.Gauche[6] = cube.Arriere[6];
        cube.Gauche[7] = cube.Arriere[7];
        cube.Gauche[8] = cube.Arriere[8];
        cube.Arriere[6] = cube.Droite[6];
        cube.Arriere[7] = cube.Droite[7];
        cube.Arriere[8] = cube.Droite[8];
        cube.Droite[6] = temporaireBas[0];
        cube.Droite[7] = temporaireBas[1];
        cube.Droite[8] = temporaireBas[2];
    }

    else if (notation === 'B') {
        cube.Arriere = tourner(cube.Arriere);
        let temporaireArriere = [cube.Haut[0], cube.Haut[1], cube.Haut[2]];
        cube.Haut[0] = cube.Droite[2];
        cube.Haut[1] = cube.Droite[5];
        cube.Haut[2] = cube.Droite[8];
        cube.Droite[2] = cube.Bas[8];
        cube.Droite[5] = cube.Bas[7];
        cube.Droite[8] = cube.Bas[6];
        cube.Bas[6] = cube.Gauche[0];
        cube.Bas[7] = cube.Gauche[3];
        cube.Bas[8] = cube.Gauche[6];
        cube.Gauche[0] = temporaireArriere[2];
        cube.Gauche[3] = temporaireArriere[1];
        cube.Gauche[6] = temporaireArriere[0];
    }
    DessineFace();
}

// Fonction pour mélanger le cube de façon aléatoire
// Cette fonction simule un mélange réaliste comme dans les compétitions WCA
// Chaque mouvement peut etre dans le sens horaire (1 rotation)
// ou dans le sens anti-horaire (3 rotations, car 3 rotations horaires = 1 anti-horaire)
function melange(nbmouvements) {
    const faces = ['F', 'R', 'U', 'L', 'D', 'B'];
    for (let i = 0; i < nbmouvements; i++) {
        let num_face = Math.floor(Math.random() * 6);
        let num_sens_mvmt;

        if (Math.random() < 0.5) {
            num_sens_mvmt = 1;  // Sens horaire : on fait 1 seule rotation
        }
        else {
            num_sens_mvmt = 3;  // Sens anti-horaire : on fait 3 rotations (équivalent a tourner dans l'autre sens)
        }

        for (let j = 0; j < num_sens_mvmt; j++) {
            mouvement(faces[num_face]);
        }
    }
}

// Quand la page est chargée, on dessine la face initiale du cube
window.onload = function() {
    DessineFace();
};