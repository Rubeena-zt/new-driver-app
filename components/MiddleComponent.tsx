import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RagScore from './widgets/RagScore';
import KeyStatistics from './widgets/KeyStatistics';
import {moderateScale} from 'react-native-size-matters';

const MiddleComponent = () => {
  return (
    <View style={styles.middleContainer}>
      <View style={styles.ragComponent}>
        <RagScore />
      </View>
      <View style={styles.smallComponent}>
        <KeyStatistics />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  middleContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: moderateScale(5),
    display: 'flex',
    flexDirection: 'row',
  },
  ragComponent: {
    width: '29%',
    // height:
  },
  smallComponent: {
    width: '69%',
  },
});

export default MiddleComponent;
