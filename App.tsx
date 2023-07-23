import React, {useState, useEffect} from 'react';
import {
  // SafeAreaView,
  // ScrollView,
  // StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TotalAlarms from './components/widgets/TotalAlarms';
import Testing from './components/widgets/Testing';
import AlarmStatistics from './components/widgets/AlarmStatistics';

function App(): JSX.Element {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.firstPart}>
        <Text>1st part</Text>
      </View>
      <View style={styles.secondPart}>
        {/* <Text>2nd part</Text> */}
        <View>
          <TotalAlarms />
          <AlarmStatistics />
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
  },
  secondPart: {
    width: '40%',
  },
  thirdPart: {
    width: '30%',
  },
});

export default App;
