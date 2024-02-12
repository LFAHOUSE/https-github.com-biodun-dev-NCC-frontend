// components/Input.js
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useController } from 'react-hook-form';

const Input = ({ logo,label, control, name, rules, error, ...props }) => {
  // Use useController to connect the input component to the form state and validation rules
  const {
    field: { ref, value, onChange, onBlur },
  } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  });

  return (
    // Use View to wrap the input field and the error message
    <View style={styles.container}>
      // Use Text to render the label
      <Text style={styles.label}>{label}</Text>
      // Use TextInput to render the input field
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        {...props}
        ref={ref}
      />
      // Use Text to render the error message
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
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
  },
  error: {
    fontSize: 14,
    color: '#f00',
    marginTop: 5,
  },
});

export default Input;
