import {LitElement, customElement, property, html, css} from 'lit-element';

@customElement('ui-component')
class ComponentElement extends LitElement {
    @property() title
    @property({attribute: false}) data = {};

    static get styles() {
        return css`
            :host {
                background-color: #f8f9fa;
                --text-color: black;
                border: 1px solid #ccc;
                cursor: pointer;
                padding: 4px;
                text-align: center;
                display: flex;
                align-items: baseline;
            }
            :host(:hover) {
                border: 1px solid #000;
            }
            :host(.active) {
                outline: 4px solid green;
                z-index: 1000;
            }
            :host * {
                flex: 1;
            }
            span {
                overflow: hidden;
            }
            .remover, .looker, .adder {
                flex: 0;
                padding: 0 6px;
            }
            .remover:hover {
                background-color: #ccc;
                color: red;
            }
            .looker:hover {
                background-color: #ccc;
                color: green;
            }
            .adder:hover {
                background-color: #ccc;
                color: lime;
            }
        `;
    }
    render() {
        // Вообще для группы лучше сделать отдельный компонент
        // А пока строки будем различать по отсутвию поля title
        if(this.title == "") {
            return html`
                <slot></slot>
                <div class="adder" title="Добавить компонент" @click="${this._adder}">&#x2795;</div>
                <div class="remover" title="Удалить строку" @click="${this._remover}">&#x1F5D1;</div>
            `;
        } else {
            let title = this.title;
            // if(title == "display") title = "🖵";
            // if(title == "button") title = "🔲";
            return html`
                <div class="looker" title="Показать компонент" @click="${this._looker}">&#x1F441;</div>
                <span>${this.data.t}</span>
                <div class="remover" title="Удалить компонент" @click="${this._remover}">&#x1F5D1;</div>
            `;
        }
    }

    _looker() {
        // console.log("Look at me clicked", this);
        this.dispatchEvent(new CustomEvent('look', {bubbles: false, composed: true}));
    }

    _remover() {
        // console.log("Remover clicked", this);
        this.dispatchEvent(new CustomEvent('remove', {bubbles: false, composed: true}));
    }

    _adder() {
        // console.log("Remover clicked", this);
        this.dispatchEvent(new CustomEvent('add', {bubbles: false, composed: true}));
    }

    // attributeChangedCallback(name, oldval, newval) {
    //     console.log('attribute change: ', newval);
    //     super.attributeChangedCallback(name, oldval, newval);
    //
    //     if(name == "data") {
    //         console.log("data is changed", oldval, newval);
    //     }
    // }

    setData(name, value) {
        // console.log("data is changed", name, value);
        this.data[name] = value;
        // this.update();
        this.requestUpdate();
    }
    setDataAbs(value) {
        // console.log("data is changed", name, value);
        this.data = value;
        // this.update();
        this.requestUpdate();
    }

    static get properties() {
        return {
            value : {type: String},
            title: {type: String},
            'data-suffix': {type: String}
        }
    }
}
