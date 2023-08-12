
import { key_init, key_input, key_isDown, key_isDownNow } from './keyinput.js';

import { circle_loop } from './game_circle.js';

let level = 0;

let lastFrameTime = 0;
const frameInterval = 1000 / 60; // 60 frames per second

// set up canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// load bg image
const bgImage = new Image();
bgImage.src = "./assets/ui/bg_black.png";
bgImage.onload = () => { 
    canvas.width = bgImage.width;
    canvas.height = bgImage.height;
    startGame();
};


const bg = new Image();
bg.src = "./assets/ui/bg_flan.png";


const fg = new Image();
fg.src = "./assets/ui/fg_purin.png";

// array of images named intros
let intro;
const intros = [];
intros[0] = new Image();
intros[1] = new Image();
intros[2] = new Image();
intros[3] = new Image();
intros[0].src = "./assets/intro/00.png";
intros[1].src = "./assets/intro/01.png";
intros[2].src = "./assets/intro/02.png";
intros[3].src = "./assets/intro/03.png";

const introbg = new Image();
introbg.src = "./assets/intro/bg.png";

let contex = {
    canvas: canvas,
    ctx: ctx,
    level: level,
    bg: bgImage,
}

function startGame() {
    key_init();

    framewait = 0;

    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0);

    setTimeout(() => {
        gameLoop();
    }, 1000);

}

let frame = 0;
let framewait = 0;

function gameLoop() {

//   const elapsed = currentTime - lastFrameTime;

    key_input();

    if(contex.level === 0) {
        intro = intros[0];
        draw();
        if(framewait == 0){
            framewait = 1;
            setTimeout(() => {
                nextLevel();
                framewait = 0;
            }, 1000);
        }
    } else if(contex.level === 1) {
        intro = intros[1];
        draw();
        if(framewait == 0){
            framewait = 1;
            setTimeout(() => {
                nextLevel();
                framewait = 0;
            }, 1000);
        }
    } else if(contex.level === 2) {
        intro = intros[2];
        draw();
        if(framewait == 0){
            framewait = 1;
            setTimeout(() => {
                nextLevel();
                framewait = 0;
            }, 1000);
        }
    } else  if(contex.level === 3) {
        intro = intros[3];
        draw();
        if(framewait == 0){
            framewait = 1;
            setTimeout(() => {
                nextLevel();
                framewait = 0;
            }, 1000);
        }
    } else if(contex.level >= 4 && contex.level <= 7) {
        circle_loop(contex);
    } else if(contex.level === 8) {
        intro = intros[3];
        draw();
        if(framewait == 0){
            framewait = 1;
            setTimeout(() => {
                nextLevel();
                framewait = 0;
            }, 2000);
        }
    } else if(contex.level >= 9 && contex.level <= 12) {
        circle_loop(contex);
        framewait = 0;
    } else if(contex.level === 13) {
        intro = intros[3];
        draw();
        if(framewait == 0){
            framewait = 1;

            setTimeout(() => {
                nextLevel();
                nextFrame();
                framewait = 0;
            }, 2000);
        }
    } else {
        if(frame%2==0){
            intro = intros[2];
        } else {
            intro = intros[3];
        }
        draw();
        contex.level++;
    }

    setTimeout(() => {
        gameLoop();
    }, 15);
}

function nextLevel() {
    contex.level++;
}

function nextFrame() {
    frame++;
    setTimeout(() => {
        nextFrame();
    }, 1000);
}

function input() {

}

function update() {

}

function draw() {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0);

    ctx.drawImage(bg, 0, 0);

    ctx.drawImage(introbg, 0, 0);
    ctx.drawImage(intro, 0, 0);

    ctx.drawImage(fg, 0, 0);
}