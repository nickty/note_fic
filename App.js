import {useEffect, useState} from 'react';
import {Text, SafeAreaView, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import {requestUserPermission} from './notificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // const [token, setToken] = useState('');
  // useEffect(() => {
  //   (async () => {
  //     await requestUserPermission();
  //     await getFcmToken();
  //   })();
  // }, []);
  // console.log(token);
  // const getFcmToken = async () => {
  //   const token = await AsyncStorage.getItem('fcmToken');
  //   if (token) {
  //     setToken(token);
  //   }
  // };
  useEffect(() => {
    // Request permissions and get the token:
    checkToken();

    // Create the notification channel:
    createNotificationChannel();

    // Subscribe to incoming messages:
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

      // Trigger a local notification:
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        playSound: true,
        soundName: 'default',
      });
    });

    // Cleanup subscription on unmount:
    return unsubscribe;
  }, []);

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);
  };

  const createNotificationChannel = () => {
    PushNotification.channelExists('channel-id', exists => {
      if (!exists) {
        PushNotification.createChannel(
          {
            channelId: 'channel-id',
            channelName: 'My channel',
            channelDescription: 'A channel to categorize your notifications',
            playSound: true,
            soundName: 'default',
            importance: Importance.HIGH,
            vibrate: true,
          },
          created => console.log(`createChannel returned '${created}'`),
        );
      }
    });
  };

  return (
    <SafeAreaView>
      <Text>Hello</Text>
    </SafeAreaView>
  );
}
