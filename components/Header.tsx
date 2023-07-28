import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import DriverProfile from '../components/widgets/DriverProfile';
import {moderateScale} from 'react-native-size-matters';
import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.image}
          resizeMode="contain" // Adjust the resizeMode according to your image's aspect ratio.
        />
      </View>
      <View>
        <Text>headermiddle</Text>
      </View>
      <View>
        <DriverProfile />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '10%',
    backgroundColor: '#fff',
    marginBottom: moderateScale(8),
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  imageContainer: {
    justifyContent: 'center',
  },
});
export default Header;
