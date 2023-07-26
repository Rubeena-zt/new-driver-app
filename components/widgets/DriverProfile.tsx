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
      <View style={styles.logo}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.profileContainer}>
        <Image
          // source={require('../../assets/images/profilePic.png')}
          source={driverDetails.img}
          style={styles.profilePic}
          // resizeMode="contain"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsName}>{driverDetails.name}</Text>
        <Text style={styles.details}>Id: {driverDetails.employeeid}</Text>
        <Text style={styles.details}>{driverDetails.company}</Text>
        <Text style={styles.details}>
          Period: {driverDetails.permitExpiration}
        </Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: moderateScale(5),
        }}>
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
    marginLeft: moderateScale(5),
  },
  detailsName: {
    fontSize: moderateScale(12),
    // color: '#fff',
  },
  details: {
    // color: '#fff',
    marginRight: 4,
    fontSize: moderateScale(9),
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
