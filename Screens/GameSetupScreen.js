import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const GameSetupScreen = ({ navigation }) => {
  const [playerName, setPlayerName] = useState("");
  const [numberOfStacks, setNumberOfStacks] = useState("3");
  const [gameType, setGameType] = useState("regular");
  const [stacksError, setStacksError] = useState(null);

  const handleStartGame = () => {
    if (playerName.trim() === "") {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    const parsedNumberOfStacks = parseInt(numberOfStacks);
    if (
      isNaN(parsedNumberOfStacks) ||
      parsedNumberOfStacks < 3 ||
      parsedNumberOfStacks > 7
    ) {
      setStacksError("Please enter a valid number of stacks (3-7)");
      return;
    }

    if (gameType !== "misere" && gameType !== "regular") {
      Alert.alert("Error", "Please select a game type (misere or regular)");
      return;
    }

    navigation.navigate("SetStacks", {
      playerName,
      numberOfStacks: parsedNumberOfStacks,
      gameType,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nim Game Setup</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter your name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPlayerName}
          value={playerName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Number of stacks:</Text>
        <Picker
          style={styles.picker}
          selectedValue={numberOfStacks}
          onValueChange={(itemValue) => {
            setNumberOfStacks(itemValue);
            setStacksError(null); // Reset the error message when the value changes
          }}
        >
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
        </Picker>
        {stacksError && <Text style={styles.error}>{stacksError}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Game type:</Text>
        <Picker
          style={styles.picker}
          selectedValue={gameType}
          onValueChange={(itemValue) => setGameType(itemValue)}
        >
          <Picker.Item label="Regular" value="regular" />
          <Picker.Item label="Misere" value="misere" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStartGame}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  picker: {
    width: "100%",
    height: 40,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default GameSetupScreen;
