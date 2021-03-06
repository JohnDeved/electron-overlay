const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const dgram = require('dgram')
const server = dgram.createSocket('udp4')
const gkm = require('gkm');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let menu = null

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    transparent: true, 
    width: 800, 
    height: 600, 
    frame: false,
    enableLargerThanScreen: true,
    icon: 'arma3.ico'
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'render/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // set clicktrought
  win.setIgnoreMouseEvents(true)

  // set allways on top
  win.setAlwaysOnTop(true)

  // set fullscreen
  win.maximize(true)

  // request arma screensize
  setTimeout(function () {
    const message = Buffer(2048)
    message.write(JSON.stringify({command: 'window', value: 'request'}))
    server.send(message, 0, message.length, 8889, '127.0.0.1')
  }, 1000);

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

let winPos = {x:0, y:0, height:0, width:0}
server.bind(8888)
server.on('message', (msg, rinfo) => {
  msg = JSON.parse(msg.toString())
  if (msg.window) {
    msg.window.x = msg.window.x+8+10
    msg.window.y = msg.window.y+11+30
    msg.window.width = msg.window.width-16-20
    msg.window.height = msg.window.height-39-20
    win.setBounds(msg.window)
    if (menu) {      
      menu.setBounds(msg.window)
    }
    win.webContents.send('window', msg.window)
    winPos = msg.window
  }
  if (msg.units) {
    win.webContents.send('units', JSON.stringify(msg.units))
  }
  if (msg.command) {
    win.webContents.send('command', msg)
  }
  // console.log(msg)
})

ipcMain.on('hint', (event, msg) => {
  win.webContents.send('hint', msg)
})

ipcMain.on('toggle', (event, msg) => {
  if (msg.command === 'ESP') {
    const message = Buffer(2048)
    message.write(JSON.stringify(msg))
    server.send(message, 0, message.length, 8889, '127.0.0.1')
  } else {
    win.webContents.send('command', msg)
  }
})



// Listen to all key events (pressed, released, typed) 
gkm.events.on('key.released', function(data) {
    if (data[0] == "Insert" || data[0] == "Einfg") { 
      if (!menu) {
        menu = new BrowserWindow({ 
          parent: win,
          frame: false,
          transparent: true,
          width: 400,  
          height: 400,  
          fullscreenable: false,  
          maximizable: false,  
          minimizable: false,  
          resizable: false,  
          autoHideMenuBar: true,  
          icon: 'arma3.ico' 
        }) 

        menu.loadURL(url.format({ 
          pathname: path.join(__dirname, 'render/menu.html'), 
          protocol: 'file:', 
          slashes: true 
        })) 
        menu.setAlwaysOnTop(true)
        menu.setBounds(winPos)
        // menu.focus()

        menu.webContents.openDevTools()

        menu.on('closed', () => {
          menu = null
        })
      } else if (menu.isVisible()) {
        menu.hide()
      } else {
        menu.show()
      }
    }
})