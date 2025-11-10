import React from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';

const Rivercamploader = () => {
  const riverCampLoader = `  
  <html>
      <head>
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }

          .windows-loading-spinner {
            box-sizing: border-box;
            width: 3rem;
            height: 3rem;
            padding: 2px;
            overflow: visible;
          }

          .windows-loading-spinner > circle {
            stroke: #ffffff;
            fill: none;
            stroke-width: 2px;
            stroke-linecap: round;
            transform-origin: 50% 50%;
            transition: all 0.2s ease-in-out 0s;
            animation: 2s linear 0s infinite normal none running loading-spinner;
          }

          @keyframes loading-spinner {
            0% {
              stroke-dasharray: 0.01px, 43.97px;
              transform: rotate(0);
            }

            50% {
              stroke-dasharray: 21.99px, 21.99px;
              transform: rotate(450deg);
            }

            100% {
              stroke-dasharray: 0.01px, 43.97px;
              transform: rotate(1080deg);
            }
          }
        </style>
      </head>
      <body>
        <svg class="windows-loading-spinner" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="7"></circle>
        </svg>
      </body>
    </html>
  `;

  return (
    <ImageBackground
      source={require('../../assets/images/rivercampbg.png')}
      style={{ flex: 1, width: '100%' }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loadercnt}>
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../../assets/images/rivercampldr.png')}
              style={{ bottom: 45 }}
            />
          ) : (
            <Image
              source={require('../../assets/images/icon.png')}
              style={{ bottom: 45, width: 220, height: 220, borderRadius: 22 }}
            />
          )}
        </View>

        <View style={styles.loaderwrap}>
          <WebView
            originWhitelist={['*']}
            source={{ html: riverCampLoader }}
            style={{ width: 220, height: 100, backgroundColor: 'transparent' }}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loadercnt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 570,
  },
  loaderwrap: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default Rivercamploader;
