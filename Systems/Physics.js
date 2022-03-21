import Matter from "matter-js";

let left = false;
let right = false;
let jump = false;
let run = false;

let allowJump = true;
let onGround = true;

let tick = 0;
let pose = 0;

const Physics = (entities, { touches, time, dispatch, events, screen }) => {
  let engine = entities.physics.engine;

  let player = entities.Bubble;

  let camera = entities.camera;
  let targetX = player.body.position.x + camera.offsetX;
  let anchorX = screen.width * 0.5;
  let diff = anchorX - player.body.position.x - camera.offsetX;

  if (targetX < 150 || diff < 150) {
    camera.offsetX += diff * 0.02;
  }

  // TOUCH EVENTS
  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "jump") {
        if (allowJump && onGround) {
          jump = true;
          allowJump = false;
          onGround = false;
        }
      } else if (events[i].type === "move-left") {
        player.direction = 1;
        left = true;
        run = true;
      } else if (events[i].type === "move-right") {
        player.direction = 0;
        right = true;
        run = true;
      } else if (events[i].type === "stop-left") {
        left = false;
        run = false;
        Matter.Body.setVelocity(player.body, { x: 0, y: 0 });
      } else if (events[i].type === "stop-right") {
        right = false;
        run = false;
        Matter.Body.setVelocity(player.body, { x: 0, y: 0 });
      }
    }
  }

  // Refresh rate
  Matter.Engine.update(engine, 1000 / 60, 1); //time.delta

  if (left) {
    if (jump) {
      Matter.Body.setVelocity(player.body, { x: -3, y: -6 });
      jump = false;
    } else {
      if (onGround) Matter.Body.setVelocity(player.body, { x: -2, y: 0 });
    }
  } else if (right) {
    if (jump === true) {
      Matter.Body.setVelocity(player.body, { x: 3, y: -6 });
      jump = false;
    } else {
      if (onGround) Matter.Body.setVelocity(player.body, { x: 2, y: 0 });
    }
  } else if (jump) {
    Matter.Body.setVelocity(player.body, { x: 0, y: -6 });
    jump = false;
  }

  if (run === true) {
    pose = 1;
  } else {
    pose = 0;
  }

  Matter.Events.on(engine, "collisionStart", function (event) {
    let pairs = event.pairs;
    if (!onGround) {
      if (
        pairs[0].bodyA.label === "Bubble" &&
        pairs[0].bodyB.label === "Floor"
      ) {
        onGround = true;
        allowJump = true;
      }
    }
  });

  entities.Bubble.pose = pose;

  return entities;
};

export default Physics;
