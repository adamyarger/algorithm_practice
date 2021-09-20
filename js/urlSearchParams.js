{
  var params = new URLSearchParams([['name', 'adam']])

  console.log(params.toString())


  params = new URLSearchParams('?a=1&a=2&b=2')

  console.log(params.toString())

  const BASE = 'http://example.com'

  var url = new URL('listings', BASE)
  // URL {
  //   href: 'http://exmaple.com/listings',
  //   origin: 'http://exmaple.com',
  //   protocol: 'http:',
  //   username: '',
  //   password: '',
  //   host: 'exmaple.com',
  //   hostname: 'exmaple.com',
  //   port: '',
  //   pathname: '/listings',
  //   search: '',
  //   searchParams: URLSearchParams {},
  //   hash: ''
  // }

  // add search params
  url.searchParams.set('q', 'dolphins')

  // csv (array)
  url.searchParams.set('types', ['jpg', 'png', 'gif'])
  console.log(url.searchParams.get('types')) // jpg,png,gif

  // array from multiple repeating keys 
  url.searchParams.append('multi', 'red')
  url.searchParams.append('multi', 'green')
  url.searchParams.append('multi', 'blue')
  console.log(url.searchParams.getAll('multi')) // [ 'red', 'green', 'blue' ]

  // objects

  console.log(url)
}