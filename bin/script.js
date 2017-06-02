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

// var mouse

function setup () {
  frameRate(500)
  createCanvas(windowWidth, windowHeight)
  textAlign(CENTER)
  fill('red')
  stroke('black')
  // mouse = createSprite(400, 200, 10, 10)
  // mouse.shapeColor = 'white'
}

function draw () {
  clear()

  players.forEach(function(elem) {    
    strokeWeight(1)
    ellipse(elem.head.x, elem.head.y, 5)
    strokeWeight(2)
    text(elem.name, elem.head.x, elem.head.y-10)
  })
  ellipse(mouseX, mouseY, 5, 5)
}