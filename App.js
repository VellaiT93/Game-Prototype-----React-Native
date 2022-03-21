import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import Animated from "react-native-reanimated";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import Physics from "./Systems/Physics";
import Combat from "./Systems/Combat";
import Camera from "./Camera";
import ControllerBoard from "./components/ControllerBoard";
import entities from "./entities";

export default function App() {
  const [engine, setEngine] = useState(null);
  const [running, setRunning] = useState(false);

  const [pauseButtonColor, setPauseColor] = useState(
    "rgba(217, 216, 214, 0.4)"
  );
  const [startButtonColor, setStartColor] = useState(
    "rgba(217, 216, 214, 0.8)"
  );

  useEffect(() => {
    setRunning(true);
  }, []);

  return (
    <Animated.View style={{ flex: 1 }}>
      <StatusBar style="auto" hidden={true} />
      <Image
        source={require("./Images/back.jpg")}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <GameEngine
        ref={(ref) => {
          setEngine(ref);
        }}
        style={styles.gameEngine}
        running={running}
        systems={[Physics, Combat]}
        entities={entities()}
        renderer={Camera}
        onEvent={(e) => {
          switch (
            e.type
            //case "Collision":
            //console.log("Collision");
          ) {
          }
        }}
      ></GameEngine>
      <View style={styles.settings}>
        <View
          onTouchStart={() => setPauseColor("rgba(217, 216, 214, 1)")}
          onTouchEnd={() => {
            setRunning(false);
            engine.stop();
            setPauseColor("rgba(217, 216, 214, 0.4)");
          }}
        >
          <FontAwesome
            name="pause"
            size={32}
            style={[styles.button, { color: pauseButtonColor }]}
          />
        </View>
      </View>
      <ControllerBoard engine={engine} />
      {!running && (
        <TouchableOpacity style={styles.fullScreenButton}>
          <View style={styles.fullScreen}>
            <Text style={styles.gameOverText}>Menu</Text>
            <View style={{ flex: 0.05 }} />
            <View
              onTouchStart={() => setStartColor("rgba(217, 216, 214, 1)")}
              onTouchEnd={() => {
                setRunning(true);
                engine.swap(entities());
                setStartColor("rgba(217, 216, 214, 0.8)");
              }}
            >
              <AntDesign
                name="caretright"
                size={32}
                style={[styles.button, { color: startButtonColor }]}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gameEngine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  settings: {
    position: "absolute",
    flexDirection: "row",
    top: 10,
    left: 20,
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },

  fullScreenButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },

  gameOverText: {
    color: "white",
    fontSize: 48,
  },

  gameOverSubText: {
    color: "white",
    fontSize: 24,
  },

  fullScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});
