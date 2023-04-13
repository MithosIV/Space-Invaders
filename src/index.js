
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y:0}
    }
  },
  scene: {
    preload,
    create,
    update
  }
};


let player = null;
keys:

new Phaser.Game(config);

function preload () {
  this.load.image('space', 'assets/space.png');
  this.load.image('player','assets/player.png');
}

function create () {
  this.add.image(300, 300, 'space');
  player = this.add.sprite(config.width/2, 550,"player");
  this.physics.add.existing(player);

  this.keys = this.input.keyboard.addKeys('A,D');

}
function update(){
  if (this.keys.A.isDown){
    player.body.velocity.x = -80;
  }
  else if (this.keys.D.isDown){
    player.body.velocity.x = 80;
  }
  else{
    player.body.velocity.x = 0;
  }
}
