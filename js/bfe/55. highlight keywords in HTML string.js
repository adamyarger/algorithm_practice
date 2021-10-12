



function highlightKeywords(html, keywords) {
  // sort by longest first, it will add the wrapping tags, which will make shorted overlapping ones not match
  keywords.sort((a, b) => b.length - a.length)

  console.log(keywords)

  // match keyword with regex
  const matches = new RegExp(keywords.join('|'), 'g')

  // replaceall found key word with rapped keyword
  const str = html.replaceAll(matches, (item) => `<em>${item}</em>`)

  console.log(str)

  // merges into one wrapping tag
  return str.replaceAll('</em><em>', '')
};


console.log(
  highlightKeywords(
    'Hello FrontEnd Lovers',
    ['Front', 'FrontEnd', 'JavaScript']
  )
)

console.log(
  highlightKeywords(
    'Hello FrontEnd Lovers',
    ['Front', 'End', 'JavaScript']
  )
)