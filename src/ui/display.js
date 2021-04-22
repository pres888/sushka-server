import {LitElement, html, css} from 'lit-element';

export class DisplayElement extends LitElement {
    static get styles() {
      return css`
        .ui-display {
            border: 1px solid black;
            color: green;
            padding: 6px 10px;
            margin: 4px;
            text-align: center;
        }
      `;
    }
    render() {
      console.log("render DisplayElement", this.value);

        return html`
           <div class='ui-display'>
             <span class='title'>${this.title}</span>
             <span class='value'>${this.value}</span>
             <span class='suffix'>${this['data-suffix']}</span>
            </div>
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
