import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

//request permission for notification
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log('auth status', authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
};

export const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');

  if (!fcmToken) {
    try {
      const token = await messaging().getToken();
      // console.log(token);
      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
      }
    } catch (error) {
      console.log('Can not get fcm token', +error);
    }
  }
};
