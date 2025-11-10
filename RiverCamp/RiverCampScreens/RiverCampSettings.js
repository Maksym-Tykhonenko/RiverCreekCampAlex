import Toast from 'react-native-toast-message';
import {
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from '../RiverCampStore/riverCampContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { BlurView } from '@react-native-community/blur';

import RiverCampLayout from '../RiverCampComponents/RiverCampLayout';

const RiverCampSettings = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {
    isOnRiverCampNotification,
    setIsOnRiverCampNotification,
    setRiverCampSavedList,
    isOnStoriesBgMusic,
    setIsOnStoriesBgMusic,
  } = useStore();

  const toggleStoriesBgMusic = async value => {
    if (isOnRiverCampNotification) {
      Toast.show({
        text1: !isOnStoriesBgMusic ? 'Music turned on!' : 'Music turned off!',
      });
    }
    try {
      await AsyncStorage.setItem('rivercamp_music', JSON.stringify(value));
      setIsOnStoriesBgMusic(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const toggleRiverCampNotifications = async value => {
    Toast.show({
      text1: !isOnRiverCampNotification
        ? 'Notifications turned on!'
        : 'Notifications turned off!',
    });

    try {
      await AsyncStorage.setItem(
        'rivercamp_notifications',
        JSON.stringify(value),
      );
      setIsOnRiverCampNotification(value);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const deleteRiverCampFavorites = async () => {
    try {
      await AsyncStorage.removeItem('river_camp_saved_stories');
      setRiverCampSavedList([]);
      setIsVisibleModal(false);
      if (isOnRiverCampNotification) {
        Toast.show({
          text1: 'All favorites have been cleared!',
        });
      }
    } catch (err) {
      console.log('Failed', err);
    }
  };

  return (
    <RiverCampLayout>
      <View
        style={[
          styles.rivercampcnt,
          Platform.OS === 'android' &&
            isVisibleModal && { filter: 'blur(2px)' },
        ]}
      >
        <View style={styles.rivercampwelccont}>
          <View>
            {Platform.OS === 'ios' && (
              <View style={styles.rivercampcntwrp}>
                <Text style={styles.rivercampwelcsubtitle}>Music</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => toggleStoriesBgMusic(!isOnStoriesBgMusic)}
                  style={{ right: 2 }}
                >
                  {isOnStoriesBgMusic ? (
                    <Image
                      source={require('../../assets/images/rivercampmuson.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/rivercampmusoff.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.rivercampcntwrp}>
              <Text style={styles.rivercampwelcsubtitle}>Notifications</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  toggleRiverCampNotifications(!isOnRiverCampNotification)
                }
              >
                {isOnRiverCampNotification ? (
                  <Image
                    source={require('../../assets/images/rivercampnoton.png')}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/rivercampnotoff.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.rivercampcntwrp}>
              <Text style={styles.rivercampwelcsubtitle}>Clear Favorites</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsVisibleModal(true)}
              >
                <Image
                  source={require('../../assets/images/rivercampdel.png')}
                />
              </TouchableOpacity>
            </View>
            {Platform.OS === 'ios' && (
              <View style={styles.rivercampcntwrp}>
                <Text style={styles.rivercampwelcsubtitle}>Share App</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    Linking.openURL(
                      'https://apps.apple.com/us/app/10-nights-at-river-creek-camp/id6754833392',
                    )
                  }
                >
                  <Image
                    source={require('../../assets/images/rivercampshareapp.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibleModal}
        >
          {Platform.OS === 'ios' && (
            <BlurView
              style={styles.rivercampblur}
              blurType="dark"
              blurAmount={4}
            />
          )}
          <View style={styles.rivercampwrapper}>
            <View style={[styles.rivercampwelccont, { paddingBottom: 15 }]}>
              <View
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}
              >
                <Text style={[styles.rivercampwelctitle, { marginBottom: 15 }]}>
                  Do you wish to silence your favorite stories? Their echoes
                  will fade forever.
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    deleteRiverCampFavorites();
                  }}
                >
                  <ImageBackground
                    source={require('../../assets/images/rivercamponbbtnno.png')}
                    style={styles.rivercampmodalbtn}
                  >
                    <Text style={styles.rivercampbtntext}>Yes</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsVisibleModal(false)}
                >
                  <ImageBackground
                    source={require('../../assets/images/rivercamponbbtnyes.png')}
                    style={styles.rivercampmodalbtn}
                  >
                    <Text style={styles.rivercampbtntext}>No</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </RiverCampLayout>
  );
};

const styles = StyleSheet.create({
  rivercampcnt: {
    paddingBottom: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  rivercampcntwrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 23,
  },
  rivercampwelccont: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#1A1A1ACC',
    borderRadius: 22,
    padding: 27,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: '#C49D30',
  },
  rivercampbtntext: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
  },
  rivercampwelctitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  rivercampwelcsubtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Sansation-Regular',
    textAlign: 'center',
  },
  rivercampblur: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  rivercampmodalbtn: {
    width: 89,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rivercampwrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default RiverCampSettings;
