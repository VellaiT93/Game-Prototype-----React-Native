import React from "react";
import { View } from "react-native";
import Matter from "matter-js";

const Ball = (props) => {
  const widthBody = 10;
  const heightBody = 10;

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
        color: color,
      }}
    />
  );
};

export default Ball;
