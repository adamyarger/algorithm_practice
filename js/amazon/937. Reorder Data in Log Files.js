/**
 * @param {string[]} logs
 * @return {string[]}
 
 split logs into array
 - first word is key
 - letter logs
 - number logs
 - dig let
 
 - letters first
 - sort letters 
 
 ["let1 art can",
  "let3 art zero",
  "let2 own kit dig",
  "dig1 8 1 5 1",
  "dig2 3 6"]
  
  filter filter sort merge
 */
var reorderLogFiles = function (logs) {
  const digitLogs = logs.filter(item => Number.isInteger(parseInt(item.split(' ')[1])))
  const letterLogs = logs.filter(item => !Number.isInteger(parseInt(item.split(' ')[1])))

  letterLogs.sort((a, b) => {
    let astr = a.split(' ')
    let aid = astr.shift()
    astr = astr.join(' ')

    let bstr = b.split(' ')
    let bid = bstr.shift()
    bstr = bstr.join(' ')

    if (astr === bstr && aid < bid) return -1
    if (astr < bstr) return -1
    return 1
  })

  return [...letterLogs, ...digitLogs]
};

