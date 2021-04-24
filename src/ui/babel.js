import {LitElement, html, customElement, property} from 'lit-element';

@customElement('my-element')
class MyElement extends LitElement {

 // Declare observed properties
 @property()
 adjective = 'awesome';

 // Define the element's template
 render() {
   return html`<p>your ${this.adjective} template-here</p>`;
 }
}
