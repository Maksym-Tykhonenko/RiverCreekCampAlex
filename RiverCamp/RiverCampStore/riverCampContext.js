import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext(undefined);

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [isOnStoriesBgMusic, setIsOnStoriesBgMusic] = useState(false);
  const [isOnRiverCampNotification, setIsOnRiverCampNotification] =
    useState(false);
  const [riverCampSavedList, setRiverCampSavedList] = useState([]);

  const saveRiverCampStory = async selPlc => {
    try {
      const stored = await AsyncStorage.getItem('river_camp_saved_stories');
      let stories = stored !== null ? JSON.parse(stored) : [];

      const updatedStories = [...stories, selPlc];

      await AsyncStorage.setItem(
        'river_camp_saved_stories',
        JSON.stringify(updatedStories),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getRiverCampStories = async () => {
    try {
      const savedData = await AsyncStorage.getItem('river_camp_saved_stories');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setRiverCampSavedList(parsed);
      }
    } catch (error) {
      console.log('Failed', error);
    }
  };

  const delRiverCampStory = async selPlc => {
    const jsonValue = await AsyncStorage.getItem('river_camp_saved_stories');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selPlc.id);

    setRiverCampSavedList(filtered);
    await AsyncStorage.setItem(
      'river_camp_saved_stories',
      JSON.stringify(filtered),
    );
  };

  const value = {
    isOnStoriesBgMusic,
    setIsOnStoriesBgMusic,
    isOnRiverCampNotification,
    setIsOnRiverCampNotification,
    riverCampSavedList,
    setRiverCampSavedList,
    saveRiverCampStory,
    getRiverCampStories,
    delRiverCampStory,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
