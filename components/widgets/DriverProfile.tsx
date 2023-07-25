import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

function DriverProfile() {
  return (
    <View>
      <View style={styles.logo}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/profilePic.png')}
          style={styles.profilePic}
          // resizeMode="contain"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>Rubeena Pk</Text>
        <Text style={styles.details}>Id:xxyy123</Text>
        <Text style={styles.details}>Zaeem Solutions</Text>
        <Text style={styles.details}>Peried:dd-mm-yy to dd-mm-yy</Text>
      </View>
    
      <View style={{display: 'flex',flexDirection:'row',marginLeft: moderateScale(5) }}>
        <Text style={styles.details}>RAG score</Text>
        <View style={styles.ragStyle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
  logo: {
    backgroundColor: '#fff',
    // alignItems:'flex-start'
  },
  profilePic: {
    width: moderateScale(50),
    height: moderateScale(50),
    marginTop: moderateScale(5),
  },
  profileContainer: {
    // display:'flex',
    // justifyContent:'center',
    // alignItems:'center',
    marginLeft: moderateScale(5),
  },
  details: {
    color: '#bbb',
    marginRight:4
  },
  detailsContainer: {
    marginTop: moderateScale(5),
    marginLeft: moderateScale(5),
  },
  ragStyle: {
    width: 15,
    height: 15,
    backgroundColor: 'orange',
  },
  rag: {
    display: 'flex',
    marginLeft: moderateScale(5),

  },
});
export default DriverProfile;
