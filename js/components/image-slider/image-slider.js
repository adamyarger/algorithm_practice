(function main() {

  {
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host {
          display: block;
        }

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

        .carousel__dots {
            position: absolute;
            bottom: 16px;
            display: flex;
            justify-content: center;
            width: 100%;
            gap: 0 8px;
        }

        .carousel__dot {
          border: 2px solid #fff;
          border-radius: 50%;
          cursor: pointer;
          height: 16px;
          width: 16px;
        }

        .carousel__dot--active {
          background: #fff;
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
          <button class="btn btn--left" id="btn-back">
            &#9664;
          </button>
        </div>

        <div class="carousel__dots">
          <div class="carousel__dot carousel__dot--active" data-item-id="0"></div>
          <div class="carousel__dot" data-item-id="1"></div>
        </div>

        <div class="carousel__right">
          <button class="btn btn--right" id="btn-next">
            &#9654;
          </button>
        </div>
      </div>
    `

    function dot({ id, active }) {
      return `
        <div
          class="carousel__dot ${active && (`carousel__dot--active`)}"
          data-item-id="${id}"
        ></div>
      `
    }

    customElements.define('image-slider', class ImageSlider extends HTMLElement {
      #activeInterval

      static get observedAttributes() {
        return ['autoplay', 'interval']
      }

      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.nextBtn = this.shadowRoot.querySelector('#btn-next')
        this.backBtn = this.shadowRoot.querySelector('#btn-back')

        this.dots = this.shadowRoot.querySelector('.carousel__dots')
      }

      connectedCallback() {
        this.initActive()
        this.startInterval()
        this.renderDots()
        this.nextBtn.addEventListener('click', this.onNext.bind(this))
        this.backBtn.addEventListener('click', this.onBack.bind(this))
        this.dots.addEventListener('click', this.onDotClick.bind(this))
      }

      disconnectedCallback() {
        this.nextBtn.removeEventListener('click', this.onNext.bind(this))
        this.backBtn.removeEventListener('click', this.onBack.bind(this))
        this.stopInterval()
      }

      initActive() {
        const activeItem = this.getActiveItem()
        if (activeItem) {
          activeItem.active = true
        } else {
          this.getFirstItem().active = true
        }
      }

      renderDots() {
        const items = this.allItems()
        this.dots.innerHTML = `
          ${items.map((_, index) => {
          return (
            dot({ id: index, active: index === 0 || '' })
          )
        }).join('\n')}
        `
      }

      onDotClick(event) {
        const data = event.target.dataset
        const next = this.allItems()[data.itemId]
        this.setActiveItem(next, event.target)
      }

      startInterval() {
        this.stopInterval()
        if (this.autoplay) {
          this.#activeInterval = setInterval(this.onNext.bind(this), this.interval);
        }
      }

      stopInterval() {
        clearInterval(this.#activeInterval)
      }

      setActiveItem(next, dot) {
        // FIX THIS. should be shared on all navigation
        const dots = this.shadowRoot.querySelectorAll('.carousel__dot')
        dots.forEach(dot => {
          dot.classList.remove('carousel__dot--active')
        })
        dot.classList.add('carousel__dot--active')

        this.resetAllItems()
        next.active = true
        this.startInterval()
      }

      onNext() {
        const next = this.getNextItem()
        this.resetAllItems()
        next.active = true
        this.startInterval()
      }

      onBack() {
        const prev = this.getPrevItem()
        this.resetAllItems()
        prev.active = true
        this.startInterval()
      }

      allItems() {
        return Array.from(this.querySelectorAll('image-slider-item'))
      }

      resetAllItems() {
        this.allItems().forEach(item => {
          item.active = false
        })
      }

      getActiveItem() {
        return this.querySelector('image-slider-item[active]')
      }

      getNextItem() {
        const last = this.getLastItem()
        const active = this.getActiveItem()

        if (last === active) {
          return this.getFirstItem()
        } else {
          return active.nextElementSibling
        }
      }

      getPrevItem() {
        const first = this.getFirstItem()
        const active = this.getActiveItem()

        if (first === active) {
          return this.getLastItem()
        } else {
          return active.previousElementSibling
        }
      }

      getFirstItem() {
        return this.allItems()[0]
      }

      getLastItem() {
        const items = this.allItems()
        return items[items.length - 1]
      }

      get interval() {
        return this.getAttribute('interval') || 3000
      }

      set interval(val) {
        this.setAttribute('interval', val)
      }

      get autoplay() {
        return this.hasAttribute('autoplay')
      }

      set autoplay(val) {
        const isAutoplay = Boolean(val)
        if (isAutoplay) {
          this.setAttribute('autoplay', '')
        } else {
          this.removeAttribute('autoplay')
        }
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

        :host([active]) {
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
        this.#upgradeProp('active')
      }

      #upgradeProp(prop) {
        if (this.hasOwnProperty(prop)) {
          const val = this[prop]
          delete this[prop]
          this[prop] = val
        }
      }

      attributeChangedCallback(name, old, val) {
        console.log(name, old, val)
      }

      get active() {
        return this.hasAttribute('active')
      }

      set active(val) {
        const isActive = Boolean(val)
        if (isActive) {
          this.setAttribute('active', '')
        } else {
          this.removeAttribute('active')
        }
      }
    })
  }
})()