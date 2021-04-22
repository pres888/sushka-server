import {LitElement, html, css} from 'lit-element';

export class ProgressElement extends LitElement {
    static get styles() {
      return css`
      `;
    }
    render() {
      console.log("render DisplayElement", this.value);

        return html`
            <div class="slider">
            	  <div class="line"></div>
              <div class="subline inc"></div>
              <div class="subline dec"></div>
            </div>
        `;
    }
}
customElements.define("ui-progress", ProgressElement);
