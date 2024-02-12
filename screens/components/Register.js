// screens/SignUp.js
import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Dimensions,
  PixelRatio,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';

const SignUp = () => {
  // Get the screen width and height
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  // Get the pixel density of the device
  const pixelRatio = PixelRatio.get();

  // Initialize the form state and methods
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Define the validation rules for the input fields
  const rules = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
      },
    },
    confirm: {
      required: 'Confirm password is required',
      validate: value =>
        value === watch('password') || 'Passwords do not match',
    },
  };

  // Define the onSubmit function to handle the form submission
  const onSubmit = data => {
    // Show a success message
    Alert.alert('Success', 'You have signed up successfully!');
    // Clear the form fields
    reset();
  };

  return (
    // Use KeyboardAvoidingView and ScrollView to avoid keyboard overlap
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.content}>
        // Use ImageBackground to render the background image
        <ImageBackground
          source={require('../assets/background.jpg')}
          style={styles.image}
          resizeMode="cover">
          // Use Text to render the app title
          <Text style={styles.title}>Sign Up</Text>
          // Use Input to render the input fields
          <Input
            label="Email"
            control={control}
            name="email"
            rules={rules.email}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            control={control}
            name="password"
            rules={rules.password}
            error={errors.password}
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            control={control}
            name="confirm"
            rules={rules.confirm}
            error={errors.confirm}
            secureTextEntry
          />
          // Use TouchableOpacity and Text to render the sign up button
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Use StyleSheet to create responsive styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18 / PixelRatio.getFontScale(),
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SignUp;
