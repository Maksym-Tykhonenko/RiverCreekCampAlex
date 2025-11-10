import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from '../RiverCampStore/riverCampContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import RiverCampLayout from '../RiverCampComponents/RiverCampLayout';

const RiverCampArticleDetails = ({ route }) => {
  const article = route.params;
  const videoRef = useRef(null);
  const { isOnStoriesBgMusic } = useStore();
  const [riverCampSound, setRiverCampSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [toggleRiverCampIcn, setToggleRiverCampIcn] = useState(false);
  const {
    saveRiverCampStory,
    getRiverCampStories,
    delRiverCampStory,
    isOnRiverCampNotification,
  } = useStore();
  const [riverCampRating, setRiverCampRating] = useState(0);

  useFocusEffect(
    useCallback(() => {
      renderRiverCampLoc(article);
      getRiverCampStories();
    }, []),
  );

  useEffect(() => {
    const loadRiverCampRating = async () => {
      try {
        const key = `rivercamprat_${article.id || article.rivercamptitle}`;
        const savedRating = await AsyncStorage.getItem(key);
        if (savedRating !== null) {
          setRiverCampRating(Number(savedRating));
        }
      } catch (e) {
        console.log('e', e);
      }
    };
    loadRiverCampRating();
  }, [article]);

  const toggleRiverCampHorr = async star => {
    setRiverCampRating(star);
    try {
      const key = `rivercamprat_${article.id || article.rivercamptitle}`;
      await AsyncStorage.setItem(key, star.toString());
    } catch (e) {
      console.log('e', e);
    }
  };

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

  useEffect(() => {
    const s = new Sound(article.rivercampsound, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('e', error);
        return;
      }
      s.setNumberOfLoops(-1);
      setRiverCampSound(s);
    });

    return () => {
      if (s) {
        s.stop(() => s.release());
      }
    };
  }, [article]);

  const toggleSound = () => {
    if (!riverCampSound) return;
    if (isPlaying) {
      riverCampSound.pause();
      setIsPlaying(false);
    } else {
      riverCampSound.play(success => {
        if (!success) console.log('e');
      });
      setIsPlaying(true);
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
    <RiverCampLayout>
      <View style={styles.rivercampcardcont}>
        <View style={{}}>
          <Text style={styles.rivercampcardtitle}>
            {article.rivercamptitle}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                toggleRiverCampSaved(article);
              }}
            >
              {toggleRiverCampIcn ? (
                <Image
                  source={require('../../assets/images/rivercampsvd.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/rivercampsv.png')}
                />
              )}
            </TouchableOpacity>
            <View style={styles.rivercampvideocont}>
              <Video
                source={article?.rivercampvid}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
                autoplay
                muted
                paused={false}
                resizeMode="cover"
                repeat
                ref={videoRef}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                shareRiverCampStory();
              }}
            >
              <Image source={require('../../assets/images/rivercampshr.png')} />
            </TouchableOpacity>
          </View>

          {isOnStoriesBgMusic && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={toggleSound}
              style={{ alignSelf: 'center', marginBottom: 6 }}
            >
              <Image
                style={{ width: 32, height: 32 }}
                source={
                  isPlaying
                    ? require('../../assets/images/rivercamppause.png')
                    : require('../../assets/images/rivercampplay.png')
                }
              />
            </TouchableOpacity>
          )}

          <View style={{ paddingHorizontal: 10 }}>
            <Text style={styles.rivercampcardsubtitle}>
              {article.rivercampdescr}
            </Text>
          </View>
        </View>

        <View style={{ gap: 20, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                onPress={() => toggleRiverCampHorr(star)}
              >
                <Image
                  source={
                    star <= riverCampRating
                      ? require('../../assets/images/rivercampinactsm.png')
                      : require('../../assets/images/rivercampactsm.png')
                  }
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </RiverCampLayout>
  );
};

const styles = StyleSheet.create({
  rivercampcardcont: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1A1A1ACC',
    borderRadius: 22,
    padding: 11,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#C49D30',
    alignSelf: 'center',
    marginTop: 80,
  },
  rivercampcardtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  rivercampcardsubtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 6,
    marginBottom: 14,
    lineHeight: 15,
  },
  rivercampvideocont: {
    width: '75%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
});

export default RiverCampArticleDetails;
