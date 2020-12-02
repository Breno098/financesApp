import React, { useState, useContext} from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'
import { Background, Input, SubmitButton, SubmitText } from  './styles';

import { AuthContext } from '../../contexts/auth';

import Picker from '../../components/Picker';
import Header from '../../components/Header';

import firebase from '../../services/firebaseConnection';

export default function New() {

  const navigation = useNavigation();
  const { user: userContext } = useContext(AuthContext)
  const [value, setValue] = useState('');
  const [type, setType] = useState('receita');

  function handleSubmit(){
    Keyboard.dismiss();

    if(isNaN(parseFloat(value)) || type === null){
      alert('Preencha todos os campos');
      return;
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo ${type} - Valor ${parseFloat(value).toFixed(2)}`,
      [{
          text: 'Cancelar',
          style: 'cancel'
        }, {
          text: 'Continuar',
          onPress: () => handleAdd()
      }]
    );

  }

  async function handleAdd(){
    let uid = userContext.uid;

    let key = await firebase.database().ref('historic').child(uid).push().key;
    await firebase.database().ref('historic').child(uid).child(key).set({
      type: type,
      value: parseFloat(value).toFixed(2),
      date: format(new Date(), 'dd/MM/yyyy')
    })

    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then(snapshot => {
      let balance = parseFloat( snapshot.val().balance )

      type === 'despesa' ? balance -= parseFloat(value) : balance += parseFloat(value);

      user.child('balance').set(balance);
    })
    
    Keyboard.dismiss();
    setValue('');
    navigation.navigate('Home');

  }

  return (
    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
      <Background>
        <Header/>

        <SafeAreaView style={{ alignItems: 'center' }}>

        <Input
          placeholder="Valor desejado"
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={ () => Keyboard.dismiss() }
          value={value}
          onChangeText={ (text) => setValue(text) }
        />

        <Picker onChange={setType} type={type}/>

        <SubmitButton onPress={ handleSubmit }>
          <SubmitText> Registrar </SubmitText>
        </SubmitButton>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}