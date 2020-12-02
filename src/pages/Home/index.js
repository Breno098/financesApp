import React, { useContext, useState, useEffect } from 'react';

import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

import Header from '../../components/Header';
import HistoricList from '../../components/HistoricList';

import { Background, Container, Name, Balance, Title, List } from  './styles';

import { AuthContext } from '../../contexts/auth'

export default function Home() {
  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  const [historic, setHistoric] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setBalance(snapshot.val().balance)
      });

      await firebase.database()
        .ref('historic')
        .child(uid)
        .orderByChild('date')
        .equalTo(format( new Date, 'dd/MM/yy'))
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
  }, [])

  return (
    <Background>
      <Header/>
      <Container>
        <Name>{ user && user.name } </Name>
        <Balance> R$ { balance.toFixed(2) } </Balance>
      </Container>
        <Title> Ultimas movimentações </Title>
        <List
          showsVerticalScrollIndicator={false}
          data={historic}
          keyExtractor={ item => item.key }
          renderItem={({ item }) => ( <HistoricList data={item}/> )}
        />
    </Background>
  );
}