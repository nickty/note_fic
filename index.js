/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import bgMessaging from './bgMessaging';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async message => {
  console.log('message', message);
});

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask(
//   'RNFirebaseBackgroundMessage',
//   () => bgMessaging,
// );
