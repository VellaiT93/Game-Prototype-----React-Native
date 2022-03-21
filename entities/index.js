import Matter from "matter-js";
import { Dimensions } from "react-native";

import Bubble from "../components/Bubble";
import Floor from "../components/Floor";
import LeftWall from "../components/LeftWall";
import RightWall from "../components/RightWall";
import Zombie from "../components/Zombie";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default (restart) => {
  let engine = Matter.Engine.create({
    enableSleeping: false,
  });

  let world = engine.world;
  engine.gravity.y = 0.8;

  return {
    physics: { engine, world },
    camera: { offsetX: 0 },
    Bubble: Bubble(
      world,
      { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 3 },
      { width: 54, height: 64 },
      0,
      0,
      0,
      0
    ),
    Zombie: Zombie(
      world,
      { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 3 },
      { width: 54, height: 64 },
      0
    ),
    Floor: Floor(
      world,
      "black",
      { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT },
      { width: SCREEN_WIDTH * 2, height: SCREEN_HEIGHT * 0.05 }
    ),
    LeftWall: LeftWall(
      world,
      "",
      { x: -6, y: SCREEN_HEIGHT / 2 },
      { width: 20, height: SCREEN_HEIGHT }
    ),
    RightWall: RightWall(
      world,
      "green",
      { x: SCREEN_WIDTH + 8, y: SCREEN_HEIGHT / 2 },
      { width: 60, height: SCREEN_HEIGHT }
    ),
  };
};
