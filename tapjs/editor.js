    
  var ed = {};
  
    YUI().use("node","event", "json", "tabview","overlay", function(Y){
      
     evtOverlay = new Y.Overlay({
       srcNode: "#evtoverlay",
       visible:false,
       width:"20em",
       centered: true
     } );
     evtOverlay.render(); 
      
     ed = {
        imgs: {},
        keys: {},
        map: [],
        monsters:[],
        events: [],
        items: [],
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
        currNode: {},
        init: function(){
          Y.log("editor initted!");
          ed.genTabs();
          ed.genGrid();
          ed.getImages();
          
          ed.genMonsterGrid();
          ed.genEventGrid();
          ed.genItemGrid();
          
          ed.bindings();
        },
        genTabs: function(){
          var tabview = new Y.TabView({
            srcNode: '#tabview'
          });
 
    tabview.render();
        },
        bindings: function(){
          
          Y.one("#tb_restart").on("click",function(e){
            e.preventDefault();
            window.location.reload();
          })
          
          Y.one("#set").on("change", function(){
           var val =  Y.one("#set").get("value");
           Y.log(val);
           ed.renderSet(val);
          });
          
          
          Y.delegate("click", function(e){
            Y.log(e.target.getData("tiledata"));
            var tileData = e.target.getData("tiledata");
            //set selected tile box
            
            tBox = Y.one("#seltile");
            tBox.setData("tiledata",tileData );
              tBox.setStyle("backgroundImage","url("+tileData.src+")");
              tBox.setStyle("backgroundPosition", "-"+tileData.x*32+"px -"+tileData.y*32+"px");
            
            
            
          },"#tileitems", ".tileitem");
          
          //tile items
          Y.delegate("click", function(e){
            Y.log(e.target.getData("gridData"));
            var tgtGrid = e.target;
            ed.currNode = tgtGrid;
            
            var selTile = Y.one("#seltile");
            var tileData = selTile.getData("tiledata");
            
            tgtGrid.setData("tiledata", tileData);
            tgtGrid.setStyle("backgroundImage","url("+tileData.src+")");
            tgtGrid.setStyle("backgroundPosition", "-"+tileData.x*32+"px -"+tileData.y*32+"px");
            
            tgtGrid.setData("collision", Y.one("#selcollision").get("checked"));
            tgtGrid.set("title",tgtGrid.getData("tiledata").label+" c: "+ tgtGrid.getData("collision") );
            
            Y.log(tgtGrid.getData("collision"));
            Y.log(tgtGrid.getData("tiledata").label);
                        
            ed.getTiles();
            
          },"#gridview", ".griditem");
          
          //monster items
          Y.delegate("click", function(e){
            var tgtGrid = e.target;
            ed.currNode = tgtGrid;
            
            var selTile = Y.one("#seltile");
            var tileData = selTile.getData("tiledata");
            
            tgtGrid.setData("tiledata", tileData);
            tgtGrid.setStyle("backgroundImage","url("+tileData.src+")");
            tgtGrid.setStyle("backgroundPosition", "-"+tileData.x*32+"px -"+tileData.y*32+"px");
            
            tgtGrid.set("title",tgtGrid.getData("tiledata").label+" c: "+ tgtGrid.getData("collision") );
            
            ed.getTiles();
            
          }, "#mongridview", ".mongriditem");
          
          // item items
          Y.delegate("click", function(e){
            var tgtGrid = e.target;
            ed.currNode = tgtGrid;
            
            var selTile = Y.one("#seltile");
            var tileData = selTile.getData("tiledata");
            
            tgtGrid.setData("tiledata", tileData);
            tgtGrid.setStyle("backgroundImage","url("+tileData.src+")");
            tgtGrid.setStyle("backgroundPosition", "-"+tileData.x*32+"px -"+tileData.y*32+"px");
            
            tgtGrid.set("title",tgtGrid.getData("tiledata").label+" c: "+ tgtGrid.getData("collision") );
            
            ed.getTiles();
            
          }, "#itmgridview", ".itmgriditem");
          
          
          //event items
          Y.delegate("click", function(e){
            var tgtGrid = e.target;
            ed.currNode = tgtGrid;
            
            var overlayNode = Y.one("#evtoverlay");
            var gData = tgtGrid.getData("gridData");
            
            
            
            Y.one("#evtposx").setContent(gData.x);
            Y.one("#evtposy").setContent(gData.y);
            
            tgtGrid.addClass("evtgriditemset");
            
            
            
            
            
            evtOverlay.show();
          }, "#evtgridview", ".evtgriditem");
          //close event overlay
          Y.one("#hideoverlay").on("click",function(){
            evtOverlay.hide();
          })
          
          //save event from overlay
          Y.one("#saveevt").on("click",function(){
            ed.currNode.setData("tiledata", {
              action: Y.one("#evttype").get("value"),
              pos: {
                x: ed.currNode.getData("gridData").x,
                y: ed.currNode.getData("gridData").y
              },
              msg: Y.one("#evtmsg").get("value"),
              tomap: Y.one("#evttomap").get("value")
            });
            
            ed.currNode.set("title",Y.one("#evttype").get("value"));
            
            evtOverlay.hide();
            ed.getTiles();
          });
        },
        genItemGrid: function(){
           //yes I know this is freaking redundant code. I'm just trying to get it finished for the competition :)
          var itmgridMarkup = Y.Node.create("<div id='itmgridview'></div>");
          for( i = 0; i < 10; i++){
            var itmgridRow = Y.Node.create("<div class='itmgridrow'></div>");
            for( j = 0; j < 10; j++){
              var itmgridItem = Y.Node.create("<div class='itmgriditem'></div>");
              var itmgridData = {
                x: j,
                y: i
              }
              itmgridItem.setData("gridData", itmgridData);
              itmgridRow.append(itmgridItem);
            }
            itmgridMarkup.append(itmgridRow);
            var tgt = Y.one("#items");
            tgt.setContent(itmgridMarkup);
          }          
        },
        genEventGrid: function(){
          //yes I know this is freaking redundant code. I'm just trying to get it finished for the competition :)
          var evtgridMarkup = Y.Node.create("<div id='evtgridview'></div>");
          for( i = 0; i < 10; i++){
            var evtgridRow = Y.Node.create("<div class='evtgridrow'></div>");
            for( j = 0; j < 10; j++){
              var evtgridItem = Y.Node.create("<div class='evtgriditem'></div>");
              var evtgridData = {
                x: j,
                y: i
              }
              evtgridItem.setData("gridData", evtgridData);
              evtgridRow.append(evtgridItem);
            }
            evtgridMarkup.append(evtgridRow);
            var tgt = Y.one("#events");
            tgt.setContent(evtgridMarkup);
          } 
          
        },
        genMonsterGrid: function(){
        var mongridMarkup = Y.Node.create("<div id='mongridview'></div>");
          for( i = 0; i < 10; i++){
            var mongridRow = Y.Node.create("<div class='mongridrow'></div>");
            for( j = 0; j < 10; j++){
              var mongridItem = Y.Node.create("<div class='mongriditem'></div>");
              var mongridData = {
                x: j,
                y: i
              }
              mongridItem.setData("gridData", mongridData);
              mongridRow.append(mongridItem);
            }
            mongridMarkup.append(mongridRow);
            var tgt = Y.one("#monsters");
            tgt.setContent(mongridMarkup);
          }          
        },
        genGrid: function(){

          var gridMarkup = Y.Node.create("<div id='gridview'></div>");
          for( i = 0; i < 10; i++){
            var gridRow = Y.Node.create("<div class='gridrow'></div>");
            for( j = 0; j < 10; j++){
              var gridItem = Y.Node.create("<div class='griditem'></div>");
              var gridData = {
                x: j,
                y: i
              }
              gridItem.setData("gridData", gridData);
              gridRow.append(gridItem);
            }
            gridMarkup.append(gridRow);
            var tgt = Y.one("#grid");
            tgt.setContent(gridMarkup);
          }
        },
        getImages: function(){
          var imgArr = [
            {name: "uniques", src:"imgs/dg_uniques32.png", dim:[10,9]},
            {name:"dungeon", src:"imgs/dg_dungeon32.png", dim:[9,10]},
            {name:"features", src:"imgs/dg_features.png", dim:[9,13]},
            {name:"misc", src:"imgs/dg_misc.png", dim:[7,17]},
            {name: "food", src:"imgs/dg_food32.png", dim:[5,5]},
            
            {name: "edging2", src:"imgs/dg_edging232.png", dim:[8,17]},
            {name: "edging1", src:"imgs/dg_edging132.png", dim:[8,17]},
            {name: "monster1", src:"imgs/dg_monster132.png", dim:[6,16]},
            {name: "monster2", src:"imgs/dg_monster232.png", dim:[6,16]},
            {name: "monster3", src:"imgs/dg_monster332.png", dim:[6,13]},
            {name: "monster4", src:"imgs/dg_monster432.png", dim:[6,13]},
            {name: "monster5", src:"imgs/dg_monster532.png", dim:[8,8]},
            {name: "monster6", src:"imgs/dg_monster632.png", dim:[6,13]},
            {name: "monster7", src:"imgs/dg_monster732.png", dim:[8,4]},
            {name: "grounds3", src:"imgs/dg_grounds32.gif", dim:[9,19]},
            {name: "townactions", src:"imgs/townactions.png", dim:[8,9]},
            {name: "extra1", src:"imgs/dg_extra132.gif", dim:[9,16]}


            
          ];
          
          Y.Array.each(imgArr, function(v,i,a){
            var tmpObj = {};
            tmpObj.name = v.name;
            tmpObj.src = v.src;
            tmpObj.bits = new Image();
            tmpObj.bits.src = v.src;
            tmpObj.rows = v.dim[1];
            tmpObj.cols = v.dim[0];
            
            ed.imgs[v.name] = tmpObj;
          })
        },
        getTiles: function(){
          ed.getGridTiles();
          ed.getMonsterTiles();
          ed.getEventTiles();
          ed.getItemTiles();
          ed.showCode();
        },
        getItemTiles: function(){
          Y.log("getItemTiles");
          var theItemGrid = Y.one("#itmgridview");
          var theItemRows = theItemGrid.all(".itmgridrow");
          var theItemArr = [];
          theItemRows.each(function(val,idx,list){
            var theItems = val.all(".itmgriditem"); // get each tile in each row
            theItems.each(function(ival,iidx,ilist){
              if(ival.getData("tiledata")){
                Y.log("item val data");
                var tData = ival.getData("tiledata");
                var gData = ival.getData("gridData");
                tempItem = {
                  type: tData.type,
                  x: tData.x * 32,
                  y: tData.y * 32,
                  pos: {
                    x: gData.x,
                    y: gData.y
                  },
                  role: "treasure",
                  gold: 1,
                  health: 1
                }
                theItemArr[theItemArr.length] = tempItem;
              }
            });
            ed.items = theItemArr;
          });
        },
        getEventTiles: function(){
          var theEvtArr = [];
          var theEvtNodes = Y.all(".evtgriditemset");
          Y.log(theEvtNodes);
          theEvtNodes.each(function(val,idx,list){
            theEvtArr[theEvtArr.length] = val.getData("tiledata");
          })
          ed.events = theEvtArr;
        },
        getMonsterTiles: function(){
          var theMonsterGrid = Y.one("#mongridview");
          var theMonsterRows = theMonsterGrid.all(".mongridrow");
          var theMonArr = [];
          
          theMonsterRows.each(function(val,idx,list){
            var theItems = val.all(".mongriditem"); // get each tile in each row
            theItems.each(function(mval, midx, mlist){
              if(mval.getData("tiledata")){
                Y.log("monster val data");
                var tData = mval.getData("tiledata"); 
                var gData = mval.getData("gridData"); 
                tempMon = {
                  type: tData.type,
                  x: tData.x * 32,
                  y: tData.y * 32,
                  pos: {
                    x: gData.x,
                    y: gData.y
                  },
                  role: "monster",
                  health: 10 + (Math.floor(Math.random() * 5))
                }
                Y.log(tempMon);
                theMonArr[theMonArr.length] = tempMon;
              };
              
            });
            
          });
          ed.monsters = theMonArr;
        },
        getGridTiles: function(){
          var theGrid = Y.one("#gridview");
          var theRows = theGrid.all(".gridrow");
          var theArr = [];
          var theKeys = {};
          
          //Y.log(theRows);
          theRows.each(function(val,idx,list){
            //Y.log(val);
            //val.setContent(idx)
            theArr[idx] = "";
            var theItems = val.all(".griditem");
            theItems.each(function(gval,gidx,glist){
              //Y.log(gval);
              
              if(gval.getData("tiledata") ){
                theArr[idx] += gval.getData("tiledata").label ;
                var theData = gval.getData("tiledata");
                theKeys[theData.label] = {
                  name: theData.label,
                  type: theData.type,
                  x : 32 * theData.x,
                  y: 32 * theData.y,
                  collision: gval.getData("collision")
                }
              }else {
                theArr[idx] += "-";
              }
              
              theArr[idx] += ",";
            });
            
            theArr[idx] = theArr[idx].substring(0,theArr[idx].length-1);
          });
          
          //Y.log(theArr);
          //Y.log(theKeys);
          ed.keys = theKeys;
          ed.map = theArr;
          
          
        },
        showCode: function(){
          var output = Y.one("#outputcode");
          var keys = ed.keys;
          var map = ed.map;
          var monsters = ed.monsters;
          var events = ed.events;
          var items = ed.items;
          var character = ed.character;
          
          var outTxt = 'lvlFiles[lvlFiles.length] = {\n name: "0-1: The Blank Level Name",';
          
          outTxt += "\n keys:" + Y.JSON.stringify(keys)+",";
          
          outTxt += "\n map:" + Y.JSON.stringify(map)+",";
          
          outTxt += "\n monsters: "+ Y.JSON.stringify(monsters) + ",";
          outTxt += "\n events: " + Y.JSON.stringify(events) + ",";
          outTxt += "\n items: " + Y.JSON.stringify(items) + ",";
          outTxt += "\n character: "+ Y.JSON.stringify(character) + " ";
          outTxt +="\n}; /*end of level*/";
          output.set("value", outTxt);
          
        },
        renderSet: function(set){
          if(set == "pick a set") {
            return;
          }
          var tgtdiv = Y.one("#tileitems");
          tgtdiv.setContent("");
          
          var sprite = ed.imgs[set];
          var idx = 0;
          
          //rows
          for(i = 0; i < sprite.rows; i++){
            for(j = 0; j < sprite.cols; j++){
              var tile = Y.Node.create("<div class='tileitem'></div>");
              var tileData = {
                x: j,
                y: i,
                type: set,
                src: sprite.src,
                label: set + "_" + idx++
              }
              tile.setData("tiledata",tileData );
              tile.setStyle("backgroundImage","url("+sprite.src+")");
              tile.setStyle("backgroundPosition", "-"+j*32+"px -"+i*32+"px");
              
              tgtdiv.append(tile);
              
            }
          }          
        }
      }
      
      Y.on("domready", function(){
        ed.init();
      })
      
    })
    