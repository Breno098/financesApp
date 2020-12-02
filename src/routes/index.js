import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { View, ActivityIndicator} from 'react-native';

function Routes(){
    const { signed, loading } = useContext(AuthContext);

    if(loading){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator size="large" color="#131313"/>
            </View>
        )
    }

    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;