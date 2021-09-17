(function main(params) {

  {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        .carousel {
          display: flex;
          flex-direction: row;
          position: relative;
        }

        .carousel__left,
        .carousel__right {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .carousel__left {
          left: 0;
        }

        .carousel__right {
          right: 0;
        }

        .btn {
          font-size: 24px;
          display: inline-block;
          cursor: pointer;
        }
      </style>

      <div class="carousel">
        <slot></slot>

        <div class="carousel__left">
          <button class="btn btn--left">
            <
          </button>
        </div>

        <div class="carousel__right">
          <button class="btn btn--right">
            >
          </button>
        </div>
      </div>
    `

    customElements.define('image-slider', class ImageSlider extends HTMLElement {
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.nextBtn = this.shadowRoot.querySelector('.btn--right')
        this.backBtn = this.shadowRoot.querySelector('.btn--left')
      }

      connectedCallback() {
        console.log(this.nextBtn)
        this.nextBtn.addEventListener('click', this.onNext.bind(this))
        this.backBtn.addEventListener('click', this.onBack.bind(this))
      }

      onNext(event) {
        console.log(event, 'dude')
      }

      onBack(event) {

      }

      allItems() {
        return Array.from(this.querySelectorAll('image-slider-item'))
      }
    })
  }

  {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        ::slotted(img) {
          width: 100%;
        }

        :host(.active) {
          display: block;
        }

        :host {
          display: none;
        }
      </style>

      <slot></slot>
    `

    customElements.define('image-slider-item', class ImageSliderItem extends HTMLElement {
      static get observedAttributes() {
        return ['active']
      }

      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
      }

      connectedCallback() {

      }

      attributeChangedCallback(name, old, val) {
        console.log(name)

        if (name === 'active') {
          this.classList.add('active')
        }
      }
    })
  }
})()