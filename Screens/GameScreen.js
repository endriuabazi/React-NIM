import React, { useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';

const GameScreen = ({ route }) => {
  const { stackItems, playerName, gameType } = route.params;

  const handleAddItem = (stackIndex, itemValue) => {
    // Update the stack items
  };

  useEffect(() => {
    console.log('🗿🗿', stackItems);
    stackItems.forEach((item, index) => {
      console.log(`Stack ${index + 1}: ${item}`);
    });
  }, []);

  const renderStackVisual = (stackLength) => {
    const stackVisual = new Array(stackLength).fill('|');
    return `[ ${stackVisual.join(' ')} ]`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Stack Items:</Text>
      {stackItems.map((item, index) => (
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
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
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
