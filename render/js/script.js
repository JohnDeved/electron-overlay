let players = []
//  = [
//     {
//         name: "Ben Hanks",
//         entity_id: 1337,
//         hp: 100,
//         head: {
//             x: 250,
//             y: 400
//         },
//         torso: {
//             x: 0,
//             y: 0
//         },
//         feet: {
//             x: 0,
//             y: 0
//         }
//     }
// ]

const electron = require('electron')
electron.ipcRenderer.on('json', (event, msg) => {
  players = msg
})

electron.ipcRenderer.on('window', (event, win) => {
  resizeCanvas(win.width, win.height)
})

electron.ipcRenderer.on('hint', (event, msg) => {
  hint(msg)
})

function setup () {
  frameRate(150)
  createCanvas(windowWidth, windowHeight)
  textAlign(CENTER)
  fill('yellowgreen')
  stroke('black')
}

function draw () {
  clear()

  players.forEach(function(elem) {    
    strokeWeight(1)
    ellipse(elem.head.x, elem.head.y, 5)
    strokeWeight(2)
    text(elem.name, elem.head.x, elem.head.y-10)
  })
}

function hint (msg = {text: 'hello', type: ''}) {
  $('button.hidden').attr('data-message', msg.text)
  $('button.hidden').attr('data-type', msg.type)
  $('button.hidden').click()
}