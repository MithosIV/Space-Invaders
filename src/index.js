
import Phaser, { Game } from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 1000,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y:0}
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const ReloadTime = 1000;
let player = null;
let aliens = null;
let bullets = null;
let scoreText;
let highScorePoints = 0;
let scorePoints = 0;
let bulletTimeCount = 0;

function preload () {
  this.load.image("space", "assets/space.png");
  this.load.image("player","assets/Ship.png");
  this.load.image("bullet","assets/Bullet.png");
  this.load.image("alien", "assets/Enemy.png");
}

function create () {
  this.add.image(300, 300, "space");
  player = this.physics.add.sprite(config.width/2, 950,"player");
  //alien = this.add.sprite(config.width/2,250,"alien");
  this.keys = this.input.keyboard.addKeys("A,D,SPACE");
 
 
  aliens = this.physics.add.group({
    key: 'alien',
    repeat: 5, 
    setXY: { x: 50, y: 250, stepX: 100, } 
  });

  bullets = this.physics.add.group({
    defaultKey: 'bullet',
    maxSize: 100 
  });
    
    // this.bullets = [];
    // this.pool = [];
    
    scoreText = this.add.text(config.width - 560,50, "Score: 0 ", {fontSize: "30px", fill: "#FFFFFF"});
    
  }
  function update(time, delta){
    if (scorePoints > highScorePoints){
      highScorePoints = scorePoints;
      localStorage.setItem("highScore", highScorePoints);
    }
    scoreText.setText("Score: " + scorePoints + "   High Score: "+highScorePoints);
    this.physics.add.overlap(bullets, aliens, hitEnemy, null, this);
    
    
    bulletTimeCount += delta;
    if(bulletTimeCount >= ReloadTime){
    if (this.keys.SPACE.isDown)
    {
      shoot();
      //bullet = this.physics.add.sprite(player.body.x + 25, player.body.y - 20,"bullet")
      //bullet.physics.add.collider();
      //bullet.body.velocity.y = -250;
      bulletTimeCount = 0;
    }  
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
      player.body.velocity.x = -200;
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
      player.body.velocity.x = 200;
    }
    else
    {
      player.body.velocity.x = 0;
    }
    
}
          /*Intentos de hacer que las pools funcinen*/
// function moveToPool(bullet,index){
//   this.bullets.splice(index,1);
//   this.pool.push(bullet);
//   bullet.setVisible(false);
//   bullet.setVelocityBullet(0);
// }
// function getGroup()
// {
//   return this.group;
// }
// function setVelocityBullet(velocity){
//   bullet.body.velocity.y = -velocity;
// }
// function setVisible(state){
//   bullet.visible = state;
// }
// function hasExitedScreen(){
//   return bullet.getBounds().down < 0; 
// }
function shoot()
{
  let bullet = bullets.get(player.x, player.y);
  if (bullet)
  {
    bullet.body.velocity.y = -400;
  }
}
function hitEnemy(bullet, alien)
{
scorePoints += 100;
bullet.destroy();
let alienXPos = (Math.random() * 500);
let alienYPos = (Math.random() * 500);
alien.body.x = alienXPos;
alien.body.y = alienYPos;
}
  keys:
  new Phaser.Game(config);