import React, { useState } from "react";
import { View, Text, Modal, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SetStacks = ({ route, navigation }) => {
  const { playerName, numberOfStacks, gameType } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [stackItems, setStackItems] = useState([]);

  const handleStartGame = () => {
    // Pass the game setup parameters and stack items to the GameScreen
    navigation.navigate('GameScreen', {
      playerName,
      numberOfStacks,
      gameType,
      stackItems,
    });
  };
  

  const handleAddItem = (stackIndex, itemValue) => {
    const numericValue = Number(itemValue);
    if (!isNaN(numericValue)) {
      setStackItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[stackIndex] = numericValue;
        return updatedItems;
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <View>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Player Name: {playerName}</Text>
            <Text>Number of Stacks: {numberOfStacks}</Text>
            <Text>Game: {gameType}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        {Array.from({ length: numberOfStacks }, (_, stackIndex) => (
          <View key={stackIndex} style={styles.stackContainer}>
            {/* ... stack label ... */}
            <TextInput
              style={styles.stackInput}
              placeholder="Enter stack items..."
              keyboardType="numeric"
              onChangeText={(text) => handleAddItem(stackIndex, text)}
              value={stackItems[stackIndex] ? String(stackItems[stackIndex]) : ''}
            />
            {showModal && stackItems[stackIndex] && (
              <Text style={styles.stackItems}>Items: {stackItems[stackIndex]}</Text>
            )}
          </View>
        ))}
    
        <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton} onPress={() => setShowModal(true)}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  container: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  stackContainer: {
    marginBottom: 20,
  },
  stackInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  stackItems: {
    marginTop: 5,
  },
  detailsButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SetStacks;
