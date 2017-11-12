var game = new Phaser.Game(1200, 800, Phaser.CANVAS, '', {
  preload: preload,
  create: create,
  render: render
});

function preload() {
  game.load.image('whiskey', './whiskey.png');
  game.load.image('gin', './gin.png');
  game.load.image('platform', './platform.png');
  game.load.image('moving_platform', './moving_platform.png');
  game.load.image('heino', './heino.png');
  game.load.physics('physicsData', './sprite_physics.json');
  game.load.audio('clink', './bottle.wav');

}

var bottleCollisionGroup;
var platforms = [];
var clink;
var userPlatform;

function create() {

  game.stage.backgroundColor = '#124184';

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;

  //  Create collision group for the blocks
  bottleCollisionGroup = game.physics.p2.createCollisionGroup();

  //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
  //  (which we do) - what this does is adjust the bounds to use its own collision group.
  game.physics.p2.updateBoundsCollisionGroup();

  spawnPlatform(700, "left");
  spawnPlatform(500, "right");
  spawnPlatform(300, "left");
  spawnPlatform(150, "right", true);
  spawnNewBottle('whiskey');
  spawnNewBottle('gin');
  spawnNewBottle('gin');
  spawnNewBottle('gin');
  spawnNewBottle('gin');
  spawnNewBottle('gin');
  spawnNewBottle('gin');
  spawnNewBottle('gin');
  initHeino();

  clink = game.add.audio('clink');
  clink.allowMultiple = true;

}

function render() {
}

function spawnNewBottle(type) {
  let bottle = game.add.sprite(700, -50, type);
  game.physics.p2.enable(bottle);
  bottle.body.clearShapes();
  bottle.body.loadPolygon('physicsData', type);
  bottle.body.setCollisionGroup(bottleCollisionGroup);
  bottle.body.collides([bottleCollisionGroup]);
  bottle.body.onBeginContact.add(bottleHit, this);
}

function initHeino() {
    let heino = game.add.sprite(800, 700, 'heino');
  game.physics.p2.enable(heino);
  heino.body.kinematic = true;
  heino.body.setCollisionGroup(bottleCollisionGroup);
  heino.body.collides([bottleCollisionGroup]);
  heino.body.onBeginContact.add(heinoHit, this);
}

function bottleHit(body, bodyB, shapeA, shapeB, equation) {
  if(body) {
    if(Math.abs(body.velocity.x) > 50 || Math.abs(body.velocity.y) > 50) {
      //clink.play();
    }
  }
}

function heinoHit(body, bodyB, shapeA, shapeB, equation) {
  if(body) {
    let points = 0;
    if(body.sprite.key === 'whiskey') {
      points = 5;
    } else {
      points = 10;
    }

    window.scoreCallback("audun", points);

    game.physics.p2.enable(body.sprite);
    body.sprite.kill();
  }
}

function spawnPlatform(y, side, isUserPlatform = false) {
  let x, rotation, platformX;
  if(side === "left") {
    x = 300;
    platformX = 300;
    rotation = 0;
  }
  if(side === "right") {
    x = 900;
    platformX = 1150;
    rotation = Math.PI/2;
  }

  let platform = game.add.sprite(x, y, 'platform');
  game.physics.p2.enable(platform);
  platform.body.kinematic = true;
  platform.body.setCollisionGroup(bottleCollisionGroup);
  platform.body.collides([bottleCollisionGroup]);

  let moving_platform = game.add.sprite(platformX, y - 60, 'moving_platform');
  game.physics.p2.enable(moving_platform);
  moving_platform.body.clearShapes();
  moving_platform.body.loadPolygon('physicsData', 'moving_platform');
  moving_platform.body.kinematic = true;

  if(!isUserPlatform) {
    moving_platform.body.velocity.x = 100;
  } else {
    userPlatform = {
      side,
      moving_platform,
      platform,
    };
  }

  moving_platform.body.rotation = rotation;
  moving_platform.body.setCollisionGroup(bottleCollisionGroup);
  moving_platform.body.collides([bottleCollisionGroup]);

  platforms.push({
    side,
    moving_platform,
    platform,
    isUserPlatform,
  });
}

function update() {
}

function render() {
  platforms.forEach((platform) => {
    if(platform.isUserPlatform) {
      if (platform.moving_platform.body.x <= 550) {
        platform.moving_platform.body.velocity.x *= -1;
      }
      if(platform.moving_platform.body.x >= 1150) {
        platform.moving_platform.body.velocity.x = 0;
      }
    } else {
      if(platform.side === "left") {
        if (platform.moving_platform.body.x >= 435 ||
            platform.moving_platform.body.x <= 0) {
          platform.moving_platform.body.velocity.x *= -1;
        }
      }
      if(platform.side === "right") {
        if (platform.moving_platform.body.x <= 760 ||
            platform.moving_platform.body.x >= 1200) {
          platform.moving_platform.body.velocity.x *= -1;
        }
      }
    }
  });

//  game.debug.text(result, 32, 32);

}

// TVPARTY events and data
window.newEvent = (event) => {
  userPlatform.moving_platform.body.velocity.x = -100;
};

window.register = (scoreCallBack) => {
  console.log(scoreCallBack, "scoreCallBack");
  window.scoreCallback = scoreCallBack;
};

