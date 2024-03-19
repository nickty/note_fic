import {useEffect} from 'react';
import {Text, View, SafeAreaView, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

export default function App() {
  useEffect(() => {
    checkToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

      console.log('full message', remoteMessage);
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

      PushNotification.localNotification({
        channelId: 'channel-id',
        title: remoteMessage?.notification?.title,
        message: remoteMessage?.notification?.body,
        playSound: true,
        soundName: 'default',
      });

      PushNotification.createChannel(
        {
          channelId: 'channel-id', // (required)
          channelName: 'My channel', // (required)
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: remoteMessage?.notification?.title,
        message: remoteMessage?.notification?.body,
        playSound: true,
        soundName: 'default',
      });
    });

    return unsubscribe;
  }, []);

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('fcm token', fcmToken);
  };

  return (
    <SafeAreaView>
      <Text>Hello</Text>
    </SafeAreaView>
  );
}
