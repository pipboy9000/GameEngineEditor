'use strict'
import viewport from './viewport';
import canvas from './canvas';

function loop(dt) {

    canvas.clearCanvas();

    viewport.move();

    canvas.draw();
    viewport.draw();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);