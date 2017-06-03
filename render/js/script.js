let players = []
//  = [
//     {
//         name: "Ben Hanks",
//         entity_id: 1337,
//         hp: 100,
//         distance: 100,
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
let showHp, showName, showDistance

const electron = require('electron')

electron.ipcRenderer.on('units', (event, msg) => {
  players = JSON.parse(msg)
})

electron.ipcRenderer.on('window', (event, win) => {
  resizeCanvas(win.width, win.height)
})

electron.ipcRenderer.on('hint', (event, msg) => {
  hint(msg)
})

electron.ipcRenderer.on('command', (event, msg) => {
  if (msg.command === 'ESP') {
    return msg.value ? players : players = []
  }
  if (msg.command === 'HP') {
    return msg.value ? showHp = true : showHp = false
  }
  if (msg.command === 'NAME') {
    return msg.value ? showName = true : showName = false
  }
  if (msg.command === 'DISTANCE') {
    return msg.value ? showDistance = true : showDistance = false
  }
})

function setup () {
  frameRate(150)
  createCanvas(windowWidth, windowHeight)
  textAlign(CENTER)
  rectMode(CENTER)
  stroke('black')
}

function draw () {
  clear()

  players.forEach(function(elem) {
    strokeWeight(1)
    if (showHp) {
      fill('rgba(0,0,0,0.3)')
      rect(elem.head.x, elem.head.y-15, 60, 5)
    }
    switch (elem.side) {
      case 0:
        fill('#810101')
        break;
      case 1:
        fill('#014d99')
        break;
      case 2:
        fill('#018101')
        break;
      case 3:
        fill('#670181')
        break;
      default:
        fill('#b29901')
        break;
    }
    ellipse(elem.head.x, elem.head.y, 5)
    if (showName) {
      text(elem.name, elem.head.x, elem.head.y-20)
    }
    if (showDistance) {
      text(Math.floor(elem.distance)+'m', elem.head.x, elem.head.y-30)
    }
    if (showHp) {
      strokeWeight(0)
      rect(elem.head.x-(30*elem.hp), elem.head.y-15, 60-((30*elem.hp)*2), 5)
    }
  })
}

function hint (msg = {text: 'hello', type: ''}) {
  $('button.hidden').attr('data-message', msg.text)
  $('button.hidden').attr('data-type', msg.type)
  $('button.hidden').click()
}