import {LitElement, html, css} from 'lit-element';

// import Style from './button.scss';

export class ButtonElement extends LitElement {
    static get styles() {
        return css`
            :host {
                display: flex;
            }
            button {
                flex: auto;
                padding: var(--cmdPadding);
                font-size: var(--font-size);
                color: var(--cmdColor);
                /* background: rgba(var(--cmdBackground), 0.5); */
                background: var(--cmdBackground);
                cursor: pointer;
            }
            button:active {
                background: var(--cmdColor);
                color: var(--cmdBackground);
            }
        `;
    }
    render() {
        return html`
            <button @click=${(e) => this._onClick(e)}>${this.title}</button>
        `;
    }
    _onClick(e) {
        // this.value = $this.value;
        // Это наверное не надо
        // this.value = e.currentTarget.value;
        console.log("_onClick", this.value, e.currentTarget.value);
        this.dispatchEvent(new CustomEvent('change', {bubbles: false, composed: true}));
    }

    static get properties() {
        return {
            title: {type: String},
            value : {type: Number},
        }
    }
}
customElements.define("ui-button", ButtonElement);
