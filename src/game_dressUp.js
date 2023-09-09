
import { key_init, key_input, key_isDown, key_isDownNow } from './keyinput.js';

let gameClear = false;
let setup = false;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "./assets/ui/bg_flan.png";

const fg = new Image();
fg.src = "./assets/ui/fg_purin.png";

const purin = new Image();
purin.src = "./assets/dressup/purin_03.png";

let stage = 0;
let move = 0;
let pos = canvas.width/2;

let clothes = {
    img: new Image(),
    x: 0,
    y: 0,

    xmin: 300,
    xmax: 900,
}
clothes.img.src = "./assets/dressup/panties.png";



export function dressUp_loop(contex) {
    if(!setup){
        dressUp_setup(contex);
        setup = true;
    }
    dressUp_input(contex);
    dressUp_update(contex);
    dressUp_draw(contex);
}

function dressUp_setup(contex) {
    dressUp_updateClothes(contex);

    // make clothes.x random between xmin and xmax
    clothes.x = Math.floor(Math.random() * (clothes.xmax - clothes.xmin + 1)) + clothes.xmin;
    clothes.y = 0;

    // if clothes.x is too close to the charcter, new rng
    while(clothes.x + clothes.img.width >= pos && clothes.x <= pos + purin.width){
        clothes.x = Math.floor(Math.random() * (clothes.xmax - clothes.xmin + 1)) + clothes.xmin;
    }

    //pos = canvas.width/2 - purin.width/2;
}

function dressUp_input(contex) {
    if(key_isDown("ArrowLeft")){
        move = -1;
    } else if(key_isDown("ArrowRight")){
        move = 1;
    } else {
        move = 0;
    }
}

function dressUp_updateClothes(contex) {
    if(contex.level === 8){
        clothes.img.src = "./assets/dressup/panties.png";
        purin.src = "./assets/dressup/purin_00.png";
    } else if(contex.level === 9){
        clothes.img.src = "./assets/dressup/bra.png";
        purin.src = "./assets/dressup/purin_01.png";
    } else if(contex.level === 10){
        clothes.img.src = "./assets/dressup/dress.png";
        purin.src = "./assets/dressup/purin_02.png";
    } else if(contex.level === 11){
        clothes.img.src = "./assets/dressup/sunglasses.png";
        purin.src = "./assets/dressup/purin_03.png";
    } else if(contex.level === 12){
        clothes.img.src = "./assets/dressup/sunglasses.png";
        purin.src = "./assets/dressup/purin_04.png";
    }
}

function dressUp_update(contex) {
    pos += move*4;

    clothes.y += 3;

    // if colide with clothes
    if(pos + purin.width >= clothes.x && pos <= clothes.x + clothes.img.width && 652 - purin.height + purin.height >= clothes.y && 652 - purin.height <= clothes.y + clothes.img.height){
        setup = false;
        contex.level = contex.level + 1;
    }

    // if clothes fall off screen
    if(clothes.y > canvas.height){
        setup = false;
    }
}

function dressUp_draw(contex) {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(purin, pos, 652 - purin.height);

    ctx.drawImage(clothes.img, clothes.x, clothes.y);

    ctx.drawImage(fg, 0, 0);
}