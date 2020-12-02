import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Type, IconView, TypeText, ValueText } from './styles';


export default function HistoricList({ data, deleteItem }) {
  return (
    <TouchableWithoutFeedback onLongPress={ () => deleteItem(data) }>
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
    </TouchableWithoutFeedback>
  );
}