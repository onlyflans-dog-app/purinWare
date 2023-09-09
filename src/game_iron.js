
import { key_init, key_input, key_isDown, key_isDownNow } from './keyinput.js';

let gameClear = false;
let setup = false;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "./assets/ui/bg_purin.png";

const fg = new Image();
fg.src = "./assets/ui/fg_flan.png";

const ironImg = new Image();
ironImg.src = "./assets/iron/iron.png";

const dressImg = new Image();
dressImg.src = "./assets/iron/dress.png";

const foldImg = new Image();
foldImg.src = "./assets/iron/fold.png";

let ironX = 0;
let ironY = 0;
let moveX = 0;
let moveY = 0;

let fold1 = {
    x: 0,
    y: 0,
    xmin: 400,
    xmax: 800,
    ymin: 400,
    ymax: 500
}


export function iron_loop(contex) {
    if(!setup){
        iron_setup(contex);
        setup = true;
    }
    iron_input(contex);
    iron_update(contex);
    iron_draw(contex);
}

function iron_setup(contex) {

    ironX = canvas.width/2 - ironImg.width/2;
    ironY = canvas.height/2 - ironImg.height/2 -100;

    fold1.x = Math.floor(Math.random() * (fold1.xmax - fold1.xmin + 1)) + fold1.xmin;
    fold1.y = Math.floor(Math.random() * (fold1.ymax - fold1.ymin + 1)) + fold1.ymin;

}

function iron_input(contex) {
    if(key_isDown("ArrowLeft")){
        moveX = -2;
    } else if(key_isDown("ArrowRight")){
        moveX = 2;
    } else {
        moveX = 0;
    }

    if(key_isDown("ArrowUp")){
        moveY = -2;
    } else if(key_isDown("ArrowDown")){
        moveY = 2;
    } else {
        moveY = 0;
    }
}

function iron_update(contex) {

    ironX += moveX;
    ironY += moveY;

    if(ironX < 0){
        ironX = 0;
    } else if(ironX + ironImg.width > canvas.width){
        ironX = canvas.width - ironImg.width;
    }

    if(ironY < 0){
        ironY = 0;
    } else if(ironY + ironImg.height > canvas.height){
        ironY = canvas.height - ironImg.height;
    }

    if(ironX + ironImg.width >= fold1.x && ironX <= fold1.x + foldImg.width && ironY + ironImg.height >= fold1.y && ironY <= fold1.y + foldImg.height){
        contex.level = contex.level + 1;
    }

}

function iron_draw(contex) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(dressImg, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(foldImg, fold1.x, fold1.y, foldImg.width, foldImg.height);

    ctx.drawImage(ironImg, ironX, ironY, ironImg.width, ironImg.height);

    ctx.drawImage(fg, 0, 0, canvas.width, canvas.height);
}