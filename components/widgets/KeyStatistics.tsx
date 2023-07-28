import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const RagScore = () => {
  const boxes = [
    {color: '#FF9090', value: 'A'},
    {color: '#32CB67', value: 'B'},
    {color: '#2F5597', value: 'C'},
    {color: '#C07AB1', value: '1'},
    {color: '#FFFFCC', value: '2'},
    {color: '#FF4F4F', value: '3'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {boxes.slice(0, 3).map((box, index) => (
          <View key={index} style={[styles.box, {backgroundColor: box.color}]}>
            <Text style={styles.boxText}>{box.value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.row}>
        {boxes.slice(3).map((box, index) => (
          <View key={index} style={[styles.box, {backgroundColor: box.color}]}>
            <Text style={styles.boxText}>{box.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#EBECEF',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: moderateScale(3),

    padding: 20,
  },
  //   rowup: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     // marginBottom: moderateScale(30),
  //   },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: moderateScale(30),
    // alignItems: 'flex-start',
    height: '50%',
  },
  box: {
    width: '30%',
    // height: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: moderateScale(10),
    borderColor: '#bbb',
    borderWidth: 1,
  },
  boxText: {
    color: 'white',
    fontSize: 24,
  },
});

export default RagScore;
