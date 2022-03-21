import React, { useState } from "react";
import Matter from "matter-js";
import Animated from "react-native-reanimated";
import Images from "../Images";

const Zombie = (props) => {
  const bodyWidth = props.size.width;
  const bodyHeight = props.size.height;

  const bodyX = props.body.position.x - bodyWidth / 2;
  const bodyY = props.body.position.y - bodyHeight / 2;

  const [anim, setAnim] = useState(Images.Zombie[0].idle);

  const animatedValue = new Animated.Value(props.direction);

  let rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -1],
  });

  return (
    <Animated.View
      style={{
        left: bodyX,
        top: bodyY,
        width: bodyWidth,
        height: bodyHeight,
        position: "absolute",
        transform: [{ scaleX: rotation }],
      }}
    >
      <Animated.Image
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        resizeMode="contain"
        source={anim}
      />
    </Animated.View>
  );
};

export default (world, pos, size, direction) => {
  const zombie = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: "Zombie",
      density: 1,
    }
  );

  Matter.World.add(world, zombie);

  return {
    body: zombie,
    pos,
    size,
    direction,
    renderer: <Zombie />,
  };
};
