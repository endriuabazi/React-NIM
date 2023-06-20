import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const GameScreen = ({ route }) => {
  const { stackItems, playerName, gameType } = route.params;
  const [selectedStack, setSelectedStack] = useState(0);
  const [selectedCount, setSelectedCount] = useState(1);
  const [updatedStackItems, setUpdatedStackItems] = useState([...stackItems]);


  useEffect(() => {
    console.log('🗿🗿', stackItems);
    stackItems.forEach((item, index) => {
      console.log(`Stack ${index + 1}: ${item}`);
    });
  }, []);

  

  const renderStackVisual = (stackLength) => {
    const stackVisual = new Array(stackLength).fill('🗿');
    return `[ ${stackVisual.join(' ')} ]`;
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
    console.log('eins zwei polize 🚔🚨', newStackItems);
  
    setUpdatedStackItems(newStackItems);
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
