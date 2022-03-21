import React, { useState } from "react";
import { Dimensions, StyleSheet, View, ScrollView } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "../Constants";

const WIDTH = Dimensions.get("window").width * 0.18;
const HEIGHT = Dimensions.get("window").height * 0.14;

const ControllerBoard = ({ engine }) => {
  const weapons = [
    { key: "sword", name: "sword" },
    { key: "pistol", name: "pistol" },
  ];

  const [leftButtonColor, setLeftColor] = useState("rgba(217, 216, 214, 0.4)");
  const [rightButtonColor, setRightColor] = useState(
    "rgba(217, 216, 214, 0.4)"
  );
  const [fireButtonColor, setFireColor] = useState("rgba(112, 31, 40, 0.6)");
  const [jumpButtonColor, setJumpColor] = useState("rgba(217, 216, 214, 0.4)");

  const onWeaponChange = (weapon) => {
    //console.log(weapon.contentOffset.x);
    engine.dispatch({ type: "weapon" + weapon.contentOffset.x });
  };

  return (
    <View style={styles.controllerBoard}>
      {/*** Movement and fire */}
      <View
        onTouchStart={() => {
          engine.dispatch({ type: "move-left" });
          setLeftColor("rgba(217, 216, 214, 1)");
        }}
        onTouchEnd={() => {
          engine.dispatch({ type: "stop-left" });
          setLeftColor("rgba(217, 216, 214, 0.4)");
        }}
      >
        <Entypo
          name="arrow-with-circle-left"
          size={74}
          style={[styles.button, { color: leftButtonColor }]}
        />
      </View>
      <View style={{ flex: 0.01 }} />
      <View
        onTouchStart={() => {
          engine.dispatch({ type: "move-right" });
          setRightColor("rgba(217, 216, 214, 1)");
        }}
        onTouchEnd={() => {
          engine.dispatch({ type: "stop-right" });
          setRightColor("rgba(217, 216, 214, 0.4)");
        }}
      >
        <Entypo
          name="arrow-with-circle-right"
          size={74}
          style={[styles.button, { color: rightButtonColor }]}
        />
      </View>
      <View style={{ flex: 0.94 }} />
      <View
        onTouchStart={() => {
          engine.dispatch({ type: "fire" });
          setFireColor("rgba(112, 31, 40, 1)");
        }}
        onTouchEnd={() => setFireColor("rgba(112, 31, 40, 0.6)")}
      >
        <Entypo
          name="hair-cross"
          size={74}
          style={[styles.button, { color: fireButtonColor }]}
        />
      </View>
      <View style={{ flex: 0.02 }} />
      <View
        onTouchStart={() => {
          engine.dispatch({ type: "jump" });
          setJumpColor("rgba(217, 216, 214, 1)");
        }}
        onTouchEnd={() => setJumpColor("rgba(217, 216, 214, 0.4)")}
      >
        <Entypo
          name="arrow-with-circle-up"
          size={74}
          style={[styles.button, { color: jumpButtonColor }]}
        />
      </View>
      {/*** Weapon switcher */}
      <View style={styles.switcher}>
        <View style={{ width: WIDTH }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={({ nativeEvent }) => onWeaponChange(nativeEvent)}
          >
            {weapons.map((e, index) => (
              <View style={[styles.weapons, { alignItems: "center" }]}>
                <MaterialCommunityIcons
                  key={e.key}
                  name={e.name}
                  size={46}
                  style={{ color: "rgba(217, 216, 214, 0.8)" }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controllerBoard: {
    width: "100%",
    height: "22%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },

  switcher: {
    width: WIDTH,
    height: HEIGHT,
    position: "absolute",
    right: "3%",
    bottom: "100%",
    borderWidth: 1,
    borderColor: "rgba(51, 51, 51, 0.4)",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  weapons: {
    height: HEIGHT,
    width: WIDTH,
  },

  button: {
    marginLeft: 14,
    marginTop: 4,
    alignContent: "flex-start",
  },
});

export default ControllerBoard;
