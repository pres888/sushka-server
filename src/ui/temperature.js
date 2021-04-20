import {LitElement, html} from 'lit-element';
import '@google-web-components/google-chart';

export default {
    title: "Temperature"
}

export class TemperatureElement extends LitElement {
  render() {
                  let options = {
                      width: 400,
                      height: 120,
                      redFrom: 60,
                      redTo: 80,
                      yellowFrom: 50,
                      yellowTo: 60,
                      minorTicks: 5,
                      greenFrom: 40,
                      greenTo: 50,
                      min: -60,
                      max: 90
                  };

              let data = [
                  ['Label', 'Value'],
                  ['Щуп', 56],
                  ['Вакуум', 964]
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
}
customElements.define("ui-temperature", TemperatureElement);
