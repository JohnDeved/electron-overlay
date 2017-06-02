const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const dgram = require('dgram')
const server = dgram.createSocket('udp4')
const gkm = require('gkm');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    transparent: true, 
    width: 800, 
    height: 600, 
    frame: false,
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

server.on('message', (msg, rinfo) => {
  msg = JSON.parse(msg.toString())
  if (msg.window) {
    win.setBounds(msg.window)
    win.webContents.send('window', msg.window)
  }
  if (msg.units) {
    win.webContents.send('json', msg.units)
  }
})

ipcMain.on('client-message', (event, arg) => {
  console.log(arg)
})

// server.send(message, 8889, '127.0.0.1', err => consoel.log(err))

server.bind(8888)

// Listen to all key events (pressed, released, typed) 
gkm.events.on('key.released', function(data) {
    if (data[0] == "Insert") {
      console.log('Einf eventhandler')

      menu = new BrowserWindow({
        width: 250, 
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

    }
})