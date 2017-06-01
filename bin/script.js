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
  console.log(win)
  resizeCanvas(win.width, win.height)
})

electron.ipcRenderer.on('time', (event, time) => {
  // console.log(new Date() - time)
})

function setup () {
  frameRate(30)
  createCanvas(windowWidth, windowHeight)
  textAlign(CENTER)
  fill('white')
  stroke('black')
}

function draw () {
  let time = new Date()
  clear()

  players.forEach(function(elem) {
    
    strokeWeight(1)
    ellipse(elem.head.x, elem.head.y, 5)
    strokeWeight(2)
    text(elem.name, elem.head.x, elem.head.y-10)
  })
  console.log(new Date() - time)
}