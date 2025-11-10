import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import RiverCampModal from '../RiverCampComponents/RiverCampModal';
import RiverCampLayout from '../RiverCampComponents/RiverCampLayout';

const { height } = Dimensions.get('window');

const RiverCampFearmetr = () => {
  const [averageRiverCampRating, setAverageRiverCampRating] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadRiverCampRatings = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          const ratingKeys = keys.filter(k => k.startsWith('rivercamprat_'));
          if (ratingKeys.length === 0) {
            setAverageRiverCampRating(null);
            return;
          }

          const values = await AsyncStorage.multiGet(ratingKeys);
          const ratings = values
            .map(([_, v]) => Number(v))
            .filter(v => !isNaN(v));

          if (ratings.length === 0) {
            setAverageRiverCampRating(null);
            return;
          }

          const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
          setAverageRiverCampRating(avg);
        } catch (e) {
          console.log('Error loading river camp ratings', e);
        }
      };

      loadRiverCampRatings();
    }, []),
  );

  const getRatingResult = () => {
    if (averageRiverCampRating === null) {
      return {
        rivercampimg: require('../../assets/images/rivercampdef.png'),
        rivercamptxt:
          'The forest is silent. The statue still sleeps beneath the moss.',
      };
    } else if (averageRiverCampRating >= 1 && averageRiverCampRating < 2) {
      return {
        rivercampimg: require('../../assets/images/rivercamprat1.png'),
        rivercamptxt:
          'A faint whisper runs through the stone. The air feels heavier… it’s beginning to wake.',
      };
    } else if (averageRiverCampRating >= 2 && averageRiverCampRating < 3) {
      return {
        rivercampimg: require('../../assets/images/rivercamprat2.png'),
        rivercamptxt:
          'Cracks form across the surface. The guardian feels your unease.',
      };
    } else if (averageRiverCampRating >= 3 && averageRiverCampRating < 4) {
      return {
        rivercampimg: require('../../assets/images/rivercamprat3.png'),
        rivercamptxt:
          'The forest stirs — shadows move. Fear feeds the stone, and it remembers.',
      };
    } else if (averageRiverCampRating >= 4 && averageRiverCampRating <= 5) {
      return {
        rivercampimg: require('../../assets/images/rivercamprat4.png'),
        rivercamptxt:
          'The curse has awakened. The statue screams without a sound.',
      };
    }
  };

  const { rivercampimg, rivercamptxt } = getRatingResult();

  return (
    <RiverCampLayout>
      <View
        style={[
          styles.rivercampcnt,
          isModalVisible &&
            Platform.OS === 'android' && { filter: 'blur(2px)' },
        ]}
      >
        <Text style={styles.emptyscreentxt}>{rivercamptxt}</Text>
        <Image
          source={rivercampimg}
          style={{ width: '100%', height: height * 0.6, borderRadius: 12 }}
        />
      </View>

      <RiverCampModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        riverCampModalImg={require('../../assets/images/rivercampmod1.png')}
        modalTxt="Let fate decide which story finds you tonight. Flip the coin — and follow where it lands."
      />
    </RiverCampLayout>
  );
};

const styles = StyleSheet.create({
  rivercampcnt: {
    paddingTop: height * 0.09,
    padding: 16,
    paddingBottom: 110,
    alignItems: 'center',
  },
  emptyscreentxt: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
    marginBottom: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: '#3A7D9A',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default RiverCampFearmetr;
