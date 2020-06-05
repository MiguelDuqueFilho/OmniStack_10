import React from 'react';
import { WebView } from 'react-native-webview';
import { TextInput } from 'react-native-gesture-handler';
import { stopLocationUpdatesAsync } from 'expo-location';

function  Profile({ navigation }) {
  const githubUsername = navigation.getParam('github_username');

  return (
      <WebView style={{ flex: 1}} source={{uri: `https://github.com/${githubUsername}`}}/>
    );
}

export default Profile;
