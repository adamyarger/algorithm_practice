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
    this.targetX = 0

    // track when the card goes over a threshold then trigger remove
    this.startX = 0
    this.currentX = 0

    this.addEventListeners()

    // what does this do?
    // requestAnimationFrame()
  }

  addEventListeners() {
    // put all our event listeners in one place to be registered
    document.addEventListener('touchstart', this.onStart)
    document.addEventListener('touchmove', this.onMove)
    document.addEventListener('touchend', this.onEnd)

    document.addEventListener('mousedown', this.onStart)
    document.addEventListener('mousemove', this.onMove)
    document.addEventListener('mouseup', this.onEnd)
  }

  // https://www.youtube.com/watch?v=rBSY7BOYRo4&ab_channel=GoogleChromeDevelopers
  // 22 mins

  onStart(event) {
    // need to ignore elements that are not cards
    if (!event.target.classList.contains('card')) return

    this.target = event.target
    //getBoundingClientRect is expensive so its good to do once and not every frame
    // need to know how far weve moved
    this.targetBCR = this.target.getBoundingClientRect()
    // grab where the pointer is starting the drag horizontally
    this.startX = event.pageX || event.touches[0].pageX
    this.currentX = this.startX

    // this stops tons of repaints... but how?
    // boosts performance letting the browser know were about to change transform
    this.target.style.willChange = 'transform'
    this.draggingCard = true

    // why prevent default?
    // event.preventDefault()
  }

  onMove(event) {
    if (!this.target) return
    // update current on move so we can measure against start
    this.currentX = event.pageX || event.touches[0].pageX
    // this will get called a bunch of times
    this.update()
  }

  onEnd(event) {
    if (!this.target) return

    // this.currentX = event.pageX || event.changedTouches[0].pageX

    this.targetX = 0
    let screenX = this.currentX - this.startX

    if (Math.abs(screenX) > this.targetBCR.width * 0.35) {
      this.targetX = (screenX > 0) ? this.targetBCR.width : -this.targetBCR.width
    }

    this.draggingCard = false
  }

  update() {
    // this will cause an infinite loop
    // to unset it reset the target
    // this will trigger update for each frame with a rate of 60fps
    requestAnimationFrame(this.update)

    if (!this.target) return

    // calculate if it hits the delete threshold
    if (this.draggingCard) {
      this.screenX = this.currentX - this.startX
    } else {
      // use targetx chich can either be back to the middle or off screen to delete
      // this controls the speed... but how? probably has to do with requestAnimationFrame
      this.screenX += (this.targetX - this.screenX) / 4
    }

    const normalizeDragDistance = (Math.abs(this.screenX) / this.targetBCR.width)
    // using an exponent make the opacity change on a exponential curve instead of linear
    const opacity = 1 - (normalizeDragDistance ** 3)

    this.target.style.transform = `translateX(${this.screenX}px)`
    this.target.style.opacity = opacity

    const isNearlyInvisible = (opacity < 0.01)
    const isNearlyAtStart = (Math.abs(this.screenX) < 0.01) // for snapping back into the middle

    if (!this.draggingCard) {
      if (isNearlyInvisible) {
        let isAfterCurrentTarget = false

        if (this.target && this.target.parentNode) {
          const onTransitionEnd = event => {
            this.target = null
            event.target.style.transition = 'none'
            event.target.removeEventListener('transitionend', onTransitionEnd)
          }

          for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i]


            if (card === this.target) {
              // set the starting point
              isAfterCurrentTarget = true
              continue
            }

            if (!isAfterCurrentTarget) continue

            // 20 is for the collpasing margins
            card.style.transform = `translateY(${this.targetBCR.height + 20}px)`

            // why do this??
            requestAnimationFrame(_ => {
              card.style.transition = `transform 0.15s cubic-bezier(0,0,0.31, 1)`
              card.style.transform = 'none'
            })

            card.addEventListener('transitionend', onTransitionEnd)
          }

          // remove the node a delete its reference

          this.target.parentNode.removeChild(this.target)
        }
      }

      if (isNearlyAtStart) {
        this.target.style.willChange = 'initial'
        this.target.style.transform = 'none'
        this.target = null
      }
    }

  }

  animateOtherCardsIntoPosition(startIndex) {

  }

  resetTarget() {

  }
}

window.addEventListener('load', () => new Cards())