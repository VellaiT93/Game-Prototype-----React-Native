import React from "react";
import { View } from "react-native";
import Matter from "matter-js";

const Floor = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const bodyX = props.body.position.x - widthBody / 2;
  const bodyY = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        backgroundColor: color,
        position: "absolute",
        left: bodyX,
        top: bodyY,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};

export default (world, color, pos, size) => {
  const floor = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: "Floor",
    isStatic: true,
    density: 1,
    friction: 1,
    restitution: 0,
    collisionFilter: {
      category: 1,
    },
  });

  Matter.World.add(world, floor);

  return {
    body: floor,
    color,
    pos,
    renderer: <Floor />,
  };
};
