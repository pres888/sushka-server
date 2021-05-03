import {LitElement, html, css} from 'lit-element';

export class DisplayElement extends LitElement {
    static get styles() {
        return css`
            :host {
                background-color: var(--background);
                color: var(--color);
                padding: var(--padding);
                /* --text-color: green; */
                /* margin: 4px; */
                text-align: center;
            }
        `;
    }
    render() {
        return html`
            <span class='title'>${this.title}</span>
            <span class='value'>${this.value}</span>
            <span class='suffix'>${this['data-suffix']}</span>
        `;
    }
    static get properties() {
        return {
            value : {type: String},
            title: {type: String},
            'data-suffix': {type: String}
        }
    }
}
customElements.define("ui-display", DisplayElement);
