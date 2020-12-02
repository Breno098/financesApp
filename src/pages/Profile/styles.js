import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #131313;
    align-items: center;
`;

export const Name = styled.Text`
    text-align: center;
    font-size: 28px;
    margin: 25px 0;
    color: #FFF
`;

export const NewLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background: #00b94a;
    width: 90%;
    height: 45px;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const NewTex = styled.Text`
    font-size: 18px;
    color: #FFF;
    font-weight: bold;
`;

export const Logout = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    background: #c62c36;
    width: 90%;
    height: 45px;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const LogoutText = styled.Text`
    font-size: 18px;
    color: #FFF;
    font-weight: bold;  
`;
