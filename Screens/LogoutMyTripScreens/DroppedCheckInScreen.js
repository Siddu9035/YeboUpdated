import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Back from '../../assets/images/VectorBack.svg';
import Sos from '../../assets/images/sos.svg';
import Bell from '../../assets/images/bellIcon.svg';
import Clock from '../../assets/images/clock.svg';
import FontFamily from '../Styles/FontFamily';
import Call from '../../assets/images/call.svg';
import Location from '../../assets/images/location.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from '../Utils/Dimensions';
import CustomModal from '../Components/Modal';
import BottomTab from '../Components/BottomTab';
import RN from 'react-native';
import {handleCallPress, openGoogleMap} from '../Utils/ReusableFunctions';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const DroppedCheckInScreen = ({navigation, route}) => {
  const {employeeDetails} = route.params;

  const [updatedEmployeeDetail, setUpdatedEmployeeDetail] =
    useState(employeeDetails);

  const openGoogleMaps = item => {
    // console.log("🚀 ~ openGoogleMaps ~ item:", `${item?.pickUpLocation}`)
    const location = item?.dropLocation ? `${item.dropLocation}` : '';
    openGoogleMap(location);
  };

  const handleDialPress = item => {
    handleCallPress(`${item?.employeeMobile}`);
  };

  const renderItems = ({item, index}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.employeesText}>
          <View style={{flex: 0.4, alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.profileImage}
            />
            <Text style={styles.employeeName}>{item.employeeName}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginVertical: pixelSizeVertical(8),
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleDialPress(item);
                }}>
                <Call width={horizontalScale(45)} height={verticalScale(45)} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  openGoogleMaps(item);
                }}>
                <Location
                  width={horizontalScale(45)}
                  height={verticalScale(45)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 0.6}}>
            <View>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: fontPixel(14),
                  fontFamily: FontFamily.medium,
                  color: 'black',
                }}>
                {item?.dropLocationName}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: pixelSizeHorizontal(20),
          }}>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={() => {
              setShowConformationModal(true);
              setSelectedItemIndex(index);
            }}>
            <Text style={styles.checkOutText}>Break</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={() => {
              // setShowOtpModal(true);
              sendOtpForEmployeeCheckIn(item);
              setSelectedItemIndex(index);
            }}>
            <Text style={styles.checkOutText}>Check Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Back width={horizontalScale(25)} height={verticalScale(25)} />
            <Text style={styles.backbuttonText}>My Trips</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subMainHeader}>
          <TouchableOpacity style={{paddingRight: 20}}>
            <Sos width={horizontalScale(50)} height={verticalScale(50)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.bellButton}>
            <Bell width={horizontalScale(50)} height={verticalScale(50)} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <FlatList
          data={updatedEmployeeDetail}
          renderItem={renderItems}
          style={{marginTop: pixelSizeVertical(10)}}
        />
        <BottomTab activeTab="MyTrips" />
      </View>
    </View>
  );
};

export default DroppedCheckInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(102, 39, 110, 1)',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  backbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backbuttonText: {
    color: 'white',
    fontSize: fontPixel(18),
    paddingLeft: 20,
  },
  subMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bellButton: {},
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  timeAndMinutes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pixelSizeVertical(20),
    marginLeft: pixelSizeHorizontal(30),
  },
  timeText: {
    width: horizontalScale(120),
    height: verticalScale(55),
    fontSize: fontPixel(30),
    color: 'black',
    fontFamily: FontFamily.medium,
    backgroundColor: 'rgba(231, 231, 231, 1)',
    textAlign: 'center',
    borderRadius: 8,
    textAlignVertical: 'center',
  },
  minutesText: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
    paddingLeft: 8,
  },
  waitingText: {
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(14),
    color: 'black',
    marginTop: 10,
  },
  profileImage: {
    width: SCREEN_HEIGHT * 0.06,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
    // resizeMode: 'contain',
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.5,
  },

  cardContainer: {
    width: '90%',
    backgroundColor: 'white',
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 20,
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(20),
  },
  employeesText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '100%',
    flex: 1,
  },
  profileImage: {
    width: SCREEN_HEIGHT * 0.06,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
  },
  employeeName: {
    fontFamily: FontFamily.semiBold,
    fontSize: fontPixel(14),
    color: 'black',
    textAlign: 'center',
  },
  checkOutButton: {
    width: horizontalScale(120),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    height: verticalScale(45),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    // marginRight: 20,
    borderRadius: 8,
  },
  checkOutText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
});
