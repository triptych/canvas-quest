lvlFiles[lvlFiles.length] = {
 name: "0-0: The Empty Room",
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
    "w,f,f,f,f,f,f,f,f,w",
    "w,f,f,f,f,f,f,f,f,w",
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
  monsters: [],
  events: [],
  items: [],
  
}