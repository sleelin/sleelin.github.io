import {LitElement, css, html} from "lit";
import {customElement, query, queryAsync} from "lit/decorators.js";
import {unsafeSVG} from "lit/directives/unsafe-svg.js";
import {until} from "lit/directives/until.js";
import FaceImage from "../assets/face.png?url";
import FaceSVG from "../assets/face.svg?url";

/**
 * ContentFace element
 */
@customElement("content-face")
export class ContentFace extends LitElement {
    @query("#face")
    accessor #face;
    
    @queryAsync("#pupil-left")
    accessor #pupilLeft;
    
    @queryAsync("#pupil-right")
    accessor #pupilRight;
    
    constructor() {
        super();
        
        // Use PNG face image on print, then return to SVG if necessary
        window.addEventListener("beforeprint", () => document.getElementById("logo").src = FaceImage);
        window.addEventListener("afterprint", async () => await this.#handleLogoSource());
        
        // Animate and update face image source on scroll
        window.addEventListener("scroll", async () => this.#handleLogoSource());
        window.addEventListener("mousemove", async (e) => {
            const pupilLeft = await this.#pupilLeft;
            const pupilRight = await this.#pupilRight;
            
            if (!!pupilLeft && !!pupilRight) {
                const bcLeft = pupilLeft.getBoundingClientRect();
                const bcRight = pupilRight.getBoundingClientRect();
                const midpointX = bcLeft.x + ((bcRight.x - bcLeft.x) / 2);
                const midpointY = bcLeft.y + ((bcRight.y - bcLeft.y) / 2);
                const percentX = Math.min(Math.max(Math.ceil(midpointX - e.clientX), -100), 100) / 100;
                const percentY = Math.min(Math.max(Math.ceil(midpointY - e.clientY), -100), 100) / 100;
                
                window.requestAnimationFrame(() => {
                    pupilLeft.style.transform = `translate(${-10 * percentX}px, ${-4 * (percentY)}px)`;
                    pupilRight.style.transform = `translate(${-10 * percentX}px, ${-4 * (percentY)}px)`;
                });
            }
        });
    }
    
    async #handleLogoSource() {
        await this.#pupilLeft;
        
        const logo = document.getElementById("logo");
        const {height} = document.getElementById("header").getBoundingClientRect();
        const {bottom} = this.#face.getBoundingClientRect();
        
        if ((bottom - height) < 0) {
            logo.src = FaceSVG;
            logo.classList.add("show");
        } else {
            logo.src = FaceImage;
            logo.removeAttribute("class");
        }
    }
    
    render() {
        return html`
            <div id="face">
                ${until(import("../assets/face.svg?raw").then(({default: SVG}) => unsafeSVG(SVG)), html`<img alt="face" src=${FaceImage} />`)}
            </div>
        `;
    }
    
    static get styles() {
        return css`
          :host {
            display: block;
            width: 288px;
            min-height: 338px;
          }
          
          img {
            opacity: 0.05;
            width: 100%;
            animation: 1s ease-in-out fadeInToFaint;
          }
          
          svg {
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
            border-radius: 32px;
            transform: translateZ(0);
            filter: drop-shadow(0 0 3rem rgb(197, 201, 204));
            animation: 0.3s ease-in-out fadeInFromFaint;
          }
          
          @keyframes fadeInToFaint {
            0% {
              opacity: 0;
            }
            
            100% {
              opacity: 0.05;
            }
          }
          
          @keyframes fadeInFromFaint {
            0% {
              opacity: 0.05;
            }
            
            100% {
              opacity: 1;
            }
          }
        `;
    }
}