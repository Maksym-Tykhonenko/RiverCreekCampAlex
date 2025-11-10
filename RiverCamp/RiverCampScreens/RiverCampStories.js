import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { rivercampstories } from '../RiverCampData/rivercampstories';
import RiverCampStoryCard from '../RiverCampComponents/RiverCampStoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../RiverCampStore/riverCampContext';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import RiverCampModal from '../RiverCampComponents/RiverCampModal';
import RiverCampLayout from '../RiverCampComponents/RiverCampLayout';

const { height } = Dimensions.get('window');

const RiverCampStories = () => {
  const { setIsOnRiverCampNotification, setIsOnStoriesBgMusic } = useStore();
  const [isModalVisible, setIsModalVisible] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadSerenityBloomSettings();
    }, []),
  );

  const loadSerenityBloomSettings = async () => {
    try {
      const musicValue = await AsyncStorage.getItem('rivercamp_music');
      setIsOnStoriesBgMusic(JSON.parse(musicValue));

      const notifValue = await AsyncStorage.getItem('rivercamp_notifications');
      if (notifValue !== null)
        setIsOnRiverCampNotification(JSON.parse(notifValue));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <RiverCampLayout>
      <View
        style={[
          styles.rivercampcnt,
          isModalVisible &&
            Platform.OS === 'android' && { filter: 'blur(2px)' },
        ]}
      >
        {rivercampstories.map((story, index) => (
          <RiverCampStoryCard key={index} article={story} meditations />
        ))}
      </View>

      <RiverCampModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        riverCampModalImg={require('../../assets/images/rivercampmod2.png')}
        modalTxt="Discover the tales whispered by the fire. Each story hides a different kind of fear."
      />
    </RiverCampLayout>
  );
};

const styles = StyleSheet.create({
  rivercampcnt: {
    paddingTop: height * 0.09,
    padding: 16,
    paddingBottom: 110,
  },
});

export default RiverCampStories;
