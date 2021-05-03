import {LitElement, html} from 'lit-element';
import css from './time.scss';

const f = new Intl.NumberFormat('en-US', {minimumIntegerDigits:2});

export class TimeElement extends LitElement {
    static get styles() {
        return [css];
    }
    render() {
        // Нужно глянуть в документации lit-element, как правильно писать: .disabled или ?disabled
        return html`
            <span class='title' >${this.title}</span>
            <span class='control key_minus' ?disabled=${this.minusDisabled()} @click=${(e)=>this._onClickMinus(e)}>&#8722;15&#x2032;</span>
            <span class='value'>${this.formatValue()}${this.["data-suffix"]}</span>
            <span class='control key_plus' ?disabled=${this.plusDisabled()} @click=${(e)=>this._onClickPlus(e)}>+15&#x2032;</span>
        `;
    }
    formatValue() {
        // Форматируем значение в HH:MM
        const hours = Math.floor((this.value|0) / 60);
        const minutes = (this.value|0) % 60;
        return `${f.format(hours)}:${f.format(minutes)}`;
    }
    minusDisabled() {
        return (this.value|0)-15 < (this.min|0);
    }
    plusDisabled() {
        return (this.value|0)+15 > (this.max|0);
    }

    _onClickMinus(e) {
        const v = this.value | 0;
        if( v-15 >= (this.min|0) ) {
            this.value = (this.value|0) - 15;
            let myEvent = new CustomEvent('change', {
                detail: { message: 'change happened.' },
                bubbles: false,
                composed: true });
                this.dispatchEvent(myEvent);
        }
    }
    _onClickPlus(e) {
        const v = this.value | 0;
        if( v+15 <= (this.max|0) ) {
            this.value = (this.value|0) + 15;
            let myEvent = new CustomEvent('change', {
                detail: { message: 'change happened.' },
                bubbles: false,
                composed: true });
                this.dispatchEvent(myEvent);
        }
    }
    static get properties() {
        return {
            value : {type: Number},
            title: {type: String},
            min: {type: Number},
            max: {type: Number},
            'data-suffix': {type: String}
        }
    }
}
customElements.define("ui-time", TimeElement);
