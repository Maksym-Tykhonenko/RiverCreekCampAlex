import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import RiverCampStoryCard from '../RiverCampComponents/RiverCampStoryCard';
import { useStore } from '../RiverCampStore/riverCampContext';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import RiverCampLayout from '../RiverCampComponents/RiverCampLayout';

const { height } = Dimensions.get('window');

const RiverCampSaved = () => {
  const { getRiverCampStories, riverCampSavedList } = useStore();

  useFocusEffect(
    useCallback(() => {
      getRiverCampStories();
    }, []),
  );

  return (
    <RiverCampLayout>
      <View style={styles.rivercampcnt}>
        {riverCampSavedList.length === 0 ? (
          <>
            <Text
              style={styles.emptyscreentxt}
            >{`No stories have chosen you yet. Sit by the fire — and find the first one to keep.`}</Text>
            <Image
              source={require('../../assets/images/rivercampempt.png')}
              style={{ alignSelf: 'center', marginTop: 20 }}
            />
          </>
        ) : (
          riverCampSavedList.map((story, index) => (
            <RiverCampStoryCard key={index} article={story} meditations />
          ))
        )}
      </View>
    </RiverCampLayout>
  );
};

const styles = StyleSheet.create({
  rivercampcnt: {
    paddingTop: height * 0.09,
    padding: 16,
    paddingBottom: 110,
  },
  emptyscreentxt: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 70,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 50,
  },
});

export default RiverCampSaved;
