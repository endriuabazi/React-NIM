import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const StackDisplay = ({ numberOfStacks, handleStartGame }) => {
  const [stackItems, setStackItems] = useState([]);

  const handleAddItem = (stackIndex, itemValue) => {
    setStackItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[stackIndex] = itemValue;
      return updatedItems;
    });
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: numberOfStacks }, (_, stackIndex) => (
  <View key={stackIndex.toString()} style={styles.stackContainer}>
          <Text style={styles.stackLabel}>Stack {stackIndex + 1}:</Text>
          <TextInput
            style={styles.stackInput}
            placeholder="Enter stack items..."
            keyboardType="numeric"
            onChangeText={(text) => handleAddItem(stackIndex, text)}
            value={stackItems[stackIndex] || ''}
          />
          {stackItems[stackIndex] && (
            <Text style={styles.stackItems}>Items: {stackItems[stackIndex]}</Text>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleStartGame}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  stackContainer: {
    marginBottom: 20,
  },
  stackLabel: {
    fontSize: 18,
    marginBottom: 10,
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
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StackDisplay;
