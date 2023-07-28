import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

function DriverProfile() {
  const [driverDetails, setDriverDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the API endpoint URL
        const apiUrl = `https://test.g-trackit.com:8090/apis/v1/drivers/employees/0003040671`;
        const headers = {
          'Content-Type': 'application/json',
          'Api-Key': 'zaeemkey1',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImFjY2Vzc0NvZGVzIjpbIjEiLCIyIiwiMyJdLCJpZCI6MSwicm9sZSI6IjAiLCJtb2JpbGUiOiIxMDAwMiIsImVtYWlsIjoiIiwicm9sZVZhbCI6Im51bGwiLCJpc09wZXJhdG9yIjowLCJpc3MiOiJaYWVlbSIsImlhdCI6MTY4ODA5Njg4NCwiZXhwIjoxNjkwNjg4ODg0fQ.cbyybtJ1ZJLc906Jc2Fk0O1hGZvRUNUKchRz_X2aL_c',
        };
        const response = await fetch(apiUrl, {
          headers: headers,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log('alarmdata', data);
        console.log('driverDetails', data);
        setDriverDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/profilePic.png')}
            // source={driverDetails.img}
            style={styles.profilePic}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.profileName}>{driverDetails.name}</Text>
          <Text style={styles.employeeid}>{driverDetails.employeeid}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },

  profilePic: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: moderateScale(8),
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: moderateScale(5),
  },
  profileName: {
    fontSize: moderateScale(13),
    color: '#000',
    fontWeight: '600',
  },
  employeeid: {
    fontSize: moderateScale(12),
  },
});
export default DriverProfile;
