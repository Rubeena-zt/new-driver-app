import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const AlarmStatistics = () => {
  const [totalAlarms, setTotalAlarms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the API endpoint URL
        const apiUrl =
          'https://test.g-trackit.com:8090/apis/v1/vehicles/alarms?date=2023-07-19';
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
  }, []);

  const uniqueAlarmTexts = [
    ...new Set(totalAlarms.map(item => item.alarmtext)),
  ];
  console.log('alrm-statiscts uniqueAlarmTexts', uniqueAlarmTexts);

  const getAlarmTextCount = alarmText => {
    return totalAlarms.filter(item => item.alarmtext === alarmText).length;
  };

  const dataForBarChart = uniqueAlarmTexts.map(alarmText => ({
    name: alarmText,
    count: getAlarmTextCount(alarmText),
  }));
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, // No decimal places for values
    color: (opacity = 0.8) => `rgba(22, 128, 204,${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.75,
  };

  return (
    <View>
      {/* Bar Chart */}
      <BarChart
        data={{
          labels: uniqueAlarmTexts,
          datasets: [
            {
              data: dataForBarChart.map(item => item.count),
              colors: [
                (opacity = 1) => `#576EB2`,
                (opacity = 1) => `#63A6B9`,
                (opacity = 1) => `#81A9E2`,
                (opacity = 1) => `#BD6499`,
                (opacity = 1) => `#F2B6B6`,
                (opacity = 1) => `#F66969`,
                (opacity = 1) => `#FBE38A`,
                (opacity = 1) => `#265599`,
                (opacity = 1) => `#D9D9D9`,
                (opacity = 1) => `#F68121`,
                (opacity = 1) => `#576EB2`,
                (opacity = 1) => `#78a9ff`,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={chartConfig}
        yAxisLabel=""
        withCustomBarColorFromData={true}
        flatColor={true}
        yAxisSuffix="" // Add the yAxisSuffix prop here
      />
    </View>
  );
};

export default AlarmStatistics;
