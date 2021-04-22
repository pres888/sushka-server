import {LitElement, html, css} from 'lit-element';

export class InputElement extends LitElement {
    static get styles() {
      return css`
        :host {
            color: black;
            padding: 6px 10px;
            margin: 4px;
            text-align: left;
            display: block;
        }
        .error {
            color: red;
        }
        input[type="text" i] {
            padding: 1px 2px;
            font-size: 20px;
            max-width: 50px;
        }
        .panel {
            display: inline-flex;
            gap: 4px;
        }
        button {
            padding: 5px 10px;
        }
      `;
    }
    render() {
        console.log("render InputElement", this.value);
        return html`
            <div class="panel">
                <span class='title'>${this.title}</span>
                <input type="text" @input=${(e) => this._onInput(e)} value=${this.value}>
                <span class='suffix'>${this['data-suffix']}</span>
                ${this.isCorrect()?
                    html`<button @click=${this._onClick}>ОК</button>`:
                    html``}
            </div>

            ${this.isCorrect()?
              html``:
              html`<div class="error">Значение должно находиться в диапазоне ${this.min}..${this.max}.</div>`}
        `;
    }

    // ${isCorrect()?
    //     html`<div class="error">Значение должно находиться в диапазоне ${this.min}..${this.max}.</div>` :
    //     html``}
    isCorrect() {
        return (this.value >= this.min) && (this.value <= this.max);
    }
    handleEvent(e){
      console.log("handleEvent", e.bubbles);
    }
    _onInput(e) {
        this.value = e.currentTarget.value;
        console.log("_onInput", this.value);
    }
    _onClick(e) {
        console.log("_onClick", this.value, this._value);

        let myEvent = new CustomEvent('change', {
          detail: { message: 'change happened.' },
          bubbles: true,
          composed: true });
        this.dispatchEvent(myEvent);
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
customElements.define("ui-input", InputElement);
