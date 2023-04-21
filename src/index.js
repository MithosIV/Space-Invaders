
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
  this.load.image('player','assets/Ship.png');
  this.load.image('bullet','assets/Bullet.png')
  this.load.image('alien', 'assets/Enemy.png')
}

function create () {
  this.add.image(300, 300, 'space');
  player = this.add.sprite(config.width/2, 550,"player");
  this.physics.add.existing(player);
  //alien = this.add.sprite(config.width/2, 50,"alien");

  
  //this.physics.add.existing(alien);

  this.keys = this.input.keyboard.addKeys('A,D,SPACEBAR');

}
function update(){
  if (this.keys.SPACEBAR.isDown)
  {
    shoot();
  }
  if (this.keys.A.isDown){
   movementL();
  }
  else if (this.keys.D.isDown){
   movementR(); 
  }
  else{
    player.body.velocity.x = 0;
  }

  
}
function movementL()
{
  if(player.body.x > 0)
  {
    player.body.velocity.x = -150;
  }
  else
  {
    player.body.velocity.x = 0;
  }
  
}
function movementR()
{
  if (player.body.x < config.width - player.width)
    {
      player.body.velocity.x = 150;
    }
    else
    {
      player.body.velocity.x = 0;
    }
  
}
function shoot()
{
  bullet = this.add.sprite(config.width/2,550,"bullet");
  this.physics.add.existing(bullet);
  pipe.body.allowGravity = false;
  pipe.body.immovable = true;
  bullet.body.velocity.y = 100;
}