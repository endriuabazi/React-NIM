import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const GameScreen = ({ route }) => {
  const { stackItems, playerName, gameType } = route.params;
  const [selectedStack, setSelectedStack] = useState(0);
  const [selectedCount, setSelectedCount] = useState(1);
  const [updatedStackItems, setUpdatedStackItems] = useState([...stackItems]);
  const [currentPlayer, setCurrentPlayer] = useState(playerName);

  useEffect(() => {
    console.log(`updatedStackItems: ${updatedStackItems}`);
  }, [updatedStackItems]);
  

  

  const renderStackVisual = (stackLength) => {
    const stackVisual = new Array(stackLength).fill('🗿');
    return `[ ${stackVisual.join(' ')} ]`;
  };

  const handleComputerMove = () => {
    // Find the Nim sum of all stack sizes
    const nimSum = updatedStackItems.reduce((acc, stackSize) => acc ^ stackSize, 0);
  
    if (nimSum === 0) {
      // If the Nim sum is 0, it means the computer is in a losing position
      // You can handle this case as desired (e.g., end the game or make a random move)
      return;
    }
  
    // Find the first stack with a stack size that, when XORed with the Nim sum, results in a smaller stack size
    const stackIndex = updatedStackItems.findIndex((stackSize) => (stackSize ^ nimSum) < stackSize);
  
    if (stackIndex === -1) {
      // If no such stack is found, make a random move
      handleRandomComputerMove();
      return;
    }
  
    // Calculate the number of items to remove from the selected stack
    const removeCount = updatedStackItems[stackIndex] - (updatedStackItems[stackIndex] ^ nimSum);
  
    const newStackItems = [...updatedStackItems];
    newStackItems[stackIndex] -= removeCount;
    setUpdatedStackItems(newStackItems);
  
    // Switch back to the user's turn
    setCurrentPlayer(playerName);
  };
  
  
  
  
  
  const handleRemoveElements = () => {
    const selectedStackItems = updatedStackItems[selectedStack];
    const selectedCountValue = parseInt(selectedCount);
  
    if (selectedStackItems === 0) {
      alert("The selected stack is empty. Please select a different stack.");
      return;
    }
  
    if (selectedCountValue > selectedStackItems) {
      alert("Selected count is greater than the number of items in the stack. Please try again.");
      return;
    }
  
    const newStackItems = [...updatedStackItems];
    newStackItems[selectedStack] -= selectedCountValue;
    setUpdatedStackItems(newStackItems);
  
    // Switch to the computer's turn
    setCurrentPlayer('Computer');
    setTimeout(handleComputerMove, 1000); // Add a delay before the computer makes its move
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Stack Items:</Text>
  
      {updatedStackItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemText}>
            <Text style={index === 0 ? styles.boldText : null}>Stack {index + 1}: </Text>
            <Text style={styles.stackVisual}>{renderStackVisual(item)}</Text>
          </Text>
        </View>
      ))}
      {stackItems.length === 0 && (
        <Text style={styles.emptyText}>No stack items found.</Text>
      )}

<View style={styles.pickerContainer}>
        <Text >Select Stack:</Text>
        <Picker
         style={styles.picker}
          selectedValue={selectedStack}
          onValueChange={(itemValue) => setSelectedStack(itemValue)}
        >
          {updatedStackItems.map((_, index) => (
            <Picker.Item key={index} label={`Stack ${index + 1}`} value={index} />
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
          {Array.from({ length: stackItems[selectedStack] }, (_, index) => (
            <Picker.Item key={index} label={`${index + 1}`} value={index + 1} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
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
    fontSize: 18,
  },
  stackVisual: {
    fontSize: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default GameScreen;
