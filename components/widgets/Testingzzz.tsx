// import React, {useState} from 'react';
// import {View, Text, Picker, Button} from 'react-native';
// import Calendar from 'react-native-calendars';

// const MonthPicker = () => {
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');

//   const handleChange = itemValue => {
//     setMonth(itemValue.month);
//     setYear(itemValue.year);
//   };

//   return (
//     <View>
//       <Text>Select a month:</Text>
//       <View>
//         <Text>Select a month:</Text>
//         <FunctionComponentWrapper>
//           <Calendar
//             selectedValue={[month, year]}
//             onValueChange={handleChange}
//             showMonthPicker
//           />
//         </FunctionComponentWrapper>
//         <Button title="Submit" />
//       </View>
//       <Button title="Submit" />
//     </View>
//   );
// };

// export default MonthPicker;
