import {LitElement, html, css} from 'lit-element';

export class RangeElement extends LitElement {
    static get styles() {
        return css`
            :host {
                padding: 10px 0;
                color: var(--themeColor);
                background-color: var(--themeBackground);
            }
            .slidecontainer {
                display: flex;
            }
            .slidecontainer input[type="range"] {
                flex: auto;
            }
        `;
    }
    render() {
        return html`
            <div class="slidecontainer">
                <span>${this.title}</span>
                <input
                    type="range"
                    min="${this.min}"
                    max="${this.max}"
                    value=${this.value}
                    @change=${(e) => this._onChange(e)}
                    @input=${(e) => this._onInput(e)}
                >
                <label>${this.value}</label>
            </div>
        `;
    }
    _onInput(e) {
        this.value = e.currentTarget.value;
    }
    _onChange(e) {
        this.value = e.currentTarget.value;
        this.dispatchEvent(new CustomEvent('change', {bubbles: false, composed: true}));
    }

    static get properties() {
        return {
            title: {type: String},
            value : {type: Number, reflect: true},
            min : {type: Number},
            max : {type: Number},
            'data-suffix': {type: String}
        }
    }
}
customElements.define("ui-range", RangeElement);
