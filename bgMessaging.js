// bgMessaging.js
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export default async message => {
  // Handle background message
  return Promise.resolve();
};
