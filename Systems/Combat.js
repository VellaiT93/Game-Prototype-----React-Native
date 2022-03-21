import Matter from "matter-js";
import Ball from "../components/Ball";

let fire = false;
let boxIds = 0;

const Combat = (entities, { events }) => {
  let engine = entities.physics.engine;
  let world = entities.physics.world;

  let player = entities.Bubble;
  let weapon = entities.Bubble.weapon;
  let currentWeapon = entities.Bubble.currentWeapon;

  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "fire") {
        fire = true;
      }

      if (events[i].type === "weapon0") {
        currentWeapon = "sword";
      } else if (
        events[i].type === "weapon146" ||
        events[i].type === "weapon102"
      ) {
        currentWeapon = "pistol";
      }
    }
  }

  if (fire) {
    if (currentWeapon === "sword" || currentWeapon === 0) {
      //fire = false;
    } else if (currentWeapon === "pistol") {
      const ball = Matter.Bodies.rectangle(
        player.direction === 1
          ? player.body.position.x - 60
          : player.body.position.x + 60,
        player.body.position.y - 15,
        10,
        10,
        {
          label: "Ball",
        }
      );

      Matter.World.add(world, ball);

      entities[++boxIds] = {
        body: ball,
        color: boxIds % 2 == 0 ? "pink" : "#B8E986",
        renderer: <Ball />,
      };

      if (player.direction === 0) {
        Matter.Body.setVelocity(ball, {
          x: 30,
          y: 0,
        });
      } else {
        Matter.Body.setVelocity(ball, {
          x: -30,
          y: 0,
        });
      }
    }
    fire = false;
  }

  entities.Bubble.currentWeapon = currentWeapon;

  return entities;
};

export default Combat;
