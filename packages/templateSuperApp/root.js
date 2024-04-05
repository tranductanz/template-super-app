import { AppRegistry, Platform } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

import React from 'react';
import { useEffect } from 'react';

const ModulesApp = [
    {
        moduleName: 'SUPERLOYALTY',
        featureName: 'CultureMWG',
    },
];

const templateSuperApp = () => {
    // useEffect(() => {
    //     initRepack();
    // }, []);
    // initRepack = () => {
    //     const repack = new RepackMWG({
    //         // URL FOR DEV OR PROD
    //         urlRemote: `https://erpapp.tgdd.vn/mwg-app-microapp-service/api/micro/main/version/latest`,
    //         infoApp: {
    //             appName: 'LOYALTY',
    //             platform: 'IOS',
    //             versionApp: '1.0.0',
    //             environment: 'PROD',
    //             idToken: '15ed391e-1390-4b68-9ad7-57552f385fc4',
    //             deviceToken: '',
    //         },
    //         localPort: 9000,
    //         modules: ModulesApp,
    //         isDev: !__DEV__,
    //         cache: !__DEV__,
    //     });
    //     // repack.setStorage();
    //     repack.initScriptManager();
    // };
    return <App />;
};

export default templateSuperApp;

AppRegistry.registerComponent(appName, () => templateSuperApp);