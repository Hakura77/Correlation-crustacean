// load node server 

// define server specific details
const port = 3000
const indexPage = 'index.html'

// load modules
const http = require("http")
const fs = require('fs')
const url = require('url')
const path = require('path')

// map file extensions
const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
}

const server = http.createServer(function (req, res) {
  
  // extract path name from req
  console.log(`url: ${url.parse(req.url)}`)
  let pathName = url.parse(req.url).pathname
  console.log(`Pathname: ${pathName}`)
  
  if(!pathName) { // if no path is specified, redirect to index.html
    res.writeHead(301, {location: `http://localhost:${port}/${indexPage}`})
    res.end()
  }
  
  // determine extension of the pathName
  console.log(path.parse(pathName))
  const ext = path.parse(pathName).ext
  
  // for debugging purposes - log to console which page was reqed
  console.log(`Request for ${pathName} received`)
  
  // load file content from file system
  var fileName = pathName.substr(1)
  
  fs.readFile(fileName, function (err, data) {
    if (err) {
      // cannot load file for whatever reason - log error to console
      console.log(err)
      
      // display 404 to web user
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
      // 404 text
      res.end(`File ${pathName} not found`)
      
    } else { // finding file did not error - file exists and is accessable
      res.writeHead(200, {
        'Content-Type': mimeType[ext]
      })
      
      // write the content of the found file to the response body
      res.write(data)
      
      // send response body to user 
      res.end()
    }
    
  })

}).listen(port)
