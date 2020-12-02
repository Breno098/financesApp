import React, { useContext, useState, useEffect } from 'react';
import { Alert, TouchableOpacity, Plataform } from 'react-native';

import firebase from '../../services/firebaseConnection';
import { format, isBefore } from 'date-fns';

import Header from '../../components/Header';
import HistoricList from '../../components/HistoricList';
import DatePicker from '../../components/DatePicker';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Background, Container, Name, Balance, Title, List, Area } from  './styles';

import { AuthContext } from '../../contexts/auth'

export default function Home() {
  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  const [newDate, setNewDate] = useState(new Date());

  const [historic, setHistoric] = useState([]);
  const [balance, setBalance] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setBalance(snapshot.val().balance)
      });

      await firebase.database()
        .ref('historic')
        .child(uid)
        .orderByChild('date')
        .equalTo(format( newDate, 'dd/MM/yyyy'))
        .limitToLast(10)
        .on('value', (snapshot) => {
          setHistoric([]);

          snapshot.forEach( childItem => {
            let list = {
              key: childItem.key,
              type: childItem.val().type,
              value: childItem.val().value,
              date: childItem.val().date
            };

            setHistoric(oldArray => [...oldArray, list].reverse())
          })
        })
    }

    loadList();
  }, [newDate])

  function handleDelete(data){

    const [ day, month, year ] = data.date.split('/');
    const dateItem = new Date(`${year}/${month}/${day}`)

    const formatToday = format(new Date(), 'dd/MM/yyyy'); 
    const [ dayToday, monthToday, yearToday ] = formatToday.split('/');
    const dateToday = new Date(`${monthToday}/${month}/${dayToday}`)

    if( isBefore(dateItem, dateToday) ){
      alert('Você não pode excluir um registo antigo');
      return;
    }

    Alert.alert(
      'Cuidado Atenção',
      `Você deseja excluir ${data.type} = ${data.value}?`,
      [{
        text: 'Cancelar',
        style: 'cancel'
      },{
        text: 'Continuar',
        onPress: () => handleDeleteSuccess(data)
      }]
    );
  }

  async function handleDeleteSuccess(data){
    await firebase.database()
      .ref('historic')
      .child(uid)
      .child(data.key)
      .remove()
      .then(async () => {
        let balanceAtual = balance;
  
        data.type === 'despesa' ? balanceAtual += parseFloat(data.value) : balanceAtual -= parseFloat(data.value);
  
        await firebase.database().ref('users').child(uid).child('balance').set(balanceAtual);
      })
      .catch( error => {
        alert(error);        
      })
  }

  function handleShowPicker(){
    setShow(true);
  }

  function handleClose(){
    setShow(false);
  }

  function onChange(date){
    setShow(Plataform.OS === 'ios');
    setNewDate(date);
  }

  return (
    <Background>
      <Header/>
      <Container>
        <Name>{ user && user.name } </Name>
        <Balance> R$ { balance.toFixed(2) } </Balance>
      </Container>

        <Area>
          <TouchableOpacity onPress={handleShowPicker}>
            <Icon name="event" color="#FFF" size={30}/>
          </TouchableOpacity>
        </Area>

        <Title> Ultimas movimentações </Title>
        <List
          showsVerticalScrollIndicator={false}
          data={historic}
          keyExtractor={ item => item.key }
          renderItem={({ item }) => ( <HistoricList data={item} deleteItem={handleDelete}/> )}
        />

        { show && (
          <DatePicker
            onClose={handleClose}
            date={newDate}
            onChange={onChange}
          />
        )}
    </Background>
  );
}