import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const RiverCampOnboarding = () => {
  const [riverCampCurrIndex, setRiverCampCurrIndex] = useState(0);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const titles = [
    Platform.OS === 'ios'
      ? 'Welcome to River Creek Camp'
      : 'Welcome to 888 Nights at River Camp',
    'Read the Tales, Feel the Fear',
    'Meet the Fear Statue',
    'Your Campfire Awaits',
  ];

  const subtitles = [
    'Ten nights. Ten stories whispered by the fire. Each one dares you to listen till the end.',
    'Watch the short intro videos, play the ambient sound, and let the stories pull you into the dark.',
    'After each story, rate how scared you felt. The statue will awaken with every fear you face.',
    'Turn on your lantern, pick a story — or let the night choose one for you.',
  ];

  const images = [
    require('../../assets/images/rivercamponb1.png'),
    require('../../assets/images/rivercamponb2.png'),
    require('../../assets/images/rivercamponb3.png'),
    require('../../assets/images/rivercamponb4.png'),
  ];

  const buttonText = riverCampCurrIndex === 3 ? 'Begin' : 'Next';

  return (
    <ImageBackground
      source={require('../../assets/images/rivercampbg.png')}
      style={styles.rivercampback}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.innerContainer}>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.rivercampwelcometitle,
                !isTablet && { fontSize: 26, marginBottom: 25 },
              ]}
            >
              {titles[riverCampCurrIndex]}
            </Text>

            <Text
              style={[
                styles.rivercampwelcomesubtitle,
                !isTablet && { fontSize: 22, paddingHorizontal: 40 },
              ]}
            >
              {subtitles[riverCampCurrIndex]}
            </Text>
          </View>

          <Image
            source={images[riverCampCurrIndex]}
            style={[
              styles.image,
              { height: height * 0.4 },
              isTablet && { height: height * 0.9 },
            ]}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (riverCampCurrIndex < 3) {
                setRiverCampCurrIndex(riverCampCurrIndex + 1);
              } else {
                navigation.replace('RiverCampTabNav');
              }
            }}
          >
            <ImageBackground
              source={require('../../assets/images/rivercamponbbtn.png')}
              style={[
                styles.button,
                !isTablet && { width: 140, height: 38, marginTop: 40 },
              ]}
              resizeMode="stretch"
            >
              <Text
                style={[
                  styles.rivercampbuttontext,
                  !isTablet && { fontSize: 16 },
                ]}
              >
                {buttonText}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rivercampback: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  innerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#001436',
    borderRadius: 12,
    paddingVertical: 40,
    paddingTop: height * 0.12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  rivercampwelcometitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    width: '90%',
  },
  rivercampwelcomesubtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    fontStyle: 'italic',
    width: '90%',
  },
  image: {
    borderRadius: 16,
    width: '100%',
  },
  button: {
    width: 98,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  rivercampbuttontext: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default RiverCampOnboarding;
