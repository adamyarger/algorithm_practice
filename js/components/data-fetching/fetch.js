


(function main() {
  const URL = 'https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new'

  const mainTemp = document.createElement('template')
  mainTemp.innerHTML = `
    <style>
    
    </style>

    <bar-chart></bar-chart>
  `

  customElements.define('data-fetch', class DataFetch extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(mainTemp.content.cloneNode(true))
      this.data = {}
      this.chart = this.shadowRoot.querySelector('bar-chart')
    }

    connectedCallback() {
      this.getData().then(_ => {
        this.chart.setData(this.data)
      })
      console.log(this.chart)
    }

    async getData() {
      const req = await fetch(URL)
      const text = await req.text()
      this.data = this.formatData(text)
      console.log(this.data)
      return text
    }

    formatData(data) {
      const arr = data.split('\n').map(num => parseInt(num))
      const groups = arr.reduce((acc, val) => {
        if (!Number.isInteger(parseInt(val))) return acc
        if (!(val in acc)) {
          acc[val] = 0
        }
        acc[val] += 1
        return acc
      }, {})
      return groups
    }
  })


  const BAR_WIDTH = 25
  const barTemp = document.createElement('template')
  barTemp.innerHTML = `
    <style>
      .chart {
        display: grid;
        grid-template-columns: 30px auto;
      }

      .bars {
        height: 400px;
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        column-gap: 10px;
        align-items: end;
        padding-left: 20px;
        border-left: 1px solid #333;
        border-bottom: 1px solid #333;
      }

      .bar {
        width: ${BAR_WIDTH}px;
        height: 300px;
        background-color: #333;
      }

      .x-labels {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        column-gap: 10px;
        padding-left: 20px;
      }

      .x-labels .label {
        width: ${BAR_WIDTH}px;
        text-align: center;
        padding: 10px 0;
      }

      .y-labels {
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        margin-bottom: 36px;
      }
    </style>

    <div class="chart"></div>
  `

  customElements.define('bar-chart', class BarChart extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(barTemp.content.cloneNode(true))

      this.chart = this.shadowRoot.querySelector('.chart')
      this.data = {}
    }

    connectedCallback() {

    }

    setData(data) {
      this.data = data
      this.max = this.getMax(data)
      this.render()
    }

    getMax() {
      return Math.max(...Object.values(this.data))
    }

    template() {
      return `
        <div class="y-labels">${this.yLabel()}</div>
        <div style="height: 100%;">
          <div class="bars">
            ${this.bars()}
          </div>

          <div class="x-labels">${this.xLabel()}</div>
        </div>
      `
    }

    bars() {
      let html = ''

      for (const [key, val] of Object.entries(this.data)) {
        const percent = (val / this.max) * 100
        html += `<div class="bar" data-id="${key}" style="height: ${percent}%;"></div>`
      }

      return html
    }

    xLabel() {
      const labels = Object.keys(this.data)
      return `
        ${labels.map(item => `<div class="label">${item}</div>`).join('\n')}
      `
    }

    calcYLabels() {
      const ceil = Math.ceil(this.max / 10) * 10
      const out = []

      for (let i = 0; i <= ceil; i += 10) {
        out.push(i)
      }

      return out
    }

    yLabel() {
      // go 10 above for top
      // incrments of 10, if it round up
      const labels = this.calcYLabels()
      return `
        ${labels.map(label => `<div class="label">${label}</div>`).join('\n')}
      `
    }

    render() {
      this.chart.innerHTML = this.template()
    }
  })

})()