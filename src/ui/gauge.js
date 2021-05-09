import {LitElement, html, svg} from 'lit-element';
// import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import {unsafeSVG} from 'lit-html/directives/unsafe-svg';

import css from './gauge.scss';
// import Gauge from 'svg-gauge';


// console.log("Gauge=", Gauge);

export class GaugeElement extends LitElement {
    static get styles() {
      return [css];
    }
    constructor(args) {
        super(args);
        // console.log("GaugeElement:constructor", Gauge);
    }

    // createRenderRoot() {
    //   // Do not use a shadow root
    //   return this;
    // }
    render() {
        // Получим значение в процентах
        let val = ((this.value | 0) - (this.min|0)) / ((this.max|0) - (this.min|0));
        if(val < 0.0) val = 0.0;
        if(val > 1.0) val = 1.0;

        // return renderGauge();

        return html`
            <div class="gauge">
                ${renderGauge(val)}
                <div class="gauge__value">
                    ${this.value}
                    <span class="gauge__suffix">${this['data-suffix']}</span>
                    <div class="gauge__description">${this.title}</div>
                </div>
            </div>
        `;
    }
    // <!-- <div class="gauge__body">
    //     <div class="gauge__fill" style="transform:rotate(${val/2}turn)"></div>
    //     <div class="gauge__cover">
    //         ${this.value}
    //         <span class="gauge__suffix">${this['data-suffix']}</span>
    //     </div>
    // </div>
    // <div class="gauge__description">${this.title}</div> -->

    // TODO:  Надо бы потом сделать анимацию при изменении
    // async performUpdate() {
    //   console.log('Requesting animation frame...');
    //   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    //   console.log('Got animation frame. Performing update');
    //   super.performUpdate();
    // }

    static get properties() {
        return {
            title: {type: String},
            value : {type: Number},
            min: {type: Number},
            max: {type: Number},
            'data-suffix': {type: String}
        }
    }
}
customElements.define("ui-gauge", GaugeElement);


const renderGauge = (p) => {
    const c = getCartesian(50, 50, 40, (p*180)-180);
    // console.log("renderGauge", p, c);
    const r1 = `M 10 50 A 40 40 0 0 1 ${c.x} ${c.y}`;
    const r2 = "M 10 50 A 40 40 0 0 1 70.741 15.797";
    return svg`
        <svg viewBox="0 0 100 60" class="gauge">
            <path class="dial" fill="none"   d="M 10 50 A 40 40 0 0 1 90 50"></path>
            <path class="value" fill="none"   d="M 10 50 A 40 40 0 0 1 ${c.x} ${c.y}" style="">
            </path>
        </svg>
    `;
}

function getCartesian(cx, cy, radius, angle) {
  var rad = angle * Math.PI / 180;
  return {
    x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
    y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000
  };
}

// <path class="value" fill="none"  d="M 10 50 A 40 40 0 0 1 89.93 47.627"></path>

// <g class="text-container">
//     <text x="50" y="50" fill="#999" class="value-text" font-size="100%" font-family="sans-serif" font-weight="normal" text-anchor="middle" alignment-baseline="middle" dominant-baseline="central">17</text>
// </g>




// var cpuGauge = Gauge(document.getElementById("cpuSpeed"), {
//     max: 100,
//     // custom label renderer
//     label: function(value) {
//       return Math.round(value) + "/" + this.max;
//     },
//     value: 50,
//     // Custom dial colors (Optional)
//     color: function(value) {
//       if(value < 20) {
//         return "#5ee432"; // green
//       }else if(value < 40) {
//         return "#fffa50"; // yellow
//       }else if(value < 60) {
//         return "#f7aa38"; // orange
//       }else {
//         return "#ef4655"; // red
//       }
//     }
// });
