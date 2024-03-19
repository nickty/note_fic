import {useEffect} from 'react';
import {Text, View, SafeAreaView, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  useEffect(() => {
    checkToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
