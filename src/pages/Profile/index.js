import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

import { AuthContext } from '../../contexts/auth';

import { Container, Name, NewLink, NewTex, Logout, LogoutText } from  './styles';

export default function Profile() {

  const navigator = useNavigation();

  const { user, signOut } = useContext(AuthContext);

  return (
    <Container>
      <Header/>
      <Name>
        { user && user.name }
      </Name>

      <NewLink onPress={() => navigator.navigate('Registrar')}>
        <NewTex>
          Registrar gastos
        </NewTex>
      </NewLink>

      <Logout onPress={() => signOut()}>
        <LogoutText>
          Sair
        </LogoutText>
      </Logout>
    </Container>
  );
}