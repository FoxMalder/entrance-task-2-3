import drawSector from './draw-sector.js'
import TweenLite from "gsap/TweenLite";
import Draggable from "gsap/Draggable";

export default function knob(modal) {
    let knob = modal.querySelector(".circle-indicator__control-knob");
    let value = modal.querySelector(".circle-indicator__value");
    let status = modal.querySelector('.modal-content__status-info-value');
    let svg = modal.querySelector('svg');
    let sections = 10;

    function killTweens() {
        TweenLite.killTweensOf(knob);
    }

    function onRotateKnob() {
        let percent = dragKnob.endRotation / 3
        svg.dataset.percent = percent;
        drawSector(modal);
        if( percent <= 4) {
            value.textContent = '0';
            status.textContent = value.textContent;
        } else if (percent >= 96) {
            value.textContent = '+30';
            status.textContent = value.textContent;
        } else {
            value.textContent = '+' + ((30 * percent) / 100).toFixed(0);
            status.textContent = value.textContent;
        }

        console.log('rotate', dragKnob);

    }

    //create the knob Draggable
    Draggable.create(knob, {
        type: "rotation",
        throwProps: true,
        edgeResistance: 0.85,
        bounds: {minRotation: 2, maxRotation: 302},
        onDragStart: killTweens,
        onDrag: onRotateKnob,
        onThrowUpdate: onRotateKnob,
        snap: function (endValue) {
            var step = 300 / (sections - 1);
            return Math.round(endValue / step) * step;
        }
    });


    var dragKnob = Draggable.get(knob);
}

