// import {PolymerElement, html} from '@polymer/polymer';
// import {LitElement, html, customElement} from 'lit-element';
import {LitElement, html} from 'lit-element';
import '@google-web-components/google-chart';

console.log("Hello, sushka!");

// @customElement('new-element')
export class NewElement extends LitElement {
  render() {
                  let options = {
                      width: 400,
                      height: 120,
                      redFrom: 60,
                      redTo: 80,
                      yellowFrom: 50,
                      yellowTo: 60,
                      minorTicks: 5
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
customElements.define("new-element", NewElement);

// class NewElement extends PolymerElement {
//     static get template() {
//         let data = [
//             ['Label', 'Value'],
//             ['Щуп', 80],
//             ['CPU', 55],
//             ['Network', 68]
//         ];
//         return html`
//       <google-chart
//         type='gauge'
//         options='{{options}}'
//         cols='[{"label":"Class", "type":"string"}, {"label":"Value", "type":"number"}]'
//         rows='10'
//         data='{{data}}'
//         >
//       </google-chart>
//     `;
//     }
//     // data=${JSON.stringify(data)}
//     // data='[["Label", "Value"],["Memory", 80],["CPU", 55],["Network", 68]]'
//     // data='{{data}}'
//
//     static get properties() {
//         return {
//             options: {
//                 width: 400,
//                 height: 120,
//                 redFrom: 90,
//                 redTo: 100,
//                 yellowFrom: 75,
//                 yellowTo: 90,
//                 minorTicks: 5
//             },
//             data : {
//                 type: Array,
//                 value: [
//                   ['Label', 'Value'],
//                   ['Щуп', 80],
//                   ['CPU', 55],
//                   ['Network', 68]
//                 ]
//               }
//             // data: [
//             //   ['Label', 'Value'],
//             //   ['Щуп', 80],
//             //   ['CPU', 55],
//             //   ['Network', 68]
//             // ]
//
//
//         }
//     }
// }
// customElements.define('new-element', NewElement);


// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepting the updated printMe module!');
//     printMe();
//   })
// }
