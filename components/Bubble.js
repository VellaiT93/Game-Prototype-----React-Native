import React, { useEffect, useState } from "react";
import Matter from "matter-js";
import Animated from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Images from "../Images";

const POSE = Images.Player;

const Bubble = (props) => {
  const bodyWidth = props.size.width;
  const bodyHeight = props.size.height;

  const bodyX = props.body.position.x - bodyWidth / 2;
  const bodyY = props.body.position.y - bodyHeight / 2;

  const directionValue = new Animated.Value(props.direction);

  const [pose, setPose] = useState(POSE.idle);
  const [weapon, setWeapon] = useState("sword");

  let rotation = directionValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -1],
  });

  useEffect(() => {
    props.pose === 0 ? setPose(POSE.idle) : setPose(POSE.run);

    if (props.currentWeapon === "sword") setWeapon("sword");
    if (props.currentWeapon === "pistol") setWeapon("pistol");
  }, [props.pose, props.currentWeapon]);

  return (
    <Animated.View
      style={{
        left: bodyX,
        top: bodyY,
        width: bodyWidth,
        height: bodyHeight,
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
        source={pose}
      />
      <Animated.View
        style={{
          left: 40,
          top: 5,
          width: bodyWidth / 1.5,
          height: bodyHeight / 1.5,
          position: "absolute",
        }}
      >
        <MaterialCommunityIcons
          name={weapon}
          size={40}
          style={{
            color: "rgba(217, 216, 214, 1)",
            transform: [{ scaleX: weapon === "sword" ? -1 : 1 }],
            position: "absolute",
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default (world, pos, size, direction, run, pose, currentWeapon) => {
  const bubble = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: "Bubble",
    }
  );

  const weapon = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width / 3,
    size.height / 3,
    {
      label: "Weapon",
    }
  );

  const player = Matter.Body.create({
    parts: [bubble, weapon],
    label: "Player",
    friction: 0,
    frictionAir: 0,
    density: 1,
    restitution: 0,
  });

  Matter.World.add(world, player);

  return {
    body: player,
    weapon: weapon,
    pos,
    direction,
    run,
    size,
    pose,
    currentWeapon,
    renderer: <Bubble />,
  };
};
