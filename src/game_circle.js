
import { key_init, key_input, key_isDown, key_isDownNow } from './keyinput.js';

let gameClear = false;
let angle = 90;

let headActivated = false;

let offset = 0;
let speed = 2.5;
let speedBase = 2.5;
let speedMultiplier = 1;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "./assets/ui/bg_flan.png";
const fg = new Image();
fg.src = "./assets/ui/fg_purin.png";

let circle = new Image();
circle.src = "./assets/circle/circle9000.png";
// circle.src = "./assets/circle/circle2250.png";
// circle.src = "./assets/circle/circle1125.png";

const circle_01 = new Image();
circle_01.src = "./assets/circle/circle9000.png";
const circle_02 = new Image();
circle_02.src = "./assets/circle/circle4500.png";
const circle_03 = new Image();
circle_03.src = "./assets/circle/circle2250.png";

const circle_01P = new Image();
circle_01P.src = "./assets/circle/circle9000P.png";
const circle_02P = new Image();
circle_02P.src = "./assets/circle/circle4500P.png";
const circle_03P = new Image();
circle_03P.src = "./assets/circle/circle2250P.png";

const machine = new Image();
machine.src = "./assets/circle/machine.png";
const headExtended = new Image();
headExtended.src = "./assets/circle/headExtended.png";
const headRetracted = new Image();
headRetracted.src = "./assets/circle/headRetracted.png";

export function circle_loop(contex) {

    if(contex.level >= 4 && contex.level <= 6){
        speedMultiplier = 1.00;
    } else if(contex.level >= 13 && contex.level <= 15){
        speedMultiplier = 1.5;
    }

    if(contex.level === 4){
        speed = speedBase*speedMultiplier;
        offset = 90;
        circle = circle_01;
    } else if(contex.level === 5){
        speed = speedBase*speedMultiplier;
        offset = 45;
        circle = circle_02;
    } else if(contex.level === 6){
        speed = speedBase*speedMultiplier;
        offset = 22.5;
        circle = circle_03;
    } else if(contex.level === 14){
        speed = speedBase*speedMultiplier;
        offset = 90;
        circle = circle_01P;
    } else if(contex.level === 15){
        speed = speedBase*speedMultiplier;
        offset = 45;
        circle = circle_02P;
    } else if(contex.level === 16){
        speed = speedBase*speedMultiplier;
        offset = 22.5;
        circle = circle_03P;
    }

    circle_setup(contex);
    circle_input(contex);
    circle_update(contex);
    circle_draw(contex);
}

function circle_setup(contex) {

}

function circle_input(contex) {
    if(key_isDownNow("z")){
        headActivated = true;
    }
}

function circle_update(contex) {

    if(headActivated && gameClear === false){
        gameClear = true;
        setTimeout(() => {

            // calculate angle in degrees 0-360
            let degrees = angle % 360;
            //console.log(degrees);

            if(degrees > 360-(offset/2) || degrees < (offset/2)){
                contex.level = contex.level + 1;
                gameClear = false;
                headActivated = false;
                angle = 90;
            } else {
                gameClear = false;
                headActivated = false;
                angle = 90;
            }
        }, 1000);
    }
}

let frame = 0;

function circle_draw(contex) {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bg, 0, 0);


    //ctx.drawImage(circle, 0, 0);
    if(headActivated){
        ctx.drawImage(headExtended, 0, 0);
    } else {
        ctx.drawImage(headRetracted, 0, 0);
    }
    ctx.drawImage(machine, 0, 0);

    ctx.save();
    ctx.translate(280+(circle.width / 2), 125+(circle.width / 2));

    // rotate a few degrees every frame
    if(headActivated == false){
        angle += speed;
    }
    ctx.rotate(angle * Math.PI / 180);


    if(contex.level === 4){
        ctx.drawImage(circle_01, -(circle.width / 2), -(circle.height / 2));
    } else if(contex.level === 5){
        ctx.drawImage(circle_02, -(circle.width / 2), -(circle.height / 2));
    } else if(contex.level === 6){
        ctx.drawImage(circle_03, -(circle.width / 2), -(circle.height / 2));
    } else if(contex.level === 14){
        ctx.drawImage(circle_01P, -(circle.width / 2), -(circle.height / 2));
    } else if(contex.level === 15){
        ctx.drawImage(circle_02P, -(circle.width / 2), -(circle.height / 2));
    } else if(contex.level === 16){
        ctx.drawImage(circle_03P, -(circle.width / 2), -(circle.height / 2));
    }

    //ctx.drawImage(circle, -(circle.width / 2), -(circle.height / 2));
    ctx.restore();


    ctx.drawImage(fg, 0, 0);

    frame++;
}


