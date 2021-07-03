/**
 * add no scroll on body
 * add modal-open class to body
 * add backdrop class to body
 */

function modal() {
  let isOpen = false
  let modalClass = ''
  let _onClose;

  function addBodyClass() {
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

  function removeBackdrop() {
    document.querySelector('.modal-backdrop').remove()
  }

  function removeBodyClass() {
    document.querySelector('body').classList.remove('modal-open')
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

  function closeOnEsc(event) {
    if (event.key === 'Escape') {
      close()
    }
  }

  function onEsc() {
    document.addEventListener('keyup', closeOnEsc)
  }

  function offEsc() {
    document.removeEventListener('keyup', closeOnEsc)
  }

  function init(_modalClass) {
    modalClass = _modalClass
    setOpenListeners()
  }

  function open() {
    isOpen = true
    addBackdrop()
    addBodyClass()
    showModal()
    setBackdropListener() // need to create and destory listeners
    onEsc()
  }

  function close() {
    isOpen = false
    removeBackdropListener() // needs to be first
    offEsc()
    removeBackdrop()
    removeBodyClass()
    hideModal()

    if (typeof _onClose === 'function') {
      _onClose()
    }
  }

  function toggle() {
    if (!isOpen) {
      open()
    } else {
      close()
    }
  }

  function onClose(fn) {
    if (typeof fn === 'function') {
      _onClose = fn.bind(this)
    }
  }

  return {
    toggle,
    init,
    close,
    open,
    onClose
  }
}

const md = modal()

md.init('main-modal')

md.onClose(() => {
  const el = `<div>Offer Accepted</div>`
  const frag = document.createRange().createContextualFragment(el)
  document.querySelector('.container').appendChild(frag)
})