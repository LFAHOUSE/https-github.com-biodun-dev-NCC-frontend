// components/Pickert.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useController } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

const Pickerr = ({ label, control, name, rules, error, ...props }) => {
  // Use useController to connect the input component to the form state and validation rules
  const {
    field: { ref, value, onChange },
  } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  });

  return (
  <View style={styles.container}>
    
      <Text style={styles.label}>{label}</Text>
    
      <Picker
        style={styles.picker}
        inputRef={ref}
        selectedValue={value}
        onValueChange={onChange}
        {...props}>
        
        <Picker.Item label="Apple" value="apple" />
        <Picker.Item label="Banana" value="banana" />
      </Picker>
      // Use
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

// Use StyleSheet to create styles
const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    color: '#333',
  },
  error: {
    fontSize: 14,
    color: '#f00',
    marginTop: 5,
  },
});

export default Pickerr;
