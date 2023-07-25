import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TotalAlarms from './components/widgets/TotalAlarms';
import AlarmStatistics from './components/widgets/AlarmStatistics';
import {moderateScale} from 'react-native-size-matters';
import DriverProfile from './components/widgets/DriverProfile';

function App(): JSX.Element {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.firstPart}>
        {/* <Text>1st part</Text> */}
        <DriverProfile />
      </View>
      <View style={styles.secondPart}>
        {/* <Text>2nd part</Text> */}
        <View style={{flex: 1, marginTop: moderateScale(5)}}>
          <View style={{height: '50%', marginBottom: moderateScale(15)}}>
            <TotalAlarms />
          </View>
          <View style={{height: '50%'}}>
            <AlarmStatistics />
          </View>
        </View>
      </View>
      <View style={styles.thirdPart}>
        <Text>3rd part</Text>
        {/* <Testing /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ECF9FF',
  },
  firstPart: {
    width: '20%',
    backgroundColor: '#1E82BD',
    padding: moderateScale(10),
    margin: moderateScale(7),
  },
  secondPart: {
    width: '40%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    // marginLeft:moderateScale(8)
  },
  thirdPart: {
    width: '30%',
  },
});

export default App;
