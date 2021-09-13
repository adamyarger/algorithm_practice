

(function () {
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      .errors {
        color: red;
      }
    </style>

    <form class="form" method="post">
      <div class="form-control">
        <label for="name">Name</label>
        <input id="name" class="input" type="text" name="name" required>
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input id="email" class="input" type="email" name="email" required>
      </div>

      <div class="form-control">
        <label for="password">Password</label>
        <input id="password" class="input" type="password" name="password" required>
      </div>

      <div class="form-control">
        <label for="confirm">Confirm Password</label>
        <input id="confirm" class="input" type="password" name="confirm" required>
      </div>

      <button type="submit" id="submit">
        Submit
      </button>
    </form>

    <ul class="errors">
    </ul>
  `

  customElements.define('x-form', class XForm extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.form = this.shadowRoot.querySelector('form')
      this.submitBtn = this.shadowRoot.querySelector('#submit')
      this.errorsEl = this.shadowRoot.querySelector('.errors')
      this.inputs = Array.from(this.shadowRoot.querySelectorAll('.input'))

      this._form = {
        name: {
          el: this.shadowRoot.querySelector('[name="name"]'),
          valid() {
            return this.el.value.length > 0
          },
          message: 'Name missing'
        },
        email: {
          el: this.shadowRoot.querySelector('[name="email"]'),
          valid: () => {
            return !!this.shadowRoot.querySelector('[name="email"]:valid')
          },
          message: 'Invalid Email'
        },
        password: {
          el: this.shadowRoot.querySelector('[name="password"]'),
          valid() {
            return this.el.value.length >= 6
          },
          message: 'Password too short'
        },
        confirm: {
          el: this.shadowRoot.querySelector('[name="confirm"]'),
          valid: () => {
            return this._form.confirm.el.value === this._form.password.el.value
              && this._form.password.valid()
          },
          message: 'Invalid match'
        }
      }
    }

    // validate on blur
    connectedCallback() {


      this.submitBtn.addEventListener('click', this.onSubmit.bind(this))

      this.form.addEventListener('change', this.onFormChange.bind(this))
    }

    onFormChange(event) {
      console.log(event)
    }

    onSubmit(event) {
      event.preventDefault()
      const valid = this.validate()

      console.log(new FormData(this.form))

      if (valid) {
        console.log(this.form)
        new Event('submit', new FormData(this.form))
      }
    }

    validate() {
      const errors = []

      for (const key in this._form) {
        if (!this._form[key].valid()) {
          errors.push(this._form[key])
        }
      }

      if (errors.length) {
        this.showErrors(errors)
      } else {
        this.errorsEl.style.display = 'none'
      }

      return errors.length === 0
    }

    showErrors(errors) {
      let html = ''
      this.errorsEl.getElementsByClassName.display = 'block'
      errors.forEach(obj => {
        html += `
          <li>
            ${obj.message}
          </li>
        `
      })
      this.errorsEl.innerHTML = html
    }

    getValidInputs() {
      return Array.from(this.shadowRoot.querySelectorAll('.input:valid'))
    }
  })
})()