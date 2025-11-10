import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ImageBackground,
  useWindowDimensions,
  Image,
  Easing,
  Platform,
} from 'react-native';
import RiverCampRandomizerCard from '../RiverCampComponents/RiverCampRandomizerCard';
import { rivercampstories } from '../RiverCampData/rivercampstories';
import RiverCampLayout from '../RiverCampComponents/RiverCampLayout';
import RiverCampModal from '../RiverCampComponents/RiverCampModal';

export default function RandomCardCarousel() {
  const { width, height } = useWindowDimensions();
  const isLandscapeMode = width > height;
  const CARD_WIDTH = Math.round(width * (isLandscapeMode ? 0.55 : 0.7));
  const SPACING = Math.round((width - CARD_WIDTH) / 2);
  const [currentRiverCardIndex, setCurrentRiverCardIndex] = useState(0);
  const [showRiverCampCarousel, setShowRiverCampCarousel] = useState(false);
  const [isRiverCardSpinning, setIsRiverCardSpinning] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const getRandomRiverCampIndex = () => {
    let randomIndex;
    do {
      const offset =
        Math.floor(Math.random() * (rivercampstories.length - 2)) + 2;
      const direction = Math.random() < 0.5 ? -1 : 1;
      randomIndex =
        (currentRiverCardIndex + direction * offset + rivercampstories.length) %
        rivercampstories.length;
    } while (randomIndex === currentRiverCardIndex);
    return randomIndex;
  };

  const spinToRiverCampCard = randomIndex => {
    if (isRiverCardSpinning) return;
    setIsRiverCardSpinning(true);

    const cycles = 2;
    const totalScroll =
      (rivercampstories.length * cycles + randomIndex) * CARD_WIDTH;

    Animated.timing(scrollX, {
      toValue: totalScroll,
      duration: 10,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setCurrentRiverCardIndex(randomIndex);
      flatListRef.current?.scrollToIndex({
        index: randomIndex,
        animated: true,
        viewPosition: 0.5,
      });

      setTimeout(() => setIsRiverCardSpinning(false), 50);
    });
  };

  const handleRandomSelect = () => {
    if (isRiverCardSpinning) return;
    const randomIndex = getRandomRiverCampIndex();

    if (!showRiverCampCarousel) {
      setShowRiverCampCarousel(true);

      setTimeout(() => spinToRiverCampCard(randomIndex), 50);
    } else {
      spinToRiverCampCard(randomIndex);
    }
  };

  return (
    <RiverCampLayout>
      <View
        style={[
          styles.rivercampcontainer,
          isModalVisible &&
            Platform.OS === 'android' && { filter: 'blur(2px)' },
        ]}
      >
        {showRiverCampCarousel ? (
          <View
            style={[
              styles.rivercampcarouselwrapper,
              { height: isLandscapeMode ? height * 0.8 : 320 },
            ]}
          >
            <Animated.FlatList
              scrollEnabled={false}
              ref={flatListRef}
              data={rivercampstories}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH}
              decelerationRate="fast"
              bounces={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true },
              )}
              scrollEventThrottle={16}
              contentContainerStyle={{
                paddingHorizontal: SPACING,
                alignItems: 'center',
              }}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 1) * CARD_WIDTH,
                  index * CARD_WIDTH,
                  (index + 1) * CARD_WIDTH,
                ];

                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.9, 1, 0.9],
                  extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.6, 1, 0.6],
                  extrapolate: 'clamp',
                });

                return (
                  <Animated.View
                    style={{
                      transform: [{ scale }],
                      opacity,
                      marginHorizontal: 10,
                    }}
                  >
                    <RiverCampRandomizerCard
                      article={item}
                      cardWidth={CARD_WIDTH - 20}
                    />
                  </Animated.View>
                );
              }}
            />
          </View>
        ) : (
          <View style={styles.rivercampwelccont}>
            <Image source={require('../../assets/images/rivercampquest.png')} />
          </View>
        )}

        <TouchableOpacity
          activeOpacity={isRiverCardSpinning ? 1 : 0.7}
          onPress={handleRandomSelect}
          disabled={isRiverCardSpinning}
        >
          <ImageBackground
            source={require('../../assets/images/rivercamponbbtnyes.png')}
            style={[
              styles.rivercampmodalbtn,
              isRiverCardSpinning && { opacity: 0.8 },
            ]}
          >
            <Text style={styles.rivercampbtntext}>Start</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <RiverCampModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        riverCampModalImg={require('../../assets/images/rivercampmod3.png')}
        modalTxt="Let fate decide which story finds you tonight. Flip the coin — and follow where it lands."
      />
    </RiverCampLayout>
  );
}

const styles = StyleSheet.create({
  rivercampcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150,
  },
  rivercampwelccont: {
    width: '60%',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#1A1A1ACC',
    borderRadius: 22,
    padding: 27,
    paddingBottom: 50,
    paddingTop: 50,
    borderWidth: 1,
    borderColor: '#C49D30',
  },
  rivercampcarouselwrapper: {
    justifyContent: 'center',
  },
  rivercampmodalbtn: {
    width: 89,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  rivercampbtntext: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '400',
  },
});
