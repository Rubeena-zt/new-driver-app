import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import TotalAlarms from './components/widgets/TotalAlarms';
import AlarmStatistics from './components/widgets/AlarmStatistics';
import {moderateScale} from 'react-native-size-matters';
import DriverProfile from './components/widgets/DriverProfile';
import store from './features/store';
import Appss from './components/widgets/Testingzzz';
import MiddleComponent from './components/MiddleComponent';
import Header from './components/Header';
import Reminders from './components/widgets/Reminders';

function App(): JSX.Element {
  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.header}>
        <View>
          <Text style={{fontSize: 40}}>gtrackit</Text>
        </View>
        <View>
          <Text>headermiddle</Text>
        </View>
        <View>
          <DriverProfile />
        </View>
      </View> */}

      <Header />

      <View style={styles.middlePart}>
        <MiddleComponent />
      </View>
      <View style={styles.lowerPart}>
        <Provider store={store}>
          <View style={styles.alarmStatistics}>
            <AlarmStatistics />
          </View>
          <View style={styles.totalAlarms}>
            <TotalAlarms />
          </View>
        </Provider>
        <View style={styles.reminders}>
          <Reminders />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EBECEF',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '8%',
    backgroundColor: '#fff',
    marginBottom: moderateScale(8),
  },
  middlePart: {
    width: '100%',
    height: '24%',
    marginBottom: moderateScale(8),
    backgroundColor: '#fff',
  },
  lowerPart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: moderateScale(10),
    width: '100%',
    height: '64%',
    padding: '2%',
    // marginBottom:moderateScale(10)

    // backgroundColor: '#000',
  },
  alarmStatistics: {
    width: '34%',
    // marginHorizontal: moderateScale(15),
  },
  totalAlarms: {
    width: '34%',
    // marginHorizontal: moderateScale(5),
  },
  reminders: {
    width: '29%',
    // backgroundColor: '#green',
  },
});

export default App;
