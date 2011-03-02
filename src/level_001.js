lvlFiles[lvlFiles.length] = {
  name: "testing",
  keys: {
    w: {
      type: "features",
      name: "wall",
      x: 32 * 3,
      y: 32 * 0,
      collision: true
    },
    f: {
      type: "features",
      name: "floor",
      x: 32 * 3,
      y: 32 * 1,
      collision: false
    },
    g: {
      type: "dungeon",
      name: "door",
      x: 32 * 7,
      y: 32 * 1,
      collision: false
    }
  }, 
  map: [
    "w,w,w,w,w,w,w,w,w,w",
    "w,f,f,f,f,f,f,f,f,w",
    "w,f,f,f,f,f,f,f,f,w",
    "w,f,f,f,f,f,f,f,f,w",
    "w,f,f,f,f,f,f,f,f,w",
    "w,f,f,f,f,f,f,f,f,w",
    "w,f,f,f,f,f,f,f,f,w",
    "w,f,f,f,f,f,f,w,f,w",
    "w,f,f,f,f,f,f,w,g,w",
    "w,w,w,w,w,w,w,w,w,w",
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
    },
    
    {
      action: "newlevel",
      pos: {
        x: 8,
        y: 8
      },
      tomap: "level_003.js"
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

foo = 3;
