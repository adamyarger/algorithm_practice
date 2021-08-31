class NodeStore {

  constructor() {
    this.keys = []
    this.vals = []

    // could use tuple like array [[key, val]]
    // then store it in a dict with symbol key
  }

  set(node, value) {
    const index = this._findIndex(node)
    if (this.has(node)) {
      this.vals[index] = value
    } else {
      this.keys.push(node)
      this.vals.push(value)
    }
  }

  _findIndex(node) {
    return this.keys.findIndex(item => item === node)
  }

  get(node) {
    const index = this._findIndex(node)
    if (index === -1) return
    return this.vals[index]
  }

  has(node) {
    return this._findIndex(node) !== -1
  }
}