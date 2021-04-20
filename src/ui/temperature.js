import {LitElement, html} from 'lit-element';
import '@google-web-components/google-chart';

export default {
    title: "Temperature"
}

export class TemperatureElement extends LitElement {
  render() {
      console.log("render TemperatureElement", this.value);
      let options = {
          width: 600,
          height: 240,
          redFrom: 60,
          redTo: 80,
          yellowFrom: 50,
          yellowTo: 60,
          minorTicks: 5,
          greenFrom: 40,
          greenTo: 50,
          min: 20,
          max: 90
      };
      let data = [
          ['Label', 'Value'],
          ['Щуп', this.value]
      ];

    return html`
   <google-chart
     type='gauge'
     options=${JSON.stringify(options)}
     cols='[{"label":"Class", "type":"string"}, {"label":"Value", "type":"number"}]'
     rows='10'
     data=${JSON.stringify(data)}
     >
   </google-chart>
    `;
  }
  static get properties() {
      return {
          value : {type: Number}
      }

  }
}
customElements.define("ui-temperature", TemperatureElement);
