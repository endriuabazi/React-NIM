import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

const GameScreen = ({ route }) => {
  const { stackItems, playerName, gameType } = route.params;
  const [selectedStack, setSelectedStack] = useState(0);
  const [selectedCount, setSelectedCount] = useState(1);
  const [updatedStackItems, setUpdatedStackItems] = useState([...stackItems]);
  const [currentPlayer, setCurrentPlayer] = useState(playerName);

  const isMoveValidRange = updatedStackItems.map((item) =>
    [...Array(item + 1).keys()].slice(1)
  );

  useEffect(() => {
    console.log(`updatedStackItems: ${updatedStackItems}`);
  }, [updatedStackItems]);

  const renderStackVisual = (stackLength) => {
    const stackVisual = new Array(stackLength).fill("🗿");
    return `[ ${stackVisual.join(" ")} ]`;
  };

  const isGameOver = () => {
    return updatedStackItems.every((item) => item === 0);
  };

  const isMoveValid = (move) => {
    const selectedStackIndex = move[0];
    const selectedCountValue = move[1];

    if (
      selectedStackIndex >= 0 &&
      selectedStackIndex < updatedStackItems.length &&
      selectedCountValue >= 1 &&
      selectedCountValue <= updatedStackItems[selectedStackIndex]
    ) {
      return true;
    }

    return false;
  };

  const getComputerMove = () => {
    const move = [0, 0];

    if (gameType === "regular") {
      let nonEmptyHeapIndex = -1;
      for (let i = 0; i < updatedStackItems.length; i++) {
        if (updatedStackItems[i] > 0) {
          nonEmptyHeapIndex = i;
          break;
        }
      }

      if (nonEmptyHeapIndex === -1) {
        // No non-empty heap found (should not happen)
        return move;
      }

      move[0] = nonEmptyHeapIndex;
      move[1] =
        Math.floor(Math.random() * updatedStackItems[nonEmptyHeapIndex]) + 1;
    } else {
      const nimSum = updatedStackItems.reduce((sum, item) => sum ^ item, 0);

      if (nimSum === 0) {
        let nonEmptyHeapIndex = -1;
        for (let i = 0; i < updatedStackItems.length; i++) {
          if (updatedStackItems[i] > 0) {
            nonEmptyHeapIndex = i;
            break;
          }
        }

        if (nonEmptyHeapIndex === -1) {
          // No non-empty heap found (should not happen)
          return move;
        }

        move[0] = nonEmptyHeapIndex;
        move[1] =
          Math.floor(Math.random() * updatedStackItems[nonEmptyHeapIndex]) + 1;
      } else {
        for (let i = 0; i < updatedStackItems.length; i++) {
          const xor = updatedStackItems[i] ^ nimSum;

          if (xor < updatedStackItems[i]) {
            move[0] = i;
            move[1] = updatedStackItems[i] - xor;
            break;
          }
        }
      }
    }

    return move;
  };

  const handleComputerMove = () => {
    if (isGameOver()) {
      alert("Game over! The player wins.");
      return;
    }

    const [selectedStackIndex, selectedCountValue] = getComputerMove();
    const newStackItems = [...updatedStackItems];
    newStackItems[selectedStackIndex] -= selectedCountValue;
    setUpdatedStackItems(newStackItems);
    setCurrentPlayer(playerName);
  };

  const handleRemoveElements = () => {
    const selectedStackItems = updatedStackItems[selectedStack];
    const selectedCountValue = parseInt(selectedCount);

    if (selectedStackItems === 0) {
      alert("The selected stack is empty. Please select a different stack.");
      return;
    }

    if (!isMoveValid([selectedStack, selectedCountValue])) {
      alert("Invalid move. Please try again.");
      return;
    }

    const newStackItems = [...updatedStackItems];
    newStackItems[selectedStack] -= selectedCountValue;
    setUpdatedStackItems(newStackItems);

    if (isGameOver()) {
      alert("Game over! The computer wins.");
      return;
    }

    setCurrentPlayer("Computer");
    setTimeout(handleComputerMove, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.stackCard}>
          <Text style={styles.title}>List of Stack Items:</Text>

          {updatedStackItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>
                <Text style={index === 0 ? styles.boldText : null}>
                  Stack {index + 1}:{" "}
                </Text>
                <Text style={styles.stackVisual}>
                  {renderStackVisual(item)}
                </Text>
              </Text>
            </View>
          ))}
          {stackItems.length === 0 && (
            <Text style={styles.emptyText}>No stack items found.</Text>
          )}
        </View>

        <View style={styles.stackCard}>
          <Text style={styles.title}>Game Details:</Text>
          <Text style={styles.title2}>Game Data: {gameType}</Text>
          <Text style={styles.title2}> Player Name: {playerName}</Text>
          <Text style={styles.title2}>
            {" "}
            Turn: {currentPlayer === playerName ? "User" : "Computer"}
          </Text>
        </View>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Stack:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedStack}
          onValueChange={(itemValue) => setSelectedStack(itemValue)}
        >
          {updatedStackItems.map((_, index) => (
            <Picker.Item
              key={index}
              label={`Stack ${index + 1}`}
              value={index}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Count:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedCount}
          onValueChange={(itemValue) => setSelectedCount(itemValue)}
        >
          {isMoveValidRange[selectedStack].map((value) => (
            <Picker.Item key={value} label={`${value}`} value={value} />
          ))}
        </Picker>
      </View>
      <Button title="Remove Elements" onPress={handleRemoveElements} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  stackCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
  },

  gameDataCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  title2: {
    fontSize: 15,
    marginBottom: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  itemContainer: {
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
    padding: 4,
  },

  picker: {
    width: "100%",
    height: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 13,
  },

  stackVisual: {
    fontSize: 24,
  },
  boldText: {
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 18,
    fontStyle: "italic",
  },
  gameData: {
    fontSize: 16,
    color: "#888",
  },
});

export default GameScreen;
