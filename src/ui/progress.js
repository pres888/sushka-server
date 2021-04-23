import {LitElement, html, css} from 'lit-element';

export class ProgressElement extends LitElement {
    static get styles() {
      return css`
        :host {
            display: flex;
            height: 30px;
            padding-top: 2px;
            align-items: baseline;
            gap: 6px;
            /* padding-bottom: 20px; */
        }
        p {
            position: relative;
            top:-25px;
        }
        progress {
            flex: auto;
            position: relative;
            bottom: 21px;
        }
      `;
    }
    render() {
        return html`
            <p>${this.title}</p>
            <progress max="${this.max}" value="${this.value}">
                ${this.value}${this['data-suffix']}
            </progress>
        `;
    }
    static get properties() {
        return {
            title: {type: String},
            value : {type: Number},
            max : {type: Number},
            'data-suffix': {type: String}
        }
    }
}
customElements.define("ui-progress", ProgressElement);
