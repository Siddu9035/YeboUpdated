import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React from 'react';
import Cancel from '../../assets/images/cancel.svg';
import {horizontalScale, verticalScale} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';
import Call from '../../assets/images/call.svg';
import Location from '../../assets/images/location.svg';

const PickupGuardModal = props => {
  const {showModal, onCloseModel, options} = props;
  return (
    <Modal visible={showModal} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onCloseModel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', padding: 8}}
              onPress={onCloseModel}>
              <Cancel />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
                paddingRight: 20,
                paddingLeft: 10,
              }}>
              <Image
                source={require('../../assets/images/profile.png')}
                style={styles.modalImage}
              />
              {options?.isSocialMediaRequired && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '50%',
                    justifyContent: 'space-between',
                    paddingLeft: 10,
                  }}>
                  <Call />
                  <Location />
                </View>
              )}
            </View>

            <Text style={styles.modalText1}>John Doe</Text>
            <Text style={styles.modalText2}>Pickup Time - 10:13 am</Text>
            <Text style={styles.locationText}>Pickup Location</Text>
            <Text style={styles.addressText}>
              118, 80 Feet Rd, Above Bodyworks Spa, KHB Colony, 7th Block,
              Koramangala, Bengaluru, Karnataka 560095
            </Text>
            <View
              style={
                options?.isSocialMediaRequired
                  ? {flexDirection: 'row'}
                  : {width: '100%'}
              }>
              <TouchableOpacity
                style={styles.guardCheckInButton}
                onPress={options?.button_action || null}>
                <Text style={styles.guardCheckInText}>
                  {options?.button_text}
                </Text>
              </TouchableOpacity>
              {options?.isSocialMediaRequired && (
                <TouchableOpacity
                  style={{
                    ...styles.guardCheckInButton,
                    backgroundColor: 'gray',
                  }}
                  onPress={options?.button_action2 || null}>
                  <Text style={styles.guardCheckInText}>
                    {options?.button_text2}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PickupGuardModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    backgroundColor: '#FFF8F2',
    borderRadius: 10,
    // height: 230,
    width: '90%',
    alignItems: 'center',
    padding: 15,
  },
  modalImage: {
    width: horizontalScale(72),
    height: verticalScale(80),
    // marginHorizontal: 10,
  },
  modalText1: {
    alignSelf: 'flex-start',
    paddingLeft: 30,
    fontFamily: FontFamily.semiBold,
    color: 'black',
    fontSize: 16,
    marginTop: 5,
  },
  modalText2: {
    alignSelf: 'flex-start',
    paddingLeft: 30,
    fontFamily: FontFamily.regular,
    color: 'black',
    fontSize: 12,
  },
  locationText: {
    alignSelf: 'flex-start',
    paddingLeft: 30,
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: 14,
    marginVertical: 8,
  },
  addressText: {
    alignSelf: 'flex-start',
    paddingHorizontal: 30,
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: 12,
    marginTop: 5,
  },
  guardCheckInButton: {
    alignSelf: 'flex-end',
    width: horizontalScale(112),
    height: verticalScale(45),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginVertical: 15,
    marginHorizontal: 14,
    padding: 5,
  },
  guardCheckInText: {
    fontSize: 10,
    color: 'white',
    fontFamily: FontFamily.regular,
  },
});