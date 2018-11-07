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
  switch (pathname) {
    case '/': response.end('hello')
      break
    case '/signUp': handleSignUp(request, response)
      break
    case '/loginIn': handleLoginIn(request, response)
      break
    case '/getShowingMovie': getShowingMovie(request, response)
      break
    case '/getWaitingMovie': getWaitingMovie(request, response)
      break
    case '/saveImage': handleUserHeadImage(request, response)
      break
    case '/checkUserInfo': checkUserInfo(request, response)
      break
    case '/saveWantWatchMovies': saveWantWatchMovies(request, response)
      break
    case '/submitOrder': submitOrder(request, response)
      break
  }
}).listen(1234)

console.log('server is started at port 1234')
// 确认用户名，密码是否已注册过；
function handleLoginIn (request, response) {
  var body = ''
  request.on('data', function (chunk) {
    body += chunk
  })
  request.on('end', function () {
    body = querystring.parse(body)
    fs.readFile('./user/userInfo.json', function (err, data) {
      if (err) {
        console.error(err)
      }
      let content = JSON.parse(data)
      for (var i = 0; i < content.users.length; i++) {
        if ((content.users[i].user === body.user) && (content.users[i].password === body.password)) {
          response.end('true')
          // 为该用户创建用户存储该用户信息的json文件；
          let initContent = { user: `${body.user}` }
          initContent = JSON.stringify(initContent, null, '\t')
          fs.writeFile(`./user/${body.user}.json`, initContent, { 'flag': 'wx' }, function (err) {
            if (err) {
              console.log('文件已存在')
            }
          })
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
    fs.readFile('./user/userInfo.json', function (err, data) {
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
      fs.writeFile('./user/userInfo.json', content, { 'flag': 'w' }, function (err) {
        if (err) {
          console.error(err)
        }
        response.end('true')
      })
    })
  })
}
// 处理前端热映影片的数据请求
function getShowingMovie (request, response) {
  fs.readFile('./src/json/hotShowing.json', function (err, data) {
    if (err) {
      console.error(err)
    }
    response.end(data)
  })
}
// 处理前端即将上映影片的数据请求
function getWaitingMovie (request, response) {
  fs.readFile('./src/json/waitShowing.json', function (err, data) {
    if (err) {
      console.error(err)
    }
    response.end(data)
  })
}
// 存储用户上传的头像照片
function handleUserHeadImage (request, response) {
  var body = ''
  request.on('data', function (chunk) {
    body += chunk
  })
  request.on('end', function () {
    body = JSON.parse(body)
    var user = body.user
    fs.readFile(`./user/${user}.json`, function (err, data) {
      if (err) {
        console.error(err)
      }
      data = JSON.parse(data)
      data.headImg = body.headImg
      data = JSON.stringify(data, null, '\t')
      fs.writeFile(`./user/${user}.json`, data, { 'flag': 'w' }, function (err) {
        if (err) {
          console.error(err)
        }
      })
    })
    response.end('upload success')
  })
}
// 存储用户喜欢的电影；
function saveWantWatchMovies (request, response) {
  var body = ''
  request.on('data', function (chunk) {
    body += chunk
  })
  request.on('end', function () {
    body = JSON.parse(body)
    var user = body.user
    fs.readFile(`./user/${user}.json`, function (err, data) {
      if (err) {
        console.error(err)
      }
      data = JSON.parse(data)
      data.wantWatchMovies = body.wantWatchMovies
      data = JSON.stringify(data, null, '\t')
      fs.writeFile(`./user/${user}.json`, data, { 'flag': 'w' }, function (err) {
        if (err) {
          console.error(err)
        }
      })
    })
    response.end('save success')
  })
}
// 初始化下载用户信息；
function checkUserInfo (request, response) {
  var body = ''
  request.on('data', function (chunk) {
    body += chunk
  })
  request.on('end', function () {
    body = JSON.parse(body)
    var user = body.user
    if (user !== '') {
      fs.readFile(`./user/${user}.json`, function (err, data) {
        if (err) {
          console.error(err)
        }
        response.end(data)
      })
    } else {
      response.end()
    }
  })
}
// 存储用户提交的订单
function submitOrder (request, response) {
  var body = ''
  request.on('data', function (chunk) {
    body += chunk
  })
  request.on('end', function (chunk) {
    body = JSON.parse(body)
    let user = body.user
    fs.readFile(`./user/${user}.json`, function (err, data) {
      if (err) {
        console.error(err)
      }
      data = JSON.parse(data)
      if (data.order === undefined) {
        data.order = []
      }
      data.order.push(body)
      data = JSON.stringify(data, null, '\t')
      fs.writeFile(`./user/${user}.json`, data, { 'flag': 'w' }, function (err) {
        if (err) {
          console.error(err)
        }
      })
    })
    response.end('save success')
  })
}
