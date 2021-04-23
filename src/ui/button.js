import {LitElement, html, css} from 'lit-element';

import Style from './button.scss';

export class ButtonElement extends LitElement {
    static get styles() { return [Style]; }
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
        this.dispatchEvent(new CustomEvent('change', {bubbles: true, composed: true}));
    }

    static get properties() {
        return {
            title: {type: String},
            value : {type: Number},
        }
    }
}
customElements.define("ui-button", ButtonElement);
