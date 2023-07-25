import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const MonthYearPicker = () => {
  const [selectedMonth, setSelectedMonth] = useState('January'); // Default selected month
  const [selectedYear, setSelectedYear] = useState('2023'); // Default selected year

  // Define the lists for months and years (you can customize these as needed)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = ['2023', '2024', '2025', '2026', '2027']; // You can expand this list with more years if needed

  return (
    <View style={styles.container}>
      <Text>Select Month:</Text>
      <Picker
        selectedValue={selectedMonth}
        onValueChange={itemValue => setSelectedMonth(itemValue)}>
        {months.map((month, index) => (
          <Picker.Item key={index} label={month} value={month} />
        ))}
      </Picker>

      <Text>Select Year:</Text>
      <Picker
        selectedValue={selectedYear}
        onValueChange={itemValue => setSelectedYear(itemValue)}>
        {years.map((year, index) => (
          <Picker.Item key={index} label={year} value={year} />
        ))}
      </Picker>

      {/* You can use the selectedMonth and selectedYear states in your application */}
      <Text>
        You selected: {selectedMonth} {selectedYear}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MonthYearPicker;
