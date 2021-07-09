
class Pro {
  contructor() {
    this.name = 'Adam'
  }

  print() {
    return this.name
  }
}

window.addEventListener('load', () => {
  const pro = new Pro()
  console.log(pro.print())
})