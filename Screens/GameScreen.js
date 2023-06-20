import React, { useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';

const GameScreen = ({ route }) => {
  const { stackItems } = route.params;

  const handleAddItem = (stackIndex, itemValue) => {
    // Update the stack items
  };

  useEffect(() => {
    console.log('🗿🗿', stackItems);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Stack Items:</Text>
      {stackItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item}</Text>
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
    fontSize: 18,
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
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default GameScreen;
