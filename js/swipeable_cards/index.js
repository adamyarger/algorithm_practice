'use strict'

class Cards {
  constructor() {
    this.cards = Array.from(document.querySelectorAll('.card'))

    // normally these will be used in vents which tie this to the element from the prototype
    // we want to bind them to the class instead
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.update = this.update.bind(this)
    this.targetBCR = null
    this.target = null
    this.draggingCard = false
    this.screenX = 0

    // track when the card goes over a threshold then trigger remove
    this.startX = 0
    this.currentX = 0

    this.addEventListeners()

    // what does this do?
    // requestAnimationFrame()
  }

  addEventListeners() {
    // put all our event listeners in one place to be registered
    document.addEventListener('touchstart', this.onStart) // acts as a throttle
    document.addEventListener('touchmove', this.onMove)
    document.addEventListener('touchend', this.onEnd)
  }

  // https://www.youtube.com/watch?v=rBSY7BOYRo4&ab_channel=GoogleChromeDevelopers
  // 22 mins

  onStart(event) {
    // need to ignore elements that are not cards
    if (!event.target.classList.contains('card')) return

    this.target = event.target
    //getBoundingClientRect is expensive so its good to do once and not every frame
    this.targetBCR = this.target.getBoundingClientRect()
    // grab where the pointer is starting the drag horizontally
    this.startX = event.pageX || event.touches[0].pageX
    this.currentX = this.startX

    // this stops tons of repaints... but how?
    this.target.style.willChange = 'transform'
    this.draggingCard = true

    // why prevent default?
    // event.preventDefault()
  }

  onMove(event) {
    if (!this.target) return
    // update current on move so we can measure against start
    this.currentX = event.pageX || event.touches[0].pageX
    this.update()
  }

  onEnd(event) {
    if (!this.target) return
    this.draggingCard = false
  }

  update() {
    // console.log('fire')
    requestAnimationFrame(this.update)

    if (!this.target) return

    // calculate if it hits the delete threshold
    if (this.draggingCard) {
      this.screenX = this.currentX - this.startX
    } else {
      // we want to snap back to the middle
      this.screenX += (0 - this.screenX) / 10
    }

    this.target.style.transform = `translateX(${this.screenX}px)`

    // infinite lookup... why?

  }

  animateOtherCardsIntoPosition(startIndex) {

  }

  resetTarget() {

  }
}

window.addEventListener('load', () => new Cards())