class ResizeContainer extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: "open"})
        this.render()
        this.resizeContainer = this.shadowRoot.getElementById("content")
        this.resizer = this.shadowRoot.getElementById("resize-play")
    }

    connectedCallback() {
        this.resizer.addEventListener("click", event => {
            this.shrinkAndGrow();
        })
    }


    shrinkAndGrow() {
        if (this.resizeContainer.classList.contains("shrink-and-grow")) {
            this.resizeContainer.classList.remove("shrink-and-grow")
            this.resizer.innerText = "Resize"
        } else {
            this.resizeContainer.classList.add("shrink-and-grow")
            this.resizer.innerText = "Stop"
        }
    }

    reset() {
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .resize-container {
                    padding: 1.5rem;
                    border: 2px solid #444546;
                    container-type: inline-size;
                }
                
                .shrink-and-grow {
                    animation-name: shrinkAndGrow;
                    animation-iteration-count: infinite;
                    animation-duration: 10s;
                    animation-timing-function: ease-in-out;
                }
                
                @media (min-width: 40em) {
                    @keyframes shrinkAndGrow {
                        0% {
                            width: 96%;
                        }
                        
                        50% {
                            width: 33%;
                        }
                        
                        100% {
                            width: 96%;
                        }
                    }
                }
                
                @media(max-width: 40em) {
                    @keyframes shrinkAndGrow {
                        0% {
                            width: 85%;
                        }
                        
                        50% {
                            width: 60%;
                        }
                        
                        100% {
                            width: 85%;
                        }
                    }
                }
                
                
                [slot] {
                    color: #444546;
                }
                
                .playback {
                    display: flex;
                    gap: 1.5em;
                    justify-content: space-between;
                    align-content: center;
                    padding: 1.5rem 0;
                }
                
                button {
                    font-size: 1.1rem;
                    padding: 0.8rem;
                    background-color: #444546;
                    color: #fff;
                    border: 0;
                    text-transform: uppercase;
                    text-align: center;
                    height: fit-content;
                    align-self: center;
                }
                
                button:hover {
                    cursor: pointer;
                }
                
                details {
                    padding: 1.5rem;
                    margin-top: 1.5rem;
                    border: 2px solid #444546;
                    font-size: 1.2rem;
                }
                
                details:hover{
                    cursor: pointer;
                }
            </style>
            <div>
                <div class="playback">
                    <div>
                        <slot name="title"></slot>  
                        <slot name="description"></slot>
                    </div>
                      
                    <button id="resize-play">Resize</button>                      
                </div>
                <div id="content" class="resize-container">
                    <slot name="template"></slot>
                </div>            
                <details>
                    <summary>CSS code</summary>
                    <slot name="css-code"></slot>
                </details>
            </div>

        `
    }
}

customElements.define("resize-container", ResizeContainer)