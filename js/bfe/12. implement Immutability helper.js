


/**
 * main idea is to taverse throguh the command and data and return a new value when a command is hit
 * this is a purish function.
 * 
 * what ever is return replaces that sopt in the data object.
 * 
 * mutations happen by setting a property to the return value
 */
function update(data, command) {
  // your code here
  // do we iterate both objects at the same time?

  //push array
  if ('$push' in command) {
    const val = command['$push']
    return [...data, ...(Array.isArray(val) ? val : [val])]
  }

  // return set
  if ('$set' in command) {
    return command['$set']
  }

  // apply function
  if ('$apply' in command) {
    return command['$apply'](data)
  }

  // merge object
  if ('$merge' in command) {
    if (typeof data !== 'object' || data === null) {
      throw new Error('data is not an object')
    }

    return { ...data, ...command['$merge'] }
  }

  // recur array or object
  const obj = Array.isArray(data) ? [...data] : { ...data }
  for (const key of Object.keys(command)) {
    // iterate both command and data
    obj[key] = update(obj[key], command[key])
  }

  // return new Obj
  return obj
}

console.log(update([1], { 1: { $set: 2 } }));