
import { key_init, key_input, key_isDown, key_isDownNow } from './keyinput.js';

let gameClear = false;
let setup = false;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "./assets/ui/bg_purin.png";

const fg = new Image();
fg.src = "./assets/ui/fg_flan.png";

const plate_01 = new Image();
plate_01.src = "./assets/shake/plate_01.png";

const plate_02 = new Image();
plate_02.src = "./assets/shake/plate_02.png";

const cup_00 = new Image();
cup_00.src = "./assets/shake/cup_00.png";

const cup_01 = new Image();
cup_01.src = "./assets/shake/cup_01.png";

const cup_02 = new Image();
cup_02.src = "./assets/shake/cup_02.png";

const cup_03 = new Image();
cup_03.src = "./assets/shake/cup_03.png";

let shakeLevel = 0;
let moveX = 0;

export function shake_loop(contex) {
    if(!setup){
        shake_setup(contex);
        setup = true;
    }
    shake_input(contex);
    shake_update(contex);
    shake_draw(contex);
}

function shake_setup(contex) {

    shakeLevel = 0;


}

function shake_input(contex) {
    if(key_isDownNow("ArrowLeft")){
        moveX = -1;
        shakeLevel += 1;
    } else if(key_isDownNow("ArrowRight")){
        moveX = 1;
        shakeLevel += 1;
    }
}

function shake_update(contex) {


}

function shake_draw(contex) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);


    // draw cup based on shakeLevel, cup is centered in x, top in y, we offset x by 100px left and right by moveX
    if(shakeLevel <= 1){
        ctx.drawImage(cup_00, canvas.width/2 - cup_00.width/2 + moveX*100, 100);
        ctx.drawImage(plate_01, 0, 0, canvas.width, canvas.height);
    } else if(shakeLevel <= 3){
        ctx.drawImage(cup_01, canvas.width/2 - cup_01.width/2 + moveX*100, 100);
        ctx.drawImage(plate_01, 0, 0, canvas.width, canvas.height);
    } else if(shakeLevel <= 5){
        ctx.drawImage(cup_02, canvas.width/2 - cup_02.width/2 + moveX*100, 100);
        ctx.drawImage(plate_01, 0, 0, canvas.width, canvas.height);
    } else if(shakeLevel <= 7){
        ctx.drawImage(cup_03, canvas.width/2 - cup_03.width/2 + moveX*100, 100);
        ctx.drawImage(plate_02, 0, 0, canvas.width, canvas.height);
        if(!gameClear){
            setTimeout(() => {
                contex.level = contex.level + 1;
            }, 1000);
        }
        gameClear = true;
    }

    ctx.drawImage(fg, 0, 0, canvas.width, canvas.height);
}