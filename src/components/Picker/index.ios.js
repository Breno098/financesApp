import React from 'react';
import { Picker as PickerSelect } from '@react-native-community/picker';
import { PickerView } from  './styles';

export default function Picker({ onChange, type }) {
    return (
        <PickerView>
            <PickerSelect 
                style={{ width: '100%' }}
                selectedValue={type}
                onValueChange={ (selectedValue) => onChange(selectedValue) }
            >
                <Picker.Item label="Receita" value="receita"/>
                <Picker.Item label="Despesa" value="despesa"/>
            </PickerSelect>
        </PickerView>
    );
}