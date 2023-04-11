import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const heightkey = '@MyApp:heightkey';
const bmikey = '@MyApp:bmikey';

export default class App extends Component {
  state = {
    weight: '',
    height: '',
    bmi: '',
  };

  constructor(props) {
    super(props); 
    this.onLoad();
  }

  onLoad = async () => {
    try {
      const height = await AsyncStorage.getItem(heightkey);
      this.setState({ height });

      const bmi = await AsyncStorage.getItem(bmikey);
      this.setState({ bmi: bmi});

    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  }

  onSave = async () => {
    const {weight, height} = this.state;
      const bmi = "Body Mass Index is " + (weight/(height * height)* 703).toFixed(1);
     
      await AsyncStorage.setItem(bmikey, bmi);
      await AsyncStorage.setItem(heightkey, height);

     this.setState({bmi});
  }

  onChangeHeight = (height) => {
    this.setState({ height });
  }

  onChangeWeight = (weight) => {
    this.setState({ weight });
  }

  render() {
    const { bmi, height } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.toolbar}>BMI Calculator</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={this.onChangeWeight}
            placeholder="Weight in Pounds"
          />
          <TextInput
            style={styles.input}
            onChangeText={this.onChangeHeight}
            value={height}
            placeholder="Height in Inches"
          />
          <TouchableOpacity onPress={this.onSave} style={styles.button}>
            <Text style={styles.buttonText}>Compute BMI</Text>
          </TouchableOpacity>
          <Text style={styles.bmi}>{bmi}</Text>
          <Text style={styles.text}>Assessing your BMI</Text>
          <Text style={styles.text}>  Underweight: less than 18.5</Text>
          <Text style={styles.text}>  Healthy: 18.5 to 24.9</Text>
          <Text style={styles.text}>  Overweight: 25.0 to 29.9</Text>
          <Text style={styles.text}>  Overweight: 30.0 or higher</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#f4511e',
    color: '#fff',
    textAlign: 'center',
    padding: 25,
    fontSize: 20,
  },
  input: {
    backgroundColor: '#ecf0f1',
    height: 40,
    padding: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#34495e',
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff'
  },
  bmi: {
    fontSize: 28,
  },
  text: {
    fontSize: 20,
  }
});