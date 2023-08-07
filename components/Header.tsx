import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DriverProfile from '../components/widgets/DriverProfile';
import {moderateScale} from 'react-native-size-matters';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TripHistory from '../components/widgets/TripHistory';
import App from '../App';
import Messages from '../components/widgets/Messages';

const Stack = createNativeStackNavigator();

const Header = navigation => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard">
          <Stack.Screen name="Dashboard" component={App} />
          <Stack.Screen name="TripHistory" component={TripHistory} />
          <Stack.Screen name="Messages" component={Messages} />
        </Stack.Navigator>
      </NavigationContainer>

      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.image}
            resizeMode="contain" // Adjust the resizeMode according to your image's aspect ratio.
          />
        </View>
        <View style={styles.links}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TripHistory', {name: 'TripHistory'})
            }>
            <Text style={styles.linkText}>Trip History</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.linkText}>Messages</Text>
          </TouchableOpacity>
        </View>
        <View>
          <DriverProfile />
        </View>
      </View>
    </>
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
  links: {
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: '#000',
  },
  linkText: {
    color: '#000',
    fontSize: moderateScale(12),
    fontWeight: '600',
    // gap:'3'
    // marginRight: 5,
  },
});
export default Header;
