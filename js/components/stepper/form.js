

(function () {
  const template = document.createElement('template')
  template.innerHTML = `
    <div>
      <button id="back">back</button>

      <v-stepper>
        <v-stepper-item active>
          <div class="form-control">
            <label for="name">Name</label>
            <input type="text" id="name">
          </div>
        </v-stepper-item>

        <v-stepper-item>
          <div class="form-control">
            <label for="email">Email</label>
            <input type="text" id="email">
          </div>
        </v-stepper-item>

        <v-stepper-item>
          <div class="form-control">
            <label for="dob">Date of Birth</label>
            <input type="text" id="dob">
          </div>
        </v-stepper-item>

        <v-stepper-item>
          <div class="form-control">
            <label for="password">Password</label>
            <input type="password" id="password">
          </div>
        </v-stepper-item>
      </v-stepper>

      <div class="bottom">
        <button id="next">
          Next
        </button>

        <button id="submit" style="display: none;">
          Submit
        </button>
      </div>
    </div>
  `

  customElements.define('signup-form', class SignupForm extends HTMLElement {
    constructor() {
      super()

      this.attachShadow({ mode: 'open' })

      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.nextBtn = this.shadowRoot.querySelector('#next')
      this.backBtn = this.shadowRoot.querySelector('#back')
      this.submitBtn = this.shadowRoot.querySelector('#submit')
      this.stepper = this.shadowRoot.querySelector('v-stepper')

      this.name = this.shadowRoot.querySelector('#name')
      this.email = this.shadowRoot.querySelector('#email')
      this.dob = this.shadowRoot.querySelector('#dob')
      this.password = this.shadowRoot.querySelector('#password')

      this.form = new Map([
        [this.name, null],
        [this.email, null],
        [this.dob, null],
        [this.password, null]
      ])

      console.log(this.stepper)
    }

    connectedCallback() {
      console.log(this.nextBtn, this.backBtn)
      this.nextBtn.addEventListener('click', this.onNext.bind(this))
      this.backBtn.addEventListener('click', this.onBack.bind(this))
      this.updateButtonVisibility()

      this.name.addEventListener('input', this.onInput.bind(this))
    }

    onInput(event) {
      this.form.set(event.target, event.target.value)
    }

    disconnectedCallback() {
      this.nextBtn.removeEventListener('click', this.onNext.bind(this))
      this.backBtn.removeEventListener('click', this.onBack.bind(this))
    }

    onNext(event) {
      this.stepper.next()
      this.updateButtonVisibility()
    }

    onBack(event) {
      this.stepper.back()
      this.updateButtonVisibility()
    }

    updateButtonVisibility() {
      if (this.stepper.isLast) {
        this.nextBtn.style.display = 'none'
        this.submitBtn.style.display = 'inline-block'
      } else {
        this.nextBtn.style.display = 'inline-block'
        this.submitBtn.style.display = 'none'
      }

      if (this.stepper.isFirst) {
        this.backBtn.style.display = 'none'
      } else {
        this.backBtn.style.display = 'inline-block'
      }
    }
  })
})()