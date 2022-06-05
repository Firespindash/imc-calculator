import React from 'react';
import { Linking, StyleSheet, Text, Keyboard, TextInput, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { I18nManager } from 'react-native';
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

let resultSize = hp('4%');

i18n.translations = require('./translations.json');

i18n.locale = Localization.locale;

i18n.fallbacks = true;

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);

let lang = i18n.locale.substring(0, 2);

if (lang == 'de') {
	resultSize = hp('2.4%');
}

type Props = {};
export default class App extends React.Component<Props> {

  constructor(props) {
    super(props)
    this.state = {altura:0, massa:0, result:"0.00", resultText:""}
    this.calc = this.calc.bind(this)
  }

    calc() {
      let imc = this.state.massa / (this.state.altura * this.state.altura)
      let s = this.state
      let test = false
      if (imc > 0) {
        s.result = imc
      }
      else {
        s.result = 55 / (1.7 * 1.7)
        test = true
      }

      s.result = s.result.toFixed(2);

      if (s.result < 16) {
        s.resultText = i18n.t('sThin')
      }
      else if (s.result < 17) {
        s.resultText = i18n.t('mThin')
      }
      else if (s.result < 18.5) {
        s.resultText = i18n.t('under')
      }
      else if (s.result < 25) {
        s.resultText = i18n.t('healthy')
      }
      else if (s.result < 30) {
        s.resultText = i18n.t('over')
      }
      else if (s.result < 35) {
        s.resultText = i18n.t('obs')
      }
      else if (s.result < 40) {
        s.resultText = i18n.t('mObs')
      }
      else if (s.result > 40) {
        s.resultText = i18n.t('bObs')
      }
      else {
        s.resultText = " "
      }

      if (lang != 'en' && test == false) {
   		s.result = s.result.toString().replace('.', ',')
      }

      this.setState(s)
      Keyboard.dismiss()
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.entries}>
          <Text style={styles.text1}>{i18n.t('weight')}</Text>
            <TextInput  placeholder="55" keyboardType="numeric" style={styles.input} onChangeText={(massa)=>{this.setState({massa})}} />
          <Text style={styles.text2}>{i18n.t('height')}</Text>
            <TextInput placeholder="1.7" keyboardType="numeric" style={styles.input} onChangeText={(altura)=>{if(isNaN(altura)){altura = altura.replace(',', '.')} this.setState({altura})}} />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.calc}><Text style={styles.buttonText}>{i18n.t('calc')}</Text></TouchableOpacity>
        <Text style={styles.result}>{this.state.result}</Text>
        <Text style={[styles.result, {fontSize: resultSize, color: 'lightblue'} ]}>{this.state.resultText}</Text>
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
    paddingTop: hp('2.4%'),
    backgroundColor: '#f5fcff',
  },
  entries: {
    flexDirection: 'column',
  },
  text1: {
    fontSize: hp('5%'),
    padding: 0,
    paddingLeft: hp('3%'),
    margin: 0,
    marginTop: hp('1.2%')
  },
  text2: {
    fontSize: hp('5%'),
    paddingLeft: hp('3%')
  },
  text3: {
    alignSelf: 'center',
    fontSize: hp('1.2%'),
    padding: 10,
  },
  input: {
    height: hp('10%'),
    width: '80%',
    alignSelf: 'center',
    fontSize: hp('5%'),
    marginTop: hp('.5%'),
    marginBottom: hp('.5%'),
    paddingLeft: hp('1.5%'),
    backgroundColor: '#ddd',
    color: 'gray',
  },
  buttonText: {
    alignSelf: 'center',
    marginTop: hp('3%'),
    padding: 10,
    backgroundColor: '#9933b5',
    fontSize: hp('3%'),
    color: '#4a0080',
    fontWeight: 'bold',
  },
  result: {
    alignSelf: 'center',
    color: 'lightgray',
    fontSize: hp('9%'),
    padding: hp('1%'),
  },
});
