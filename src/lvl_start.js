lvlFiles[lvlFiles.length] = {
 name: "0-1: The Journey Begins",
 keys: {
   w: {
     type: "features",
     name: "wall",
     x: 32 * 6,
     y: 32 * 6,
     collision: true
   },
   f: {
     type: "features",
     name: "floor",
     x: 32 * 0,
     y: 32 * 0,
     collision: false
   },
   d: {
     type: "features",
     name: "forest door",
     x: 32 * 6,
     y: 32 * 8,
     collision: false
   }
 },
  map: [
    "w,w,w,w,w,w,w,w,w,w",
    "w,f,w,f,f,f,w,f,f,d",
    "w,f,w,f,w,f,w,f,w,w",
    "w,f,w,f,w,f,f,f,w,w",
    "w,f,w,f,w,w,w,w,w,w",
    "w,f,w,f,f,f,f,f,f,w",
    "w,f,w,w,w,w,w,w,f,w",
    "w,f,w,f,f,f,w,f,f,w",
    "w,f,f,f,w,f,f,f,w,w",
    "w,w,w,w,w,w,w,w,w,w",
  ] , 
  character: {
    x: 32 * 0,
    y: 32 * 0,
    type: "uniques",
    pos: {
      x: 1,
      y: 1
    },
    role: "character",
    health: 10,
    score: 1000000
  },
  monsters: [
  ],
  events: [
  {
    action: "store",
    pos: {
      x: 7,
      y: 5
    }
  },
  
  {
    action: "storyline",
    pos: {
      x: 7,
      y: 1
    },
    msg: "You now will begin your journey. Find the Dungeon of Doom and get the Magic Canvas!"
  },
  
  
  {
    action: "newlevel",
    pos: {
      x: 9,
      y: 1
    },
    tomap:"lvl_000_1.js"
  },
   {
      action: "msg",
      pos:{
        x:1,
        y:2
      },
      msg: "Arrow keys to move.",
      tomap:""
    },
    {
      action: "msg",
      pos:{
        x:1,
        y:8
      },
      msg: "Eat food for health.",
      tomap:""
    },
    {
      action: "msg",
      pos: {
        x: 6,
        y: 8
      },
      msg: "Get gold to buy stuff.",
      tomap: ""
    },
    {
      action: "treasure",
      pos: {
        x: 7,
        y: 8
      },
      msg: "Get gold to buy stuff.",
      tomap: ""
    },
    {
      action: "food",
      pos: {
        x:2,
        y:8
      },
      msg: "Ham!",
      tomap: ""
    }
  ],
  items: [
  {"type":"features","x":160,"y":256,"pos":{"x":7,"y":5},"role":"store","gold":1,"health":1},
  {
      type: "misc",
      x: 32 * 0,
      y: 32 * 11,
      role: "notice",
      gold: 0,
      health: 1,
      pos: {
        x: 1,
        y: 2
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
        x: 1,
        y: 8
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
        x: 6,
        y: 8
      }
    },   
    {
      type: "food",
      x: 32 * 4,
      y: 32 * 0,
      role: "food",
      gold: 0,
      health: 10,
      pos: {
        x: 2,
        y: 8
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
        x: 7,
        y: 8
      }
    }
    
  ],
  
}