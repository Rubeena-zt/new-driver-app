import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Filter from '../images/filter1.svg';

const TotalAlarms = () => {
  const [totalAlarms, setTotalAlarms] = useState([]);

  const today = new Date();
  console.log('today', today);
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  // const formattedDate = today.toISOString().split('T')[0];
  const formattedDate = `${day}-${month}-${year}`;
  console.log('formattedDate', formattedDate);
  const apiDate = `${year}-${month}-${day}`;
  console.log('apidate', apiDate);

  const limitedData = totalAlarms?.slice(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the API endpoint URL
        const apiUrl = `https://test.g-trackit.com:8090/apis/v1/vehicles/alarms?date=${apiDate}`;
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
        console.log('alarmdata', data);
        console.log('length', data?.length);
        setTotalAlarms(data);
        // console.log('type', typeof data[0].plate);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.mainAlarm}>
      <View style={styles.heading}>
        <Text style={styles.alarmHeading}>
          Total Alarms:{' '}
          <Text style={{color: '#db676b', fontSize: moderateScale(18)}}>
            {totalAlarms?.length}
          </Text>
        </Text>
        <Text>{formattedDate}</Text>
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell1}>Time</Text>
        <Text style={styles.headerCell}>Plate Number</Text>
        <Text style={styles.headerCell}>Alarm</Text>
      </View>
      {limitedData?.map((rowData, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell1}>{rowData?.createtime.split(' ')[1]}</Text>
          <Text style={styles.cell2}>{rowData?.plate}</Text>
          <Text style={styles.cell3}>{rowData?.statusText}</Text>
        </View>
      ))}
      <View style={styles.line} />
      <View>{/* <Filter /> */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainAlarm: {
    width: '100%',
    // height: 300,
    backgroundColor: '#fff',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    fontWeight: 'bold',
    borderRadius: moderateScale(4),
  },
  alarmHeading: {
    color: '#000',
    fontSize: moderateScale(10),
    fontWeight: '600',
  },
  heading: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(8),
    // backgroundColor:"#C6EBFD"
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(8),
    backgroundColor: '#C6EBFD',
    paddingVertical: moderateScale(5),
    color: '#000',
  },
  headerCell: {
    flex: 1,
    fontWeight: '500',
    color: '#000',
  },
  headerCell1: {
    flex: 1,
    fontWeight: '500',
    paddingLeft: moderateScale(5),
    color: '#000',
  },
  cell1: {
    flex: 1,
    paddingLeft: moderateScale(5),
  },
  cell2: {flex: 1},
  cell3: {
    flex: 1,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#bbb',
  },
});

export default TotalAlarms;
