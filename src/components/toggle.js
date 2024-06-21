import "dark-mode-toggle";
import {LitElement, css, html, unsafeCSS} from "lit";
import {customElement} from "lit/decorators.js";
import LightURL from "../assets/light.svg?url";
import DarkURL from "../assets/dark.svg?url";

/**
 * ColourSchemeToggle element
 */
@customElement("colour-scheme-toggle")
export class ColourSchemeToggle extends LitElement {
    constructor() {
        super();
        this.addEventListener("colorschemechange", (e) => {
            document.documentElement.classList.toggle("light", e.detail.colorScheme === "light");
        });
    }
    
    render() {
        return html`
            <dark-mode-toggle appearance="toggle" permanent></dark-mode-toggle>
        `;
    }
    
    static get styles() {
        return css`
          dark-mode-toggle {
            contain: none;
            --dark-mode-toggle-icon-size: 16px;
            --dark-mode-toggle-dark-icon: url("${unsafeCSS(DarkURL)}");
            --dark-mode-toggle-light-icon: url("${unsafeCSS(LightURL)}");
            
            &::part(fieldset) {
              padding: 0;
              height: 32px;
            }
            
            &::part(aside) {
              display: none;
            }
            
            &::part(toggleLabel) {
              display: inline-block;
              position: relative;
              margin: calc(var(--dark-mode-toggle-icon-size) / 2) 0;
              height: var(--dark-mode-toggle-icon-size);
              width: calc(var(--dark-mode-toggle-icon-size) * 2);
              background-color: #b7bbbd;
              border-radius: var(--dark-mode-toggle-icon-size);
              transition: 0.4s;
            }
            
            &[mode='dark']::part(toggleLabel) {
              background-color: #4e5255;
            }
            
            &::part(toggleLabel)::before, &::part(toggleLabel)::after {
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              border-radius: 100%;
              background-repeat: no-repeat;
              background-position: center;
              box-sizing: border-box;
              content: "";
            }
            
            &::part(toggleLabel)::before {
              top: calc(var(--dark-mode-toggle-icon-size) * -0.25);
              left: calc(var(--dark-mode-toggle-icon-size) * -0.125);
              height: calc(var(--dark-mode-toggle-icon-size) * 1.5);
              width: calc(var(--dark-mode-toggle-icon-size) * 1.5);
              color: #333;
              background-color: #fff;
              transition: all 0.4s;
              background-size: calc(var(--dark-mode-toggle-icon-size) * 1.25);
              background-image: var(--dark-mode-toggle-light-icon);
              filter: var(--dark-mode-toggle-icon-filter, invert(100%));
              z-index: 1;
            }
            
            &::part(toggleLabel)::after {
              top: calc(var(--dark-mode-toggle-icon-size) * 0.125);
              left: calc(100% - calc(var(--dark-mode-toggle-icon-size) * 0.875));
              height: calc(var(--dark-mode-toggle-icon-size) * 0.75);
              width: calc(var(--dark-mode-toggle-icon-size) * 0.75);
              color: #333;
              background-size: var(--dark-mode-toggle-icon-size);
              background-image: var(--dark-mode-toggle-dark-icon);
              opacity: 0.5;
              transform-box: fill-box;
              transform-origin: 50% 50%;
              transform: matrix(-1, 0, 0, 1, -1, 0);
            }
            
            &[mode='dark'] {
              &::part(toggleLabel)::before {
                left: calc(100% - calc(var(--dark-mode-toggle-icon-size) * 1.5));
                color: #000;
                border-color: #000;
                background-color: #ccc;
                background-image: var(--dark-mode-toggle-dark-icon);
                filter: invert(0);
              }
              
              &::part(toggleLabel)::after {
                left: calc(var(--dark-mode-toggle-icon-size) * 0.125);
                background-image: var(--dark-mode-toggle-light-icon);
              }
            }
          }
        `;
    }
}