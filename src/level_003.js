lvlFiles[lvlFiles.length] = {
  name: "testing loading",
  keys: {
    q: {
      type: "dungeon",
      name: "wall2",
      x: 32 * 0,
      y: 32 * 4,
      collision: true
    },
    f: {
      type: "dungeon",
      name: "floor2",
      x: 32 * 0,
      y: 32 * 8,
      collision: false
    }
  }, 
  map: [
    "q,q,q,q,q,q,q,q,q,q",
    "q,f,f,f,f,f,f,f,f,q",
    "q,f,f,f,f,f,f,f,f,q",
    "q,f,f,f,f,f,f,f,f,q",
    "q,f,f,f,f,f,f,f,f,q",
    "q,f,f,f,f,f,f,f,f,q",
    "q,f,f,f,f,f,f,f,f,q",
    "q,f,f,f,f,q,q,q,f,q",
    "q,f,f,f,f,f,f,q,f,q",
    "q,q,q,q,q,q,q,q,q,q",
  ] ,
  character: {
    x: 32 * 0,
    y: 32 * 0,
    type: "uniques",
    pos: {
      x: 3,
      y: 3
    },
    role: "character",
    health: 100,
    score: 1000000
  },
  monsters: [
    {
      type:"uniques",
      x: 32 * 2,
      y: 32 * 3,
      pos: {
        x: 6,
        y: 3
      },
      role: "monster",
      health: 10
    },
    
    {
      type:"uniques",
      x: 32 * 3,
      y: 32 * 3,
      pos: {
        x: 7,
        y: 4
      },
      role: "monster",
      health: 20
    }
    
  ],
  events: [
    {
      action: "msg",
      pos:{
        x:1,
        y:1
      },
      msg: "Welcome to CanvasQuest!",
      tomap:""
    },
    
    {
      action: "msg",
      pos:{
        x:2,
        y:1
      },
      msg: "Find the Exit!",
      tomap:""
    },
    
    {
      action: "treasure",
      pos: {
        x:5,
        y:7
      }
    }
    
  ],
  items:[
    {
      type: "misc",
      x: 32 * 0,
      y: 32 * 11,
      role: "notice",
      gold: 0,
      health: 1,
      pos: {
        x: 1,
        y: 1
      }
    },
    
    {
      type: "misc",
      x: 32 * 0,
      y: 32 * 11,
      role: "notice",
      gold: 0,
      health: 1,
      pos: {
        x: 2,
        y: 1
      }
    },
    
    {
      type: "misc",
      x: 32 * 0,
      y: 32 * 0,
      role: "treasure",
      gold: 1000,
      health: 1,
      pos: {
        x: 5,
        y: 7
      }
    }
    
  ] 
}
