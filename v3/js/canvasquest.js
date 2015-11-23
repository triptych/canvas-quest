var gameProperties = {
    screenWidth: 640,
    screenHeight: 480,
};

var states = {
    game: "game",
};

var gameState = function(game){

};

gameState.prototype = {

    preload: function () {
        console.log("gamestate: preload");
    },

    create: function () {
        console.log("gamestate: create");
    },

    update: function () {
        console.log("gamestate: update");
    },
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'canvasQuest');
game.state.add(states.game, gameState);
game.state.start(states.game);