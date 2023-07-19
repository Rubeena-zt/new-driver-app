import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

function DriverProfile() {
  return (
    <View>
      <Image style={styles.logo} source={require('../images/logo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    // width: moderateScale(10),
  },
});
export default DriverProfile;
