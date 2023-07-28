import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RagScore from './widgets/RagScore';
import KeyStatistics from './widgets/KeyStatistics';

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
    display: 'flex',
    flexDirection: 'row',
  },
  ragComponent: {
    width: '30%',
  },
  smallComponent: {
    width: '70%',
  },
});

export default MiddleComponent;
