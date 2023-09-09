
import { key_init, key_input, key_isDown, key_isDownNow } from './keyinput.js';

import { circle_loop } from './game_circle.js';
import { dressUp_loop } from './game_dressUp.js';
import { iron_loop } from './game_iron.js';
import { shake_loop } from './game_shake.js';

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
bg.src = "./assets/ui/bg_purin.png";


const fg = new Image();
fg.src = "./assets/ui/fg_flan.png";

const paw = new Image();
paw.src = "./assets/ui/purin_paw.png";

const mini = new Image();
mini.src = "./assets/ui/purin_mini.png";

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

    if(contex.level >= 0 && contex.level <= 3) {
        intro = intros[contex.level];
        input(contex);
        draw(contex);
        if(framewait == 0){
            framewait = 1;
            setTimeout(() => {
                nextLevel();
                framewait = 0;
            }, 1000);
        }
    } else if(contex.level >= 4 && contex.level <= 6) {
        input(contex);
        circle_loop(contex);
    } else if(contex.level === 7) {
        input(contex);
        iron_loop(contex);
    } else if(contex.level >= 8 && contex.level <= 11) {
        input(contex);
        dressUp_loop(contex);
    } else if(contex.level === 12) {
        input(contex);
        shake_loop(contex);
        framewait = 0;
    } else if(contex.level === 13) {
        intro = intros[3];
        input(contex);
        draw(contex);
        if(framewait == 0){
            framewait = 1;

            setTimeout(() => {
                nextLevel();
                nextFrame();
                framewait = 0;
            }, 2000);
        }
    } else if(contex.level >= 14 && contex.level <= 16) {
        input(contex);
        circle_loop(contex);
    }  else {
        if(frame%2==0){
            intro = intros[2];
        } else {
            intro = intros[3];
        }
        draw(contex);
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

function input(contex) {
    if (key_isDownNow("Enter")){
        contex.level = 0;
    } else if (key_isDownNow(" ")){
        contex.level = contex.level + 1;
    }
}

function update() {

}

function draw(contex) {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0);

    ctx.drawImage(bg, 0, 0);

    ctx.drawImage(introbg, 0, 0);

    if(contex.level >= 0 && contex.level <= 3) {
        ctx.drawImage(paw, 0, 0);
    } else if(contex.level === 7) {
        ctx.drawImage(paw, 0, 0);
    } else if(contex.level === 12) {
        ctx.drawImage(mini, 0, 0);
    } else {
        ctx.drawImage(mini, 0, 0);
    }

    ctx.drawImage(intro, 0, 0);

    ctx.drawImage(fg, 0, 0);
}