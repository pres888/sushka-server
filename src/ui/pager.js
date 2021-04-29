import {LitElement, html, css} from 'lit-element';

export class PagerElement extends LitElement {
    static get styles() {
        return css`
            :host {
                background-color: #f8f9fa;
            }
            ul.page__selector li {
                list-style-type: none; /* Убираем маркеры */
            }
        `;
    }
    // Этот компонент не будет использовать shadow-dom
    createRenderRoot() {
        return this;
    }
    constructor(args) {
        super(args);
        this._value = [];
        // console.log("Create Page", this.children);
        // const children = [...this.children];
        // setTimeout(() => {
        //     for (let index = 0; index < children.length; index++) {
        //         const element = children[index];
        //         this.querySelector(".page__slot").append(element);
        //     }
        // }, 0);
    }
    // set value(v) {
    //     console.log("page/set/value", v);
    //     this._value = v;
    //     setTimeout(() => {
    //         // this.querySelector(".page__slot").replaceChildren(v);
    //     }, 0);
    // }

    // TODO: Кажется от этого как-то можно элегантно избавиться
    firstUpdated() {
    //     if(!this.childs) return null;
        console.log(":ui-page.firstUpdated", this.value, this.childs);
    //     this._replacePage(this.value);
    //     // const selector
    //     // this.querySelector(".page__slot").replaceChildren();
    //     return null;
    }
    render() {
        if(!this.childs) return html`<div>Init...<div>`;

        // this._value
        return html`
            <div class='container'>
                <ul class='page__selector'>
                    ${this.childs.map(item => html`
                        <li @click=${e=>this._onClick(item.value)} class="${item.value == this.value?"selected":""}">${item.title}</li>
                    `)}
                </ul>
                <div class="page__slot"></div>
            </div>
        `;
    }
    _onClick(value) {
        this.value = value;
    }
    _replacePage(value) {
        if(!this.childs) return;
        // Решение не самое удачное в случае если по ошибке будет задано две страницы с одинаковым именем
        this.childs.forEach((ch) => {
            if(ch.value == value) {
                setTimeout(()=>{
                    this.querySelector(".page__slot").replaceChildren(ch.childs);
                }, 0);
            }
        });
    }

    attributeChangedCallback(name, oldval, newval) {
        // console.log('attribute change: ', newval);
        super.attributeChangedCallback(name, oldval, newval);

        if(name == "value") {
            if(!newval) return;
            this._replacePage(newval);
            if(newval != oldval) {
                this.dispatchEvent(new CustomEvent('change', {bubbles: false, composed: true}));
            }
        }
    }

    static get properties() {
        return {
            value: {type: String, reflect: true},
            title: {type: String},
            childs: {type: Object}
        }
    }
}
customElements.define("ui-pager", PagerElement);
