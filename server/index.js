const http = require('http')
const url = require('url')
const querystring = require('querystring')
const fs = require('fs')

http.createServer(function (request, response) {
  let pathname = url.parse(request.url).pathname
  response.writeHead(200, {
    // 实现跨域
    'Access-Control-Allow-Origin': '*'
    // 如果以json格式传输，设置允许预请求的头
    // 'Access-Control-Allow-Headers': 'content-type'
  })
  if (pathname === '/signUp') {
    handleSignUp(request, response)
  } else if (pathname === '/loginIn') {
    handleLoginIn(request, response)
  }
}).listen(1234)

console.log('server is started')
// 确认用户名，密码是否已注册过；
function handleLoginIn (request, response) {
  var body = ''
  request.on('data', function (chunk) {
    body += chunk
    console.log(chunk)
  })
  request.on('end', function () {
    console.log(body)
    body = querystring.parse(body)
    console.log(body)
    fs.readFile('userInfo.json', function (err, data) {
      if (err) {
        console.error(err)
      }
      let content = JSON.parse(data)
      for (var i = 0; i < content.users.length; i++) {
        if ((content.users[i].user === body.user) && (content.users[i].password === body.password)) {
          response.end('true')
          return
        }
      }
      response.end('false')
    })
  })
}

// 存储post提交的用户信息
function handleSignUp (request, response) {
  var body = ''
  request.on('data', function (chunk) {
    body += chunk
  })
  request.on('end', function () {
    body = querystring.parse(body)
    fs.readFile('userInfo.json', function (err, data) {
      if (err) {
        console.error(err)
      }
      var content = JSON.parse(data)
      for (var i = 0; i < content.users.length; i++) {
        if (content.users[i].user === body.user) {
          response.end('false')
          return false
        }
      }
      content.users.push(body)
      content = JSON.stringify(content, null, '\t')
      fs.writeFile('userInfo.json', content, { 'flag': 'w' }, function (err) {
        if (err) {
          console.error(err)
        }
        response.end('true')
      })
    })
  })
}
