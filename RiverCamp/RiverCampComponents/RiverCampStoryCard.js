import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Alert,
  Image,
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from '../RiverCampStore/riverCampContext';
import { useCallback, useState } from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RiverCampStoryCard = ({ article }) => {
  const navigation = useNavigation();
  const [toggleRiverCampIcn, setToggleRiverCampIcn] = useState(false);
  const {
    saveRiverCampStory,
    getRiverCampStories,
    delRiverCampStory,
    isOnRiverCampNotification,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      renderRiverCampLoc(article);
      getRiverCampStories();
    }, []),
  );

  const toggleRiverCampSaved = selectedPlace => {
    if (isOnRiverCampNotification) {
      Toast.show({
        text1: !toggleRiverCampIcn
          ? 'Added to favorites!'
          : 'Removed from favorites',
      });
    }

    if (toggleRiverCampIcn)
      delRiverCampStory(selectedPlace), setToggleRiverCampIcn(false);
    else saveRiverCampStory(selectedPlace), setToggleRiverCampIcn(true);
  };

  const renderRiverCampLoc = async item => {
    const jsonValue = await AsyncStorage.getItem('river_camp_saved_stories');

    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.id === item.id);

      return data == null
        ? setToggleRiverCampIcn(false)
        : setToggleRiverCampIcn(true);
    }
  };

  const shareRiverCampStory = async () => {
    try {
      await Share.share({
        message: `${article.rivercamptitle}\n\n${article.rivercampshortdesc}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.rivercampcardcont}>
      <Image
        source={article.rivercampimage}
        style={{ width: 104, height: 103, borderRadius: 12 }}
      />

      <View
        style={{
          paddingHorizontal: 8,
          alignItems: 'center',
          flex: 1,
          gap: 10,
        }}
      >
        <View style={{ alignItems: 'center', width: '90%' }}>
          <Text style={styles.rivercampwelctitle}>
            {article.rivercamptitle}
          </Text>
          <Text style={styles.rivercampwelcsubtitle}>
            {article.rivercampshortdesc}
          </Text>
        </View>
        <View style={{ gap: 15, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              toggleRiverCampSaved(article);
            }}
          >
            {toggleRiverCampIcn ? (
              <Image source={require('../../assets/images/rivercampsvd.png')} />
            ) : (
              <Image source={require('../../assets/images/rivercampsv.png')} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('RiverCampArticleDetails', article);
            }}
          >
            <ImageBackground
              source={require('../../assets/images/rivercamponbbtn.png')}
              style={{
                width: 98,
                height: 23,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.rivercampbuttontext}>Open</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              shareRiverCampStory();
            }}
          >
            <Image source={require('../../assets/images/rivercampshr.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rivercampcardcont: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1A1A1ACC',
    borderRadius: 10,
    padding: 13,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '#C49D30',
    flexDirection: 'row',
  },
  rivercampbuttontext: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  rivercampwelctitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 8,
  },
  rivercampwelcsubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default RiverCampStoryCard;
