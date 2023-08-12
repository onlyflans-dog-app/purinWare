// key event object
export let keyEvt = {
    state: {
        left : false,
        right: false,
        up   : false,
        down : false,
        space: false,
        enter: false,
        esc  : false,
        shift: false,
        z    : false,
        x    : false,
        a    : false,
        s    : false,
    },
    pressed: {
        left : false,
        right: false,
        up   : false,
        down : false,
        space: false,
        enter: false,
        esc  : false,
        shift: false,
        z    : false,
        x    : false,
        a    : false,
        s    : false,
    },
    pressedNow: {
        left : false,
        right: false,
        up   : false,
        down : false,
        space: false,
        enter: false,
        esc  : false,
        shift: false,
        z    : false,
        x    : false,
        a    : false,
        s    : false,
    },
}

function key_keydown(e) {
    e.preventDefault();
    if (e.key === "ArrowLeft") { keyEvt.state.left  = true;}
    if (e.key === "ArrowRight") { keyEvt.state.right = true; }
    if (e.key === "ArrowUp") { keyEvt.state.up    = true; }
    if (e.key === "ArrowDown") { keyEvt.state.down  = true; }
    if (e.key === " ") { keyEvt.state.space  = true; }
    if (e.key === "Enter") { keyEvt.state.enter  = true; }
    if (e.key === "z" || e.key === "Z") { keyEvt.state.z  = true; }
    if (e.key === "x" || e.key === "X") { keyEvt.state.x  = true; }
    if (e.key === "a" || e.key === "A") { keyEvt.state.a  = true; }
    if (e.key === "s" || e.key === "S") { keyEvt.state.s  = true; }

}

function key_keyup(e) {
    if (e.key === "ArrowLeft") { keyEvt.state.left  = false;  keyEvt.pressed.left  = false; }
    if (e.key === "ArrowRight") { keyEvt.state.right = false;  keyEvt.pressed.right  = false; }
    if (e.key === "ArrowUp") { keyEvt.state.up    = false;  keyEvt.pressed.up  = false; }
    if (e.key === "ArrowDown") { keyEvt.state.down  = false;  keyEvt.pressed.down  = false; }
    if (e.key === " ") { keyEvt.state.space  = false;  keyEvt.pressed.space  = false; }
    if (e.key === "Enter") { keyEvt.state.enter  = false;  keyEvt.pressed.enter  = false; }
    if (e.key === "z" || e.key === "Z") { keyEvt.state.z  = false;  keyEvt.pressed.z  = false; }
    if (e.key === "x" || e.key === "X") { keyEvt.state.x  = false;  keyEvt.pressed.x  = false; }
    if (e.key === "a" || e.key === "A") { keyEvt.state.a  = false;  keyEvt.pressed.a  = false; }
    if (e.key === "s" || e.key === "S") { keyEvt.state.s  = false;  keyEvt.pressed.s  = false; }
}

export function key_init() {
    // read key input press
    document.addEventListener("keydown", function (e) {
        key_keydown(e);
    });

    // read key input release
    document.addEventListener("keyup", function (e) {
        key_keyup(e);
    });
}

export function key_input() { 
    // update keyEvt.pressedNow
    keyEvt.pressedNow.left  = keyEvt.state.left  && !keyEvt.pressed.left;
    if(keyEvt.pressedNow.left){
        keyEvt.pressed.left  = true; 
    }

    keyEvt.pressedNow.right = keyEvt.state.right && !keyEvt.pressed.right;
    if(keyEvt.pressedNow.right){
        keyEvt.pressed.right  = true; 
    }

    keyEvt.pressedNow.up    = keyEvt.state.up    && !keyEvt.pressed.up;
    if(keyEvt.pressedNow.up){
        keyEvt.pressed.up  = true; 
    }
    
    keyEvt.pressedNow.down  = keyEvt.state.down  && !keyEvt.pressed.down;
    if(keyEvt.pressedNow.down){
        keyEvt.pressed.down  = true; 
    }
    
    keyEvt.pressedNow.space  = keyEvt.state.space  && !keyEvt.pressed.space;
    if(keyEvt.pressedNow.space){
        keyEvt.pressed.space  = true; 
    }
    
    keyEvt.pressedNow.enter  = keyEvt.state.enter  && !keyEvt.pressed.enter;
    if(keyEvt.pressedNow.enter){
        keyEvt.pressed.enter  = true; 
    }
    
    keyEvt.pressedNow.z  = keyEvt.state.z  && !keyEvt.pressed.z;
    if(keyEvt.pressedNow.z){
        keyEvt.pressed.z  = true; 
    }
    
    keyEvt.pressedNow.x  = keyEvt.state.x  && !keyEvt.pressed.x;
    if(keyEvt.pressedNow.x){
        keyEvt.pressed.x  = true; 
    }
    
    keyEvt.pressedNow.a  = keyEvt.state.a  && !keyEvt.pressed.a;
    if(keyEvt.pressedNow.a){
        keyEvt.pressed.a  = true; 
    }
    
    keyEvt.pressedNow.s  = keyEvt.state.s  && !keyEvt.pressed.s;
    if(keyEvt.pressedNow.s){
        keyEvt.pressed.s  = true; 
    }
}

export function key_isDown(e) {
    if (e === "ArrowLeft") { return keyEvt.state.left}
    if (e === "ArrowRight") { return keyEvt.state.right}
    if (e === "ArrowUp") { return keyEvt.state.up}
    if (e === "ArrowDown") { return keyEvt.state.down}
    if (e === " ") { return keyEvt.state.space}
    if (e === "Enter") { return keyEvt.state.enter}
    if (e === "z" || e === "Z") { return keyEvt.state.z}
    if (e === "x" || e === "X") { return keyEvt.state.x}
    if (e === "a" || e === "A") { return keyEvt.state.a}
    if (e === "s" || e === "S") { return keyEvt.state.s}
}

export function key_isDownNow(e) {
    if (e === "ArrowLeft") { return keyEvt.pressedNow.left}
    if (e === "ArrowRight") { return keyEvt.pressedNow.right}
    if (e === "ArrowUp") { return keyEvt.pressedNow.up}
    if (e === "ArrowDown") { return keyEvt.pressedNow.down}
    if (e === " ") { return keyEvt.pressedNow.space}
    if (e === "Enter") { return keyEvt.pressedNow.enter}
    if (e === "z" || e === "Z") { return keyEvt.pressedNow.z}
    if (e === "x" || e === "X") { return keyEvt.pressedNow.x}
    if (e === "a" || e === "A") { return keyEvt.pressedNow.a}
    if (e === "s" || e === "S") { return keyEvt.pressedNow.s}
}
