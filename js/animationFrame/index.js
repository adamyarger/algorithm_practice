'use strict'

class AddBoxes {
  constructor() {
    // we want to access this with the events below... need to bind

    this.onStart = this.onStart.bind(this)
    this.onStop = this.onStop.bind(this)
    // why on this one???
    this.draw = this.draw.bind(this)

    this.active = false
    this.animateId = null
    this.addListeners()
  }

  addListeners() {
    document.querySelector('.start').addEventListener('mouseup', this.onStart)
    document.querySelector('.stop').addEventListener('mouseup', this.onStop)
  }

  draw() {
    if (!this.active) return
    requestAnimationFrame(this.draw)
    const frag = document.createRange().createContextualFragment(`<div class="square"></div>`)
    document.querySelector('.square-box').appendChild(frag)
  }

  onStart(event) {
    if (this.active) return

    // only fired once here... need to recursivly call it inside as well
    this.animateId = requestAnimationFrame(this.draw)
    this.active = true
  }

  onStop(event) {
    if (!this.active) return
    this.active = false
    cancelAnimationFrame(this.animateId)
  }
}

window.addEventListener('load', () => new AddBoxes())