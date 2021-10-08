function $(el) {
  return {
    css(prop, value) {
      el.style[prop] = value;
      console.log(this, el)

      // this is whatever came before the dot... so its element
      return this;
    }
  }
}
$(document.createElement('p'))
  .css('color', '#fff')
  .css('backgroundColor', '#000')
  .css('fontWeight', 'bold')