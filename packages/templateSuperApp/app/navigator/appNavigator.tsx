import React from 'react';
import {
    NavigationContainer,
    useNavigationContainerRef
} from '@react-navigation/native';
import MainNavigator from './mainNavigator';

const AppContainer = React.memo((props) => {
    return (
        <NavigationContainer
            ref={null}
            onReady={() => { }}
            onStateChange={async () => { }}>
            <MainNavigator />
        </NavigationContainer>
    );
});



export default AppContainer;
