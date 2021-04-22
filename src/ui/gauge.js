import {LitElement, html} from 'lit-element';
import css from './gauge.css.js';

export class GaugeElement extends LitElement {
    static get styles() {
      return [css];
    }
    render() {
        console.log("render GaugeElement", this.value);

        // Получим значение в процентах
        let val = (this.value - this.min) / (this.max - this.min);
        if(val < 0.0) val = 0.0;
        if(val > 1.0) val = 1.0;

        return html`
            <div class="gauge">
                <div class="gauge__body">
                    <div class="gauge__fill" style="transform:rotate(${val/2}turn)"></div>
                    <div class="gauge__cover">
                        ${this.value}
                        <span class="gauge__suffix">${this['data-suffix']}</span>
                    </div>
                </div>
                <div class="gauge__description">${this.title}</div>
            </div>
        `;
    }
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
