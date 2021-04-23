import {LitElement, html, css} from 'lit-element';

export class InputElement extends LitElement {
    static get styles() {
      return css`
        :host {
            color: black;
            padding: 10px 0;
            margin: 0;
            text-align: left;
            display: block;
        }
        .error {
            color: red;
        }
        input[type="number"] {
            padding: 5px 8px;
            max-width: 50px;
            background-color: #f8f9fa;
            appearance: none;
            border: 1px solid #ced4da;
            border-radius: .25rem;
        }

        .form-control {
            position: relative;
            flex: 1 1 auto;
            width: 1%;
            min-width: 0;
            display: block;
            width: 100%;
            padding: .375rem .75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border-radius: .25rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        .panel {
            display: inline-flex;
            gap: 8px;
            align-items: baseline;
        }
        button {
            padding: 7px 10px;
            font-size: 1em;
            border: 1px solid #ced4da;
            border-radius: .25rem;
        }
      `;
    }
    render() {
        // Нужно глянуть в документации lit-element, как правильно писать: .disabled или ?disabled
        return html`
            <div class="panel">
                <span class='title'>${this.title}</span>
                <input class="form-control" type="number" pattern="[0-9]*" @input=${(e) => this._onInput(e)} value=${this.value}>
                <span class='suffix'>${this['data-suffix']}</span>
                <button @click=${this._onClick} ?disabled=${!this.isCorrect()}>ОК</button>
            </div>
            ${this.hint()}
        `;
    }
    hint() {
        return this.isCorrect()?
          html``:
          html`<div class="error">Значение должно находиться в диапазоне ${this.min}..${this.max}.</div>`
    }
    isCorrect() {
        return (this.value >= this.min) && (this.value <= this.max);
    }
    _onInput(e) {
        this.value = e.currentTarget.value;
    }
    _onClick(e) {
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
