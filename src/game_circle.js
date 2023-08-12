
import { key_init, key_input, key_isDown, key_isDownNow } from './keyinput.js';

let gameClear = false;
let angle = 90;

let headActivated = false;

let offset = 0;
let speed = 2.5;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "./assets/ui/bg_flan.png";
const fg = new Image();
fg.src = "./assets/ui/fg_purin.png";

const circle = new Image();
circle.src = "./assets/circle/circle9000.png";
// circle.src = "./assets/circle/circle2250.png";
// circle.src = "./assets/circle/circle1125.png";

const machine = new Image();
machine.src = "./assets/circle/machine.png";
const headExtended = new Image();
headExtended.src = "./assets/circle/headExtended.png";
const headRetracted = new Image();
headRetracted.src = "./assets/circle/headRetracted.png";

export function circle_loop(contex) {

    if(contex.level === 4){
        speed = 2.5;
        offset = 90;
        circle.src = "./assets/circle/circle9000.png";
    } else if(contex.level === 5){
        speed = 2.5;
        offset = 45;
        circle.src = "./assets/circle/circle4500.png";
    } else if(contex.level === 6){
        speed = 2.5;
        offset = 22.5;
        circle.src = "./assets/circle/circle2250.png";
    } else if(contex.level === 7){
        speed = 2.5;
        offset = 11.25;
        circle.src = "./assets/circle/circle1125.png";
    }


    if(contex.level === 9){
        speed = 5;
        offset = 90;
        circle.src = "./assets/circle/circle9000.png";
    } else if(contex.level === 10){
        speed = 5;
        offset = 45;
        circle.src = "./assets/circle/circle4500.png";
    } else if(contex.level === 11){
        speed = 5;
        offset = 22.5;
        circle.src = "./assets/circle/circle2250.png";
    } else if(contex.level === 12){
        speed = 5;
        offset = 11.25;
        circle.src = "./assets/circle/circle1125.png";
    }

    circle_setup();
    circle_input();
    circle_update(contex);
    circle_draw(contex);
}

function circle_setup() {

}

function circle_input() {
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

    ctx.save();
    ctx.translate(306+(circle.width / 2), 137+(circle.width / 2));

    // rotate a few degrees every frame
    if(headActivated == false){
        angle += speed;
    }
    ctx.rotate(angle * Math.PI / 180);

    ctx.drawImage(circle, -(circle.width / 2), -(circle.height / 2));
    ctx.restore();

    if(headActivated){
        ctx.drawImage(headExtended, 0, 0);
    } else {
        ctx.drawImage(headRetracted, 0, 0);
    }
    //ctx.drawImage(circle, 0, 0);
    ctx.drawImage(machine, 0, 0);

    ctx.drawImage(fg, 0, 0);

    frame++;
}


