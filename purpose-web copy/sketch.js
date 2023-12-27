//to do:
// make hover over hidden text be rainbow lmao


const PARTICLE_SIZE = 10;
const RESOLUTION = 10;
const MAX_FORCE = 20;
const MIN_FORCE = 0;

let imgURL  = '/images/ShoutoutCOVER.png';
// let imgURL  = '/images/ShoutoutCOVER3.png';
// let imgURL = '/images/ShoutoutCover2.png';
let img; 
let particles = [];
let nostra;

function preload() {
    img = loadImage(imgURL);
    nostra = loadFont('typefaces/Nostra-SettTrial.otf')
}

function setup() {
    createCanvas(windowWidth, 650);
    // frameRate(30);
    textFont(nostra);
    spawnParticles();
}

function draw() {
    background(0);
    // image(img, 0 , 0, width, 700);
    
    fill(255,0,199);

    textSize(15);
    text('ANTHONY', 20, 50);
    text('JASMIN', 1380, 50);
    text('HEYSU', 1380, 590);
    text('JESSICA', 20, 590);
    
    push();
    scale(1, 2);
    textSize(158);
    text('SHOUTOUT', 5, 250);
    pop();

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    })

}

function spawnParticles() {
    for(let i = 0; i < width; i += RESOLUTION) {
        for(let j = 0; j < 700; j += RESOLUTION) {
            const color = img.get(i, j, );
            particles.push(new Particle(i + PARTICLE_SIZE / 2, j + PARTICLE_SIZE / 2, color));
        }
    }

}

class Particle {
    constructor(x,y,color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.targetX = x;
        this.targetY = y;
    }

    update() {
        //get vectors for mouse,  target , current position
        let mouseVector = createVector(mouseX, mouseY);
        let currentVector = createVector(this.x, this.y);
        let targetVector = createVector(this.targetX, this.targetY);

        //calc vector from  mouse to particle and its distance (mag)
        let fromMouseToParticle = p5.Vector.sub(currentVector, mouseVector);
        let distanceToMouse = fromMouseToParticle.mag();

        //calc vector from particle to target and its distance (mag)
        let fromParticleToTarget = p5.Vector.sub(targetVector, currentVector);
        let distanceToTarget = fromParticleToTarget.mag();

        let totalForce = createVector(0,0);

        //if mouse within 100px, repulse
        if (distanceToMouse < 150) {
            let repulsionForce = map(distanceToMouse, 0, 150, MAX_FORCE, MIN_FORCE);
            fromMouseToParticle.setMag(repulsionForce);
            totalForce.add(fromMouseToParticle);
        }

        //if particle not at target, calc attractive force
        if (distanceToMouse > 0) {
            let attractionForce = map(distanceToTarget, 0, 150, MIN_FORCE, MAX_FORCE);
            fromParticleToTarget.setMag(attractionForce);
            totalForce.add(fromParticleToTarget);
        }

        //add forces to position
        this.x += totalForce.x;
        this.y += totalForce.y;

    }

    draw() {
        fill(this.color);
        // fill(random(255), random(255), random(255));
        noStroke();
        // ellipse(this.x, this.y, PARTICLE_SIZE);
        rect(this.x, this.y, PARTICLE_SIZE);
        // text('A', this.x, this.y, PARTICLE_SIZE, PARTICLE_SIZE);

    }
}