// Canvas Quest 2 - using YUI3 and work with webkit
var lvlFiles = new Array();

YUI().use("node", "event", "anim", "transition", "yql", "gallery-storage-lite", function(Y){
  Y.log("Canvas Quest 2 starting up...");
  
  //cc is a singleton - make it an obj
  cc = {
    version: 2.0,
    canvas: null,
    world: {
      name: 'none',
      keys: {},
      map: [],
      monsters: [],
      character:{},
      statusText: "It Begins.",
      eventMap:[],
      itemMap:[],
      levels:[]
    },
    gameData: {
      character: {
        level: 0,
        health: 0,
        gold: 0,
        exp: 0,
      },
      world: {
        currLevel: ""
      }
    },
    isNewGame: true,
    bindingsSet: false,
    firstWorld: "lvl_start.js",
    currWorld: "lvl_start.js",
    imgLib: {},
    init: function(){
      Y.log("Canvas Quest 2 init called!");
      //var firstTime = true; // default for a new game
      cc.checkNew();
      cc.loadWorld(cc.currWorld,cc.isNewGame);
      //cc.setupWorld(true);
      
      //Y.later(100, cc, "draw"); //chrome bug?
      //cc.bindings();
      
    },
    store: {
      defmsg: "Welcome to the store! Buy stuff!",
      okmsg: "Ok, bought!",
      nomsg: "You dont have enough money, hero.",
      currmsg: "...",
      init: function(){
        cc.store.currmsg = cc.store.defmsg;
        cc.store.render();
      },
      render: function(){
        Y.one("#storekeeper").set("text", cc.store.currmsg);
        Y.one("#storegold").set("text", cc.world.character.gold);
        Y.one("#storehealth").set("text", cc.world.character.health);
        cc.draw(); //keep game ui in sync
      },
      add:function(amt){
        var gold = cc.world.character.gold;
        var health = cc.world.character.health;
        // I know the switch is very redundant. Time!
        switch(amt){
          case 10:
            if(gold >=200){
              cc.world.character.health += 10;
              cc.world.character.gold -= 200;
              cc.store.currmsg = cc.store.okmsg;
            } else {
              cc.store.currmsg = cc.store.nomsg;
            }
            break;
          case 50:
            if(gold >= 300){
              cc.world.character.health += 50;
              cc.world.character.gold -= 300;
              cc.store.currmsg = cc.store.okmsg;
             } else {
               cc.store.currmsg = cc.store.nomsg;
             }
            break;
          case 100:
            if(gold >=500){
              cc.world.character.health += 100;
              cc.world.character.gold -= 500;
              cc.store.currmsg = cc.store.okmsg;
            } else {
              cc.store.currmsg = cc.store.nomsg;
            }
            break;  
        }
        cc.store.render();
      }
    },
    hideTitle: function(){
      var theTitle = Y.one("#stage .stagetitle");
      /**
      var anim = new Y.Anim({
        node: theTitle,
        to: { opacity: 0 }
      });
      anim.run();
      **/
    },
    showTitle: function(){
      Y.one("#stage").addClass("loading");
      Y.later(3000, cc, function(){Y.one("#stage").removeClass("loading")});

    },
    setTitle: function(txt){
      var theTitleText = Y.one("#stage .stagetitle em");
      theTitleText.setContent(txt);
    },
    checkNew: function(){
      var retval = true; //true if new game, false if coming from saved game
      Y.log("checkSaved - StorageLite length "+ Y.StorageLite.length());
      if(Y.StorageLite.length() > 0){
        retval = false; // coming from a saved game
      }
      cc.isNewGame =  retval;
    },
    loadGame: function(){
      Y.StorageLite.on('storage-lite:ready', function () {
        var gameData = Y.StorageLite.getItem("canvasquest", true);
        cc.gameData = gameData;
        cc.pullFromGameData();
        cc.currWorld = cc.gameData.world.currLevel;
        cc.isNewGame = false;
        cc.init(); 
      });
    },
    saveGame: function(){
      Y.StorageLite.on('storage-lite:ready', function () {
        cc.putIntoGameData();
        Y.StorageLite.setItem("canvasquest", cc.gameData, true);
      });
    },
    startNew: function(){
      //cc.init();
      Y.StorageLite.on('storage-lite:ready', function () {
        Y.StorageLite.clear(); 
      });
      cc.currWorld = cc.firstWorld;
      Y.log("startNew: cc.currworld"+ cc.currWorld);
      cc.isNewGame = true;
      cc.init();
    },
    putIntoGameData: function(){
      Y.log("putIntoGameData");
      
      Y.log(cc.world.character.level);
      Y.log("cc.currWorld"+cc.currWorld);
      cc.gameData.character.level = cc.world.character.level;
      cc.gameData.character.health = cc.world.character.health;
      cc.gameData.character.exp = cc.world.character.exp;
      cc.gameData.character.gold = cc.world.character.gold;
      cc.gameData.character.score = cc.world.character.score;
      cc.gameData.world.currLevel = cc.currWorld;
      
    },
    pullFromGameData: function(){
      cc.world.character.level = cc.gameData.character.level;
      cc.world.character.health = cc.gameData.character.health;
      cc.world.character.exp = cc.gameData.character.exp;
      cc.world.character.gold = cc.gameData.character.gold;
      cc.world.character.score = cc.gameData.character.score;
      //cc.currWorld = cc.gameData.world.currLevel;
      //Y.log("pullFromGameData"+ cc.gameData.world.currLevel);
      
    },
    /**
    testing: function(){
      var ctx = Y.one("#screen")._node.getContext("2d");
      var features = Y.one("#features")._node;
      //Y.log(ctx);
      ctx.font= ".5em prstartk, sans-serif";
      ctx.fillText("CanvasQuest Engine "+cc.version+" starting up...", 5, 25, 315); 
      //ctx.drawImage(features, 0,0,32,32,  0,0,32,32 );
      //ctx.drawImage(features, 32,32,32,32, 100,100,32,32)
    },**/
    bindings: function(){
      window.focus();
      var evt = Y.UA.chrome > 0 ? "down" : "press";
      //evt = "press";
      Y.on('key', function(e){
        Y.log(e.type + ": " + e.keyCode);

        // stopPropagation() and preventDefault()
        e.halt();

         var uiKey = false; //only trigger for save load etc.  
         switch(e.keyCode){
           case 27:
            page.swapPanel("stage","saveload");
            uiKey = true;
            break;
           case 32:
            //Y.log("restart!");
            window.location.reload();
            uiKey = true;
            break;
           case 37: 
            //Y.log("left");
            cc.world.character.move("left");
            break;
           case 38: 
            //Y.log("up");
            cc.world.character.move("up");
            break;
           case 39:
            //Y.log("right");
            cc.world.character.move("right");
            break;
           case 40:
            //Y.log("down");  
            cc.world.character.move("down");
            break; 
           case 76:
            Y.log("load level");
            cc.loadWorld(prompt("level?"));
            break;  
         } 
         if(!uiKey){
            cc.updateMonsters();
            //todo only do this when actually moved? but monsters could have moved. 
            cc.draw();
         }
 
      },
      "html", evt+':27,32,37,38,39,40,76', Y)
    },
    updateMonsters: function(){
      //Y.log("updatemonsters");
      //Y.log(cc.world.monsters);
      
      Y.Array.each(cc.world.monsters, function(val,idx,arr){
        //Y.log("monster:"+ val);
        val.rndMove();
      });
      
    },
    loadWorld: function(url,isFirstTime){
      Y.log("loadworld" + url);
      Y.log("is first time" + isFirstTime);
      var rndNum = Math.floor(Math.random() * 2000); //frakking browser caching
      //level = null;
      cc.putIntoGameData();
      var newLevel = Y.Get.script(url+"?"+rndNum, {
        onSuccess: function(){
          Y.log("after load: ");
          Y.log("new world loaded - level:");
          //Y.log(level);
          cc.currWorld = url;
          Y.log("loadworld: cc.currWorld"+ cc.currWorld);
          
          cc.setupWorld(isFirstTime);
          Y.later(100, cc, "draw");
          //cc.bindings();
          if(!cc.bindingsSet){
            cc.bindings();
            cc.bindingsSet = true; //dont set bindings more than once.
          }
        }
      })
    },
    setupWorld: function(firstTime){
      cc.canvas = Y.one("#screen")._node.getContext("2d");
      cc.imgLib.backdrop = document.createElement("canvas");
      cc.imgLib.backdrop.setAttribute("height", 320);
      cc.imgLib.backdrop.setAttribute("width", 320);
      
      cc.imgLib.status = document.createElement("canvas");
      cc.imgLib.status.setAttribute("height", 100);
      cc.imgLib.status.setAttribute("width", 320);
      var level = lvlFiles[lvlFiles.length-1];
      Y.log("setupWorld");
      Y.log(level);
      Y.log("firstTime?");
      Y.log(firstTime);
      if(level){
        //Y.log("setupworld level keys");
        //Y.log(level.keys);
        //Y.log("----")
        cc.world.name = level.name;
        cc.world.keys = level.keys;
        //Y.log("keys");
        //Y.log(cc.world.keys);
        
        cc.world.map = level.map;
        
        
        cc.setTitle(cc.world.name);
        // set up Actor
        cc.world.character = new Actor();
        cc.world.character.init(level.character);
        cc.world.character.pos = level.character.pos;
        if(firstTime){
          //import character
          Y.log(cc.gameData);
        } else {
          //buggy need to fix
          //cc.pullFromGameData();
          Y.log(cc.gameData);
          cc.world.character.gold = cc.gameData.character.gold;
          cc.world.character.health = cc.gameData.character.health;
          cc.world.character.exp = cc.gameData.character.exp;
          cc.world.character.level = cc.gameData.character.level;
          if(cc.gameData.score != 1000000){
            //fudge factor because loading seems to take up a turn...;
            cc.world.character.score = cc.gameData.character.score+1;
          }
          
        }


        
        //import monsters
        cc.world.monsters.length = 0;
        Y.Array.each(level.monsters, function(val,idx,arr){
          //Y.log(idx)
          cc.world.monsters[idx] = new Actor();
          cc.world.monsters[idx].init(val);
        })

        
        // set up eventMap
        var emap = new Array(10);
        for(i=0; i<emap.length; i++){
          emap[i] = new Array(10);
        }
        cc.world.eventMap = emap;
        
        // set up itemMap
        var imap = new Array(10);
        for(i=0; i<imap.length; i++){
          imap[i] = new Array(10);
        }
        cc.world.itemMap = imap;
        
        
        // populate events
        Y.Array.each(level.events, function(val,idx,arr){
          var tmpEvt = new Event();
          tmpEvt.init(val);
          cc.world.eventMap[val.pos.y][val.pos.x] = tmpEvt;
          
        });
        
        // import items
        // only ever go to a level once. Dont need to check to see if they are already there.
        Y.Array.each(level.items, function(val,idx,arr){
          var tmpItem = new Item();
          tmpItem.init(val);
          cc.world.itemMap[val.pos.y][val.pos.x] = tmpItem;
        });
        
      }
      
      //get images to use for tiles
      cc.imgLib.features = Y.one("#features")._node;
      cc.imgLib.uniques = Y.one("#uniques")._node;
      cc.imgLib.dungeon = Y.one("#dungeon")._node;
      cc.imgLib.misc = Y.one("#misc")._node;
      cc.imgLib.food = Y.one("#food")._node;
      cc.imgLib.logo = Y.one("#logo")._node;
      
      //new images
      cc.imgLib.edging2 = Y.one("#edging2")._node;
      cc.imgLib.edging1 = Y.one("#edging1")._node;
      cc.imgLib.monster1 = Y.one("#monster1")._node;
      cc.imgLib.monster2 = Y.one("#monster2")._node;
      cc.imgLib.monster3 = Y.one("#monster3")._node;
      cc.imgLib.monster4 = Y.one("#monster4")._node;
      cc.imgLib.monster5 = Y.one("#monster5")._node;
      cc.imgLib.monster6 = Y.one("#monster6")._node;
      cc.imgLib.monster7 = Y.one("#monster7")._node;
      cc.imgLib.grounds3 = Y.one("#grounds3")._node;
      cc.imgLib.townactions = Y.one("#townactions")._node;
      cc.imgLib.extra1 = Y.one("#extra1")._node;

      
      
      
      //show the title of the level
      cc.showTitle();
      
    },
    drawBackDrop: function(){
      

      //Y.log(cc.imgLib.backdrop);
           
      var bgctx = cc.imgLib.backdrop.getContext("2d");

      
      var mapLen = cc.world.map.length;
      Y.Array.each(cc.world.map, function(val,idx,arr){
        //Y.log(arr[idx]);
        var row = arr[idx].split(","); //convert string to array
        Y.Array.each(row, function(rval,ridx,rarr){
          //bgctx.drawImage(cc.world.keys[] )
          //Y.log(cc.world.keys[rval].type);
          //Y.log(cc.imgLib[cc.world.keys[rval].type]);
          bgctx.drawImage(cc.imgLib[cc.world.keys[rval].type], cc.world.keys[rval].x,   cc.world.keys[rval].y,32,32, ridx*32, idx*32, 32, 32 );
        })
      })
      
      
      
      cc.canvas.clearRect(0,0,320,320);
      cc.canvas.drawImage(cc.imgLib.backdrop, 0,0,320,320, 0,0,320,320);
      
      
    },

    drawChar: function(){
      cc.canvas.drawImage(cc.imgLib[cc.world.character.type], 
        cc.world.character.x, cc.world.character.y,32,32,   
        cc.world.character.pos.x*32, cc.world.character.pos.y*32,32,32);
    },
    
    drawMonsters: function(){
      var m = cc.world.monsters;
      var mctx = cc.canvas;
      
      Y.Array.each(m, function(mval,idx,arr){
        var mtype = mval.type;
        var mhealth = mval.health;
        //Y.log(cc.imgLib[mtype]);
        if(mhealth > 0){
          mctx.drawImage(cc.imgLib[mtype], mval.x, mval.y,32,32,  mval.pos.x * 32, mval.pos.y*32,32,32);

        }
      });
      
    },
    drawItems: function(){
      var itm = cc.world.itemMap;
      var itctx = cc.canvas;
      Y.Array.each(itm, function(rowVal,rowIdx,rowArr){
        Y.Array.each(rowVal, function(colVal,colIdx,colArr){
          //Y.log(colVal);
          if(colVal && colVal.health > 0){
            //Y.log("found an item");
            //Y.log(cc.imgLib[colVal.type]);
            
            itctx.drawImage(cc.imgLib[colVal.type], colVal.x, colVal.y,32,32, colVal.pos.x*32, colVal.pos.y*32,32,32);
          }
        })
      })
    },
    renderStatus: function(){
      var ctx = cc.imgLib.status.getContext("2d");
      var health = cc.world.character.health;
      var level = cc.world.character.level;
      var score = cc.world.character.score;
      var gold = cc.world.character.gold;
      var exp = cc.world.character.exp;
      var status = cc.world.character.status;
      var statusText = cc.world.statusText;
      
      //score = Math.floor(Math.random()*200);
      cc.world.character.score -=1; //drops for every move
      
      ctx.fillStyle="#292929";
      ctx.fillRect(0,0,320,100);
      
      ctx.fillStyle="#FFFFFF";
      ctx.font= ".8em prstartk, sans-serif";
      //ctx.fillText("CanvasQuest Engine "+cc.version+" starting up...", 5, 10, 315);
      
      ctx.fillText("Health: " + health, 5,12,150);
      ctx.fillText("Level: " + level, 5,24,150);
      ctx.fillText("Score: " + score, 5,36,150);
      ctx.fillText("Gold: "+ gold, 150,12,150);
      ctx.fillText("Exp: "+ exp, 150, 24, 150);
      ctx.fillText("Status: "+ status, 150,36,150);
      

      ctx.fillRect(0,41,350,1);
      
      ctx.fillStyle="tan";
      ctx.fillText(statusText, 5,54, 320);
      
      if(health < 1){
        cc.endGame();
      }
      
    },
    endGame: function(){
      page.swapPanel("stage","yerded");
    },
    drawStatus:function(){
      //temp
      cc.renderStatus();
      cc.canvas.drawImage(cc.imgLib.status, 0,320);
    },
    draw: function(){
      cc.canvas.clearRect(0,0,320,400);
      cc.drawBackDrop(); //draw the dungeon
      cc.drawItems(); //draw any items;
      cc.drawMonsters(); //draw the monster(s)
      cc.drawChar(); //draw the character
      cc.drawStatus(); //draw the HP, XP, etc.
      
    }
    
  }; //end cc
  
  //actor object can be monsters, character, etc.
  
  var Actor = function(){
    var retval = {
      
      
    id: "",
    type: "",
    role: "monster",
    canvas: document.createElement('canvas'),
    health : 0,
    score : 0,
    level : 0,
    currfloor: 0,
    gold : 0,
    exp: 0,
    status: "Healthy",
    x: 0,
    y: 0,
    pos: {
      x: 0,
      y: 0
    },
    init: function(iObj){
      this.pos.x = iObj.pos.x;
      this.pos.y = iObj.pos.y;
      this.type = iObj.type;
      this.id = Y.guid();
      this.x = iObj.x;
      this.y = iObj.y;
      this.role = iObj.role;
      this.health = iObj.health;
      if(iObj.role == "character"){
        this.populateLevels();
        this.score = iObj.score;
      }
    },
    checkAttack: function(toX,toY){
      var c = cc.world.character;
      var ma = cc.world.monsters;
      var retval = false;
      //Y.log("checkAttack "+ toX +" , "+ toY);
      //Y.log(this);
      if(this.role == "character"){
        //Y.log("is player")
        Y.Array.each(ma, function(val,idx,arr){
          //Y.log("val.health : "+val.health)
          //Y.log(val.pos.x +":"+val.pos.y);
          
          if(val.health > 0 && val.pos.x == toX && val.pos.y == toY){
            //Y.log("collision!");
            //Y.log("this health" + c.health);
            //Random damage to both...
            var dmgToMonster = Math.floor(Math.random() * 10);
            var dmgToChar = Math.floor(Math.random()*10);
            c.health = c.health - dmgToChar;
            
            if(dmgToChar > 0){
              c.popText("ouch!",c.pos.x *32 , c.pos.y * 32);
              retval = true;
            }
            //cant have negative health
            if (c.health < 0){
              c.health = 0;
            }
            //Y.log("chardmg" + dmgToChar);
            //Y.log(c.health);
            
            val.health -= dmgToMonster;
            if(dmgToMonster > 0){
              c.getExp(dmgToMonster); //todo factor in player level somehow
            }
            
            if(c.health <= 0){
              cc.world.statusText = "You're dead! Press space to restart.";
            } else {
              if(val.health <= 0){
                cc.world.statusText = "You killed the monster! Woot!";
                var bonus = (c.level==0? 1: c.level) * 50
                //Y.log("bonus:" + bonus);
                c.getExp(bonus);
              } else {
                cc.world.statusText = "You: "+ dmgToChar+" damage. Monster: "+ dmgToMonster +" damage."
              }
            }
          }
        });
        return retval;
      }
    },
    popText: function(txt, x, y){
      //create some text. move it up. and kill it :)
      var theText = Y.Node.create("<div class='poptxt'>"+txt+"</div>");
      theText.setStyles({"left":x, "top":y, "position":"absolute"});
      var theStage = Y.one("#stage");
      theStage.append(theText);
      theText.transition({
        duration: .6,
        easing: "ease-out",
        top: (y-30)+"px",
        
      }, function(){
        theText.remove();
        theText.destroy(true);
      })
    },
    checkCollision: function(toX,toY){
      if(toX < 0 || toX > 9 || toY < 0 || toY > 9){
        return true;
      }
      //get character
      var w = cc.world;
      var theChar = w.map[toY].split(",")[toX]
      //Y.log(theChar);
      return w.keys[theChar].collision;
    },
    checkEvent: function(x,y){
      //dont check events for non-players!
      if(this.role !="character"){
        return;
      }
      
      var w = cc.world;
      var em = w.eventMap;
      var it = w.itemMap;
      
      if(em[y][x]){
        Y.log("we got an event!");
        var evt = em[y][x];
        
        /**
        if(evt.action == "msg"){
          w.statusText = evt.msg;
        } 
        **/
        
        switch(evt.action){
          case "msg": 
            w.statusText = evt.msg;
            w.character.popText("hmm", (w.character.pos.x * 32) , (w.character.pos.y * 32) );
            break;
          case "treasure":
            if(it[y][x].health > 0){
              cc.world.character.gold +=  it[y][x].gold;
              w.statusText = "got "+ it[y][x].gold +" gold!";
              w.character.popText("cha-ching!", (w.character.pos.x * 32) - 30, w.character.pos.y * 32);
              it[y][x].destroy();
            };
            break;
          case "newlevel":
            w.statusText = "Loading new level...";
            var firstT = true;
            if(evt.tomap != cc.firstWorld){
              firstT = false;
            }
            cc.loadWorld(evt.tomap,firstT);
            break;
          case "food":
            if(it[y][x] .health > 0){
              cc.world.character.health += it[y][x].health;
            w.character.popText(evt.msg, (w.character.pos.x * 32) - 30, w.character.pos.y * 32);
            w.statusText = "Food!";
            it[y][x].destroy();
            }
            break;
          case "storyline":
            var msgtext = evt.msg;
            //no image for now;
            var storyline = Y.one("#storyline .storywords").setContent(msgtext);
            page.swapPanel("stage","storyline");
            break;  
          case "store":
            cc.store.init();
            page.swapPanel("stage","store");
            break;    
             
        }
         
      } else {
        //w.statusText = ""; //TODO set some kind of default status
      }
    },
    getExp: function(amt){
      var char = cc.world.character;
      cc.world.character.exp += amt;
      //have they leveled up?
      //var levels = cc.world.levels;
      //var xp = cc.world.character.exp; 
      cc.world.character.checkLevel();    
    },
    checkLevel: function(xp){
      var level = cc.world.character.level; //current level
      var xp = cc.world.character.exp;
      
      Y.Array.some(cc.world.levels, function(val,idx,arr){
        if(xp >= parseInt(val.experience)){
          
          if(cc.world.character.level < parseInt(val.value)){
            
          
            cc.world.character.level = parseInt(val.value);
            cc.world.character.popText("woah!", (cc.world.character.pos.x * 32) - 30, cc.world.character.pos.y * 32);
            var newHealth = 100 + (cc.world.character.level * 5);
            if(cc.world.character.health > newHealth){
              cc.world.character.health += (cc.world.character.level * 5);
            } else {
              cc.world.character.health = newHealth;
            } 
            cc.world.statusText = "Level Up!";
          }
          
        } else {
          return true;
        }
      });
    },
    populateLevels: function(){
             Y.YQL('use "http://whisperstorm.com/tests/xplevel/xplevel.xml" as xpl; select * from xpl where basexp="100" and numlevels="100"', 
            function(r){
                //Y.log(r);
                cc.world.levels = r.query.results.levels.level;
            });
    },
    move: function(dir){
      //Y.log("move ["+dir+"] called!");
      //TODO
      //need to first check for collision or attack (monster collision)
      //after moving check for treasure, door, etc
      var pos = this.pos;
      
      if(cc.world.character.health <1){return} //cant move if you're dead
      
      switch(dir){
        case "left": 
          if(!this.checkCollision(pos.x - 1, pos.y) && !this.checkAttack(pos.x-1, pos.y)){
            pos.x -= ((pos.x - 1) < 0)? 0 : 1;
            this.checkEvent(pos.x, pos.y);
          }
          break;
        case "right":
          if(!this.checkCollision(pos.x + 1, pos.y) && !this.checkAttack(pos.x+1, pos.y)){
            pos.x += ((pos.x + 1) > 9)? 0 : 1;
            this.checkEvent(pos.x, pos.y);
          }

          break;
        case "up":
          if(!this.checkCollision(pos.x, pos.y - 1) && !this.checkAttack(pos.x, pos.y-1)){
            pos.y -= ((pos.y - 1) <0 )? 0 : 1;
            this.checkEvent(pos.x, pos.y);
          }
          break;  
        case "down":
          if(!this.checkCollision(pos.x, pos.y + 1) && !this.checkAttack(pos.x, pos.y +1)){
            pos.y += ((pos.y + 1)>9)? 0 : 1;
            this.checkEvent(pos.x, pos.y);
          }
           
          break;  
      }
    },
    rndMove: function(){
      //Y.log("rndMove called");
      var seed = Math.floor(Math.random() *100);
      if(seed <=20) {this.move("up")}
      else if(seed <=40) {this.move("right")}
      else if(seed <=60) {this.move("down")}
      else if(seed <=80) {this.move("left")}
      else {/** no move **/}  
    }
    
      
      
    }
    
    return retval;
  };
  
  
  //game events like signs, treasure
  var Event = function(){
    var retval = {
      id:"",
      action:"msg",
      pos: {
        x: 0,
        y: 0
      },
      msg: "generic event",
      tomap: "",
      init: function(evtObj){
        //Y.log("Event initted");
        this.id = Y.guid();
        this.action = evtObj.action;
        this.pos = evtObj.pos;
        this.msg = evtObj.msg;
        this.tomap = evtObj.tomap;
        
      }
    }
    return retval;  
  }
  
  
  //game items
  var Item = function(){
    var retval = {
      id:"",
      role: "treasure",
      gold: 0,
      health: 1,
      type:"uniques",
      x: 0,
      y: 0,
      init: function(itemObj){
        this.id = Y.guid();
      },
      destroy: function(){
        this.health = 0;
      },
      pos:{
        x:0,
        y:0
      },
      collision: false,
      init: function(itemObj){
        //Y.log("Item initted");
        this.id = Y.guid();
        this.gold = itemObj.gold;
        this.health = itemObj.health;
        this.role = itemObj.role;
        this.type = itemObj.type;
        this.pos = itemObj.pos;
        this.x = itemObj.x;
        this.y = itemObj.y;
      }
    }
   return retval; 
  }
  
  
  
  //non-canvas page elements
  
  var page = {
    init: function(){
      page.setupPage();
      page.bindings();
    },
    setupPage :function(){
    
      function generateNoise(opacity) {
        if ( !! !document.createElement('canvas').getContext) {
          return false;
        }

        var canvas = document.createElement("canvas"),
          ctx = canvas.getContext('2d'),
          x, y, number, opacity = opacity || .2;

          canvas.width = 64;
          canvas.height = 64;

          for (x = 0; x < canvas.width; x++) {
            for (y = 0; y < canvas.height; y++) {
              number = Math.floor(Math.random() * 60);

              ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";
              ctx.fillRect(x, y, 1, 1);
            }
          }

          document.body.style.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")";
       }
  
      generateNoise(.3); // default opacity is .2
  
  
    },
    bindings: function(){
      Y.one("#startgame").on("click", function(){
        cc.checkNew();
        if(cc.isNewGame){
          page.swapPanel("splash","info");
        } else {
          page.swapPanel("splash","saveload");
        }
        
        
      });
      
      
      Y.one("#begingame").on("click", function(){
        page.swapPanel("info","saveload");
      });
      
      Y.one("#savegame").on("click", function(){
        cc.saveGame();
        page.swapPanel("saveload","stage");
        cc.world.statusText = "Game Saved!";
        
        
      });
      
      Y.one("#backtostart").on("click", function(){
        window.location.reload();
      });
      
      Y.one("#storylinedone").on("click", function(){
        page.swapPanel("storyline","stage");
      });
      
      Y.one("#loadgame").on("click", function(){
        cc.checkNew();
        
        if(cc.isNewGame){
          cc.startNew(); // kinda a hack, you should not be able to load a blank game.  
        } else {
          cc.loadGame();
        }
        
        page.swapPanel("saveload", "stage");
        cc.world.statusText = "Game Loaded!"
      });
      
      Y.one("#newgame").on("click", function(){ 
        cc.startNew();
        page.swapPanel("saveload","stage");
      });
      
      Y.one("#quitgame").on("click", function(){
        window.location.reload();
      })
      
      
        Y.one(".mod .bd ul").delegate("mouseover",function(){
            this.addClass("hovering");
            this.get("parentNode").addClass("throbbing");
        },"a");
        Y.one(".mod .bd ul").delegate("mouseout",function(){
            this.removeClass("hovering");
            this.get("parentNode").removeClass("throbbing");
        },"a"); 
      
      // store
      
      Y.one("#add10").on("click", function(e){
        e.preventDefault();
        cc.store.add(10);
      });
      Y.one("#add50").on("click", function(e){
        e.preventDefault();
        cc.store.add(50);
      });
      Y.one("#add100").on("click",function(e){
        e.preventDefault();
        cc.store.add(100);
      })
      
      Y.one("#shoppingdone").on("click",function(e){
        e.preventDefault();
        cc.draw(); //keep game ui in sync
        page.swapPanel("store","stage");
        cc.store.init();//reset the message. not really needed but eh.
      })
      
    },
    swapPanel: function(oldId, newId){
      //put unhidden panel away
      //Y.log(oldId)
      
      hidingPanel = Y.one("#"+oldId);
      var animHidePanel = new Y.Anim({
        node: hidingPanel,
        to: {
          left: -400 
        },
        easing: Y.Easing.backIn
      });
      
      var onEnd = function(){
        hidingPanel.addClass("hide").removeClass("show").setAttribute("style","");
        //Y.log("hid one! " + oldId)
        animShowPanel.run();
      }
      
      animHidePanel.once("end", onEnd);
      
      animHidePanel.run();
      
      
      var showingPanel = Y.one("#"+newId)
      var animShowPanel = new Y.Anim({
        node: showingPanel,
        to: {
          left: 14
        },
        easing: Y.Easing.backOut
      })
      
      var onShowEnd = function(){
        showingPanel.addClass("show").removeClass("hide").setAttribute("style","");
        //Y.log("shown one! " + newId );
        
      }
      animShowPanel.once("end", onShowEnd);
      
      
    }
  
  }
  
  
  Y.on("domready", function(){
    page.init();
  });
  
  Y.on("load", function(){
    //cc.init();
    
    
  })
  
}); //end YUI().use
