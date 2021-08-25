

function once(fn) {

}

function func(num) {
  return num
}

const onced = once(func)

onced(1)
// 1, func called with 1

onced(2)
// 1, even 2 is passed, previous result is returned