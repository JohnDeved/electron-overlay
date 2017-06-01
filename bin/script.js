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
  msg.forEach(function(elem) {
    players[elem.entity_id] = elem
  })
})

electron.ipcRenderer.on('window', (event, win) => {
  console.log(win)
  resizeCanvas(win.width, win.height)
})

function setup () {
  frameRate(30)
  createCanvas(windowWidth, windowHeight)
  textAlign(CENTER)
  fill('white')
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