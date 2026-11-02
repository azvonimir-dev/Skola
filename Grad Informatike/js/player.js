const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false };

window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
});

function postaviTouchKontrole() {
    const bindBtn = (id, keyName) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('touchstart', (e) => { e.preventDefault(); keys[keyName] = true; });
        btn.addEventListener('touchend', (e) => { e.preventDefault(); keys[keyName] = false; });
        btn.addEventListener('mousedown', () => { keys[keyName] = true; });
        btn.addEventListener('mouseup', () => { keys[keyName] = false; });
    };

    bindBtn('btn-up', 'w');
    bindBtn('btn-left', 'a');
    bindBtn('btn-down', 's');
    bindBtn('btn-right', 'd');
}

document.addEventListener('DOMContentLoaded', postaviTouchKontrole);
