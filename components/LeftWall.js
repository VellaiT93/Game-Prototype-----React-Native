import React from "react";
import { View } from "react-native";
import Matter from "matter-js";

const LeftWall = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const bodyX = props.body.position.x - widthBody / 2;
  const bodyY = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        //backgroundColor: color,
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
  const leftWall = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: "LeftWall",
      isStatic: true,
    }
  );

  Matter.World.add(world, leftWall);

  return {
    body: leftWall,
    color,
    pos,
    renderer: <LeftWall />,
  };
};
