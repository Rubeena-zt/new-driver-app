import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const AlarmStatistics = () => {
  // const selectedDate = useSelector(state => state.date.date);
  const {startDate, endDate, month} = useSelector(state => state.date);
  const [totalAlarms, setTotalAlarms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the API endpoint URL
        let apiUrl = `https://test.g-trackit.com:8090/apis/v1/drivers/alarms?employeeid=0006972129&starttime=${startDate}&endtime=${endDate}`;
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
        console.log('length', data?.length);
        setTotalAlarms(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const uniqueAlarmTexts = [
    ...new Set(totalAlarms.map(item => item.alarmtext)),
  ];
  console.log('alrm-statiscts uniqueAlarmTexts', uniqueAlarmTexts);

  const getAlarmTextCount = alarmText => {
    return totalAlarms.filter(item => item.alarmtext === alarmText).length;
  };

  const colors = [
    () => `#576EB2`,
    () => `#63A6B9`,
    () => `#F68121`,
    () => `#81A9E2`,
    () => `#F66969`,
    () => `#FBE38A`,
    () => `#BD6499`,
    () => `#F2B6B6`,
    () => `#D9D9D9`,
    // Add more colors if needed
  ];
  const dataForBarChart = uniqueAlarmTexts.map(alarmText => ({
    name: alarmText,
    count: getAlarmTextCount(alarmText),
  }));
  dataForBarChart.sort((a, b) => b.count - a.count);
  const topSixData = dataForBarChart.slice(0, 9);
  console.log('Top six data points:', topSixData);

  const chartData = {
    labels: topSixData.map(item => item.name),
    datasets: [
      {
        data: topSixData.map(item => item.count),
        colors: colors.slice(0, topSixData.length), // Use colors only for the topSixData elements
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, // No decimal places for values
    color: (opacity = 0.8) => `rgba(22, 128, 204,${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.75,
    formatXLabel: () => '',
    // categoryPercentage: 1,
  };

  return (
    <View style={styles.maincontainer}>
      <View>
        <Text style={styles.alarmText}>Alarm Statistics</Text>
      </View>
      <View>
        {totalAlarms.length === 0 ? (
          <View style={styles.noAlarmsFound}>
            <Text
              style={{
                fontSize: moderateScale(20),
              }}>
              No alarms found
            </Text>
          </View>
        ) : (
          <BarChart
            data={chartData}
            width={Dimensions.get('window').width * 0.4}
            height={220}
            chartConfig={chartConfig}
            yAxisLabel=""
            withCustomBarColorFromData={true}
            flatColor={true}
            yAxisSuffix="" // Add the yAxisSuffix prop here
            showValuesOnTopOfBars={true}
          />
        )}
      </View>
      <View style={styles.circleContainer}>
        {topSixData.map((item, index) => (
          <View key={index} style={styles.circleWrapper}>
            <View
              style={[
                styles.circle,
                {backgroundColor: colors[index % colors.length]()},
              ]}
            />
            <Text style={styles.alarmCircleText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#fff',
  },
  alarmText: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: moderateScale(8),
    textAlign: 'center',
    paddingVertical: moderateScale(4),
  },
  circleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    // marginTop: moderateScale(5),
  },
  circleWrapper: {
    flexDirection: 'row',
    width: '30%',
    alignItems: 'center',
    margin: 8,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: 3,
  },
  alarmCircleText: {
    textAlign: 'center',
    color: 'black',
    fontSize: moderateScale(8),
    // fontWeight: '600',
    // marginTop: 8,
  },
  noAlarmsFound: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
});

export default AlarmStatistics;
