import React from 'react';
import { Linking, StyleSheet, Text, Keyboard, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {};
export default class App extends React.Component<Props> {

  constructor(props){
    super(props)
    this.state = {altura:0, massa:0, result:0, resultText:""}
    this.calc = this.calc.bind(this)
  }

    calc(){

      let imc = this.state.massa/ (this.state.altura * this.state.altura)

      let s = this.state

      if(imc > 0){
        s.result = imc
      }
      else {
        s.result = 55/ (1.7 * 1.7)
      }

      if(s.result < 16){
        s.resultText = "Magreza Grave"
      }
      else if (s.result < 17) {
        s.resultText = "Magreza Moderada"
      }
      else if (s.result < 18.5) {
        s.resultText = "Magreza Leve"
      }
      else if (s.result < 25) {
        s.resultText = "Saudável"
      }
      else if (s.result < 30) {
        s.resultText = "Sobrepeso"
      }
      else if (s.result < 35) {
        s.resultText = "Obesidade Grau I"
      }
      else if (s.result < 40) {
        s.resultText = "Obesidade Grau II"
      }
      else if (s.result > 40) {
        s.resultText = "Obesidade Grau III"
      }
      else {
        s.resultText = " "
      }

      this.setState(s)

      Keyboard.dismiss()

    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.entries}>
          <Text style={styles.text1}>Massa: </Text>
            <TextInput  placeholder="55" keyboardType="numeric" style={styles.input} onChangeText={(massa)=>{this.setState({massa})}} />
          <Text style={styles.text2}>Altura: </Text>
            <TextInput placeholder="1.7" keyboardType="numeric" style={styles.input} onChangeText={(altura)=>{this.setState({altura})}} />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.calc}><Text style={styles.buttonText}>Calcular</Text></TouchableOpacity>
        <Text style={styles.result}>{this.state.result.toFixed(2)}</Text>
        <Text style={[styles.result, {fontSize: 35, color: 'lightblue'} ]}>{this.state.resultText}</Text>
        <Text onPress={this._handleOpenWithLinking} style={styles.text3}>Made by Firespindash {'\u00A9'} Copyright 2019</Text>
      </View>
    );
  }
  _handleOpenWithLinking = () => {
    Linking.openURL('https://github.com/Firespindash/imc-calculator');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    backgroundColor: '#f5fcff',
  },
  entries: {
    flexDirection: 'column',
  },
  text1: {
    fontSize: 30,
    padding: 0,
    paddingLeft: 25,
    margin: 0,
    marginTop: 20
  },
  text2: {
    fontSize: 30,
    paddingLeft: 25
  },
  text3: {
    alignSelf: 'center',
    fontSize: 15,
    padding: 10,
  },
  input: {
    height: 70,
    width: '80%',
    alignSelf: 'center',
    fontSize: 50,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#ddd',
    color: 'gray',
  },
  button: {

  },
  buttonText: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#9933b5',
    fontSize: 25,
    color: '#4a0080',
    fontWeight: 'bold',
  },
  result: {
    alignSelf: 'center',
    color: 'lightgray',
    fontSize: 65,
    padding: 15,
  },
});
