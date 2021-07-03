/**
 * add no scroll on body
 * add modal-open class to body
 * add backdrop class to body
 */

function modal() {
  let isOpen = false
  let modalClass = ''

  //listen to esc key
  //handle backdrop click event to close



  function addBodyClass(params) {
    const body = document.querySelector('body')
    body.classList.add('modal-open')
  }

  function addBackdrop() {
    const el = `<div class="modal-backdrop"></div>`
    const frag = document.createRange().createContextualFragment(el)
    document.querySelector('body').appendChild(frag)
  }

  function showModal() {
    document.querySelector('.modal').classList.add('show')
  }

  function removeBackdrop(params) {
    document.querySelector('.modal-backdrop').remove()
  }

  function removeBodyClass(params) {

  }

  function hideModal() {
    document.querySelector('.modal').classList.remove('show')
  }

  function setOpenListeners() {
    const els = document.querySelectorAll(`[data-modal-target=".${modalClass}"]`)
    const arr = Array.prototype.slice.call(els)

    // off listener needed
    arr.forEach(el => {
      el.addEventListener('mouseup', () => {
        toggle()
      })
    })
  }

  function setBackdropListener() {
    document.querySelector('.modal-backdrop').addEventListener('mouseup', toggle)
  }

  function removeBackdropListener() {
    document.querySelector('.modal-backdrop').removeEventListener('mouseup', toggle)
  }

  function init(_modalClass) {
    modalClass = _modalClass

    setOpenListeners()
  }

  function open() {
    addBackdrop()
    addBodyClass()
    showModal()
    // cant set till after its been mounted
    setBackdropListener() // need to create and destory listeners
  }

  function close() {
    removeBackdropListener() // needs to be first

    removeBackdrop()
    removeBodyClass()
    hideModal()


  }

  function toggle() {
    isOpen = !isOpen

    if (isOpen) {
      open()
    } else {
      close()
    }
  }

  return {
    toggle: toggle,
    init: init
  }
}

const md = modal()

md.init('main-modal')

// event listener should be handled my the module modal
// document.querySelector('.modal-toggle').addEventListener('mouseup', function () {
//   md.toggle()
// })