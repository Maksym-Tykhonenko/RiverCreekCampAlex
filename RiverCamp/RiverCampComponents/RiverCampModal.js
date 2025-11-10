import { BlurView } from '@react-native-community/blur';
import {
  Image,
  ImageBackground,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const RiverCampModal = ({
  isModalVisible,
  modalTxt,
  onClose,
  riverCampModalImg,
}) => {
  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {Platform.OS === 'ios' && (
        <BlurView style={styles.rivercampblur} blurType="dark" blurAmount={4} />
      )}
      <View style={styles.modalOverlay}>
        <View style={styles.rivercampmodalcont}>
          <Image
            source={riverCampModalImg}
            style={{
              position: 'absolute',
              left: -10,
              bottom: 0,
            }}
          />
          <View style={{ alignItems: 'center', width: '100%', left: 45 }}>
            <Text style={styles.rivercampmodaltxt}>{modalTxt}</Text>

            <TouchableOpacity activeOpacity={0.7} onPress={() => onClose()}>
              <ImageBackground
                source={require('../../assets/images/rivercamponbbtn.png')}
                style={{
                  width: 98,
                  height: 23,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                }}
              >
                <Text style={styles.rivercampbuttontext}>Got it</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  rivercampmodalcont: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#1A1A1ACC',
    borderRadius: 10,
    padding: 13,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '#C49D30',
    paddingTop: 50,
    alignItems: 'center',
  },
  rivercampbuttontext: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  rivercampmodaltxt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    width: '65%',
  },
  rivercampblur: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
});

export default RiverCampModal;
