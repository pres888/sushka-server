import {LitElement, html} from 'lit-element';
import css from './input.scss';

export class InputElement extends LitElement {
    static get styles() {
        return [css];
    }
    render() {
        // Нужно глянуть в документации lit-element, как правильно писать: .disabled или ?disabled
        return html`
                <span class='title'>${this.title}</span>
                <input class="form-control" type="number" pattern="[0-9]*" @input=${(e) => this._onInput(e)} .value=${this.value}>
                <span class='suffix'>${this['data-suffix']}</span>
                <button @click=${(e) => this._onClick(e)} ?disabled=${!this.isCorrect()}>ОК</button>
            ${this.hint()}
        `;
    }
    hint() {
        return this.isCorrect()?
          html``:
          html`<div class="error">Значение должно находиться в диапазоне ${this.min}..${this.max}.</div>`
    }
    isCorrect() {
        return ((this.value|0) >= (this.min|0)) && ((this.value|0) <= (this.max|0));
    }
    _onInput(e) {
        // console.log("input:_onInput", e);
        this.value = e.currentTarget.value;
    }
    _onClick(e) {
        console.log("input:change", this.value);
        let myEvent = new CustomEvent('change', {
          detail: { message: 'change happened.' },
          bubbles: false,
          composed: true });
        this.dispatchEvent(myEvent);
    }

    // attributeChangedCallback(name, oldval, newval) {
    //     console.log('attribute change: ', newval);
    //     super.attributeChangedCallback(name, oldval, newval);
    //
    //     if(name == "value") {
    //         console.log(`attribute change: ${oldval} -> ${newval}`);
    //         // if(!newval) return;
    //         // this._replacePage(newval);
    //         // if(newval != oldval) {
    //         //     this.dispatchEvent(new CustomEvent('change', {bubbles: false, composed: true}));
    //         // }
    //     }
    // }

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
customElements.define("ui-input", InputElement);
