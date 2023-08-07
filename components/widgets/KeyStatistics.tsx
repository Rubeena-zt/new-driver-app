import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const RagScore = () => {
  const boxes = [
    {
      color: '#FF9090',
      value: 'A',
      text: 'Idle Hours',
      svg: require('../../assets/images/anchor.png'),
    },
    {
      color: '#32CB67',
      value: 'B',
      text: 'Engine Hours',
      svg: require('../../assets/images/anchor.png'),
    },
    {
      color: '#2F5597',
      value: 'C',
      text: 'Total Vehicles',
      svg: require('../../assets/images/anchor.png'),
    },
    {
      color: '#C07AB1',
      value: '1',
      text: 'Distance',
      svg: require('../../assets/images/anchor.png'),
    },
    {
      color: '#FFFFCC',
      value: '2',
      text: 'Trip',
      svg: require('../../assets/images/anchor.png'),
    },
    {
      color: '#FF4F4F',
      value: '3',
      text: 'Trip',
      svg: require('../../assets/images/anchor.png'),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {boxes.slice(0, 3).map((box, index) => (
          <View key={index} style={[styles.box, {backgroundColor: box.color}]}>
            <View style={styles.textStyle}>
              <Text style={styles.boxText}>{box.value}</Text>
              <Text style={styles.boxText}>{box.text}</Text>
            </View>
            <View>
              <Image source={box.svg} style={styles.svgImage} />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.row}>
        {boxes.slice(3).map((box, index) => (
          <View key={index} style={[styles.box, {backgroundColor: box.color}]}>
            <View style={styles.textStyle}>
              <Text style={styles.boxText}>{box.value}</Text>
              <Text style={styles.boxText}>{box.text}</Text>
            </View>
            <View>
              <Image source={box.svg} style={styles.svgImage} />
            </View>
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
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '49%',
  },
  // textStyle:{
  //   justifyContent:'center'
  // },
  box: {
    width: '32%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#bbb',
    borderWidth: 1,
  },
  boxText: {
    color: 'white',
    fontSize: 24,
  },
  svgImage: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
});

export default RagScore;
