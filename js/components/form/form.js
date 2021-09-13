

(function () {
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      :host {
        font-family: Helvetica;
      }

      .errors {
        color: red;
      }

      .form-control {
        margin-bottom: 16px;
      }

      .form-control label {
        display: block;
        padding-bottom: 6px;
      }

      .form-control input {
        padding: 6px 12px;
        border-radius: 3px;
        border: 1px solid #d6d6d6;
      }

      .btn {
        padding: 6px 12px;
        background-color: blue;
        color: white;
        cursor: pointer;
        border-radius: 3px;
        margin-top: 16px;
      }

      .btn:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    </style>

    <form id="signup" method="post">
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

      <button type="submit" id="submit" class="btn primary" disabled>
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

      this.form = this.shadowRoot.querySelector('#signup')
      this.submitBtn = this.shadowRoot.querySelector('#submit')
      this.errorsEl = this.shadowRoot.querySelector('.errors')
    }

    connectedCallback() {
      this.form.addEventListener('change', this.onFormChange.bind(this))
    }

    disconnectedCallback() {
      this.form.removeEventListener('change', this.onFormChange.bind(this))
    }

    onFormChange(event) {
      this.validate()
    }

    validate() {
      const errors = []

      if (!this.form.name.value) {
        errors.push('Missing Name')
      }

      if (!this.form.querySelector('#email:valid')) {
        errors.push('Invalid Email')
      }

      if (this.form.password.value.length < 6) {
        errors.push('Password too short')
      }

      if (this.form.password.value !== this.form.confirm.value) {
        errors.push('Mismatch Password')
      }

      this.renderErrors(errors)
    }

    renderErrors(errors) {
      if (!errors.length) {
        this.submitBtn.removeAttribute('disabled')
        this.errorsEl.getElementsByClassName.display = 'none'
        return
      }

      let html = ''
      this.errorsEl.getElementsByClassName.display = 'block'
      errors.forEach(msg => {
        html += `<li>${msg}</li>`
      })
      this.errorsEl.innerHTML = html
      this.submitBtn.setAttribute('disabled', '')
    }
  })
})()