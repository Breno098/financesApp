import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Type, IconView, TypeText, ValueText } from './styles';


export default function HistoricList({ data }) {
  return (
    <Container>
        <Type>
            <IconView type={ data.type }>
              <Icon 
                name={ data.type === 'despesa' ? "arrow-down" : "arrow-up" } 
                color="#FFF" 
                size={20}
              />
              <TypeText> 
                { data.type }  
              </TypeText>
            </IconView>
        </Type>
        <ValueText>
          R$ { data.value }
        </ValueText>
    </Container>
  );
}