import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const RagScore = () => {
  const [ragScore, setRagScore] = useState('');
  const [ragDate, setRagDate] = useState('');

  const currentDate = new Date().toISOString().split('T')[0];
  const dayOfMonth = currentDate.split('-')[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the API endpoint URL
        let apiUrl = `https://test.g-trackit.com:8090/apis/v1/drivers/461/ragscores?day=27&starttime=2023-07-27 00:00:00&endtime=2023-07-27 23:59:59`;
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
        console.log('RagScore', data);
        setRagScore(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentDate, dayOfMonth]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.circle}>
        <Text style={styles.text}>{ragScore.ragscore}</Text>
      </View>
      <View>
        <Text style={{fontSize: moderateScale(10)}}>RAG score on</Text>
        <Text style={{fontSize: moderateScale(10)}}>{currentDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#bbb',
    borderWidth: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  circle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(50),
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default RagScore;
