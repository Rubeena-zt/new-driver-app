import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Picker} from '@react-native-picker/picker';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {FilterComponent, RefreshIcon} from '../../assets/SvgComponents';
import {setDate} from '../../features/dateSlice';

// const today = new Date();
// console.log('today', today);
// const day = String(today.getDate()).padStart(2, '0');
// const month = String(today.getMonth() + 1).padStart(2, '0');
// const year = today.getFullYear();
// // const formattedDate = today.toISOString().split('T')[0];
// const formattedDate = `${day}-${month}-${year}`;
// console.log('formattedDate', formattedDate);
// const apiDate = `${year}-${month}-${day}`;
// console.log('apidate', apiDate);

const TotalAlarms = () => {
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
  const years = ['2023', '2024', '2025', '2026', '2027'];
  const dispatch = useDispatch();
  const selectedDate = useSelector(state => state.date);
  const [totalAlarms, setTotalAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Day');
  // const [selectedDate, setSelectedDate] = useState(apiDate);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedAlarmText, setSelectedAlarmText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const uniqueAlarmTexts = [
    ...new Set(totalAlarms.map(item => item.alarmtext)),
  ];
  // console.log('uniqueAlarmTexts', uniqueAlarmTexts);
  const handleAlarmTextChange = itemValue => {
    setSelectedAlarmText(itemValue);
  };
  const handleApplyButtonPress = () => {
    const selectedAlarm = selectedAlarmText.trim();
    if (selectedAlarm === '') {
      setFilteredData(totalAlarms); // If 'All Alarms' is selected, show all data
    } else {
      const filtered = totalAlarms.filter(
        item => item.alarmtext.trim() === selectedAlarm,
      );
      setFilteredData(filtered);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    setFilteredData(totalAlarms);
  }, [totalAlarms]);

  // Assuming selectedDate is in the "2023-07-23" format
  const formattedSelectedDate = `${selectedDate.split('-')[2]}-${
    selectedDate.split('-')[1]
  }-${selectedDate.split('-')[0]}`;

  const limitedFilteredData = filteredData?.slice(0, 7);

  const handleOpenModal = () => {
    setModalVisible(true);
    console.log('The filter button was pressed');
  };

  const handleRefresh = () => {
    fetchData();
    console.log('call hgyigjiknolk,');
  };

  const handleDateSelect = date => {
    // setSelectedDate(date.dateString);
    // setShowCalendar(false);
    // setModalVisible(false);
    dispatch(setDate(date.dateString));
  };

  const handleDateApply = () => {
    fetchData();
    setShowCalendar(false);
    setModalVisible(false);
  };

  const handleMonthApply = () => {
    
  };

  const fetchData = useCallback(async () => {
    try {
      // Define the API endpoint URL
      const apiUrl = `https://test.g-trackit.com:8090/apis/v1/vehicles/alarms?date=${selectedDate}`;
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
      console.log('createtime', data[0]?.createtime);
      setTotalAlarms(data);
      // console.log('type', typeof data[0].plate);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <View style={styles.mainAlarm}>
        <View style={styles.heading}>
          <Pressable onPress={handleOpenModal}>
            <Text style={styles.alarmHeading}>
              Total Alarms:{' '}
              <Text style={styles.createTime}>{totalAlarms?.length}</Text>
            </Text>
          </Pressable>
          <Text style={{marginTop: moderateScale(15)}}>
            {formattedSelectedDate}
          </Text>
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell1}>Time</Text>
          <Text style={styles.headerCell}>Plate Number</Text>
          <Text style={styles.headerCell}>Alarm</Text>
        </View>
        {limitedFilteredData?.map((rowData, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell1}>
              {rowData?.createtime.split(' ')[1]}
            </Text>
            <Text style={styles.cell2}>{rowData?.plate}</Text>
            <Text style={styles.cell3}>{rowData?.alarmtext}</Text>
          </View>
        ))}
        <View style={styles.line} />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View>
            <Pressable onPress={handleOpenModal}>
              <FilterComponent width={43} height={56} iconColor={'#57595c'} />
            </Pressable>
          </View>
          <TouchableOpacity onPress={handleRefresh} activeOpacity={0.5}>
            <RefreshIcon width={43} height={56} iconColor={'#57595c'} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            console.log('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.intervalBox}>
                <Text
                  style={{
                    marginRight: moderateScale(5),
                    fontSize: moderateScale(10),
                    marginTop: moderateScale(5),
                  }}>
                  Interval
                </Text>
                <View
                  style={{
                    // borderColor: 'gray',
                    borderWidth: 1,
                    // backgroundColor: 'green',
                    height: moderateScale(30),
                    marginTop: 6,
                  }}>
                  <TextInput editable={false} />
                  <View>
                    <Picker
                      selectedValue={selectedValue}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedValue(itemValue)
                      }
                      style={{
                        paddingHorizontal: 8,
                        marginBottom: 10,
                        borderColor: 'gray',
                        borderWidth: 1,
                        // backgroundColor: 'red',
                        marginTop: -50,
                        width: moderateScale(80),
                      }}>
                      <Picker.Item label="Day" value="Day" />
                      <Picker.Item label="Month" value="Month" />
                      <Picker.Item label="Year" value="Year" />
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={styles.intervalBox}>
                <Text
                  style={{
                    marginRight: moderateScale(5),
                    fontSize: moderateScale(10),
                    marginTop: moderateScale(5),
                  }}>
                  Date
                </Text>

                {!showCalendar && (
                  <TextInput
                    style={styles.inputCalendar}
                    placeholder="Select Date"
                    value={selectedDate}
                    editable={false}
                  />
                )}

                <TouchableOpacity
                  style={styles.dateIcon}
                  onPress={() => setShowCalendar(true)}>
                  <Text style={styles.iconText}>📅</Text>
                </TouchableOpacity>

                {showCalendar && selectedValue === 'Day' && (
                  <Calendar
                    onDayPress={date => {
                      handleDateSelect(date);
                      setShowCalendar(false);
                    }}
                    markedDates={{
                      [selectedDate]: {
                        selected: true,
                        selectedColor: 'blue',
                      },
                    }}
                  />
                )}
              </View>
              {showCalendar && selectedValue === 'Day' && (
                <TouchableOpacity
                  style={styles.ApplyButton}
                  onPress={
                    () => handleDateApply()
                    // fetchData()
                  }>
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              )}

              {selectedValue === 'Month' && (
                <View style={styles.intervalBox}>
                  <Text
                    style={{
                      marginRight: moderateScale(5),
                      fontSize: moderateScale(10),
                      marginTop: moderateScale(5),
                    }}>
                    Select Month:
                  </Text>
                  <View style={styles.pickerBox}>
                    <TextInput editable={false} />
                    <View>
                      <Picker
                        selectedValue={selectedMonth}
                        onValueChange={itemValue => setSelectedMonth(itemValue)}
                        style={styles.pickerStyle}>
                        {months.map((month, index) => (
                          <Picker.Item
                            key={index}
                            label={month}
                            value={month}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
              )}
              {selectedValue === 'Month' && (
                <View style={styles.intervalBox}>
                  <Text
                    style={{
                      marginRight: moderateScale(5),
                      fontSize: moderateScale(10),
                      marginTop: moderateScale(5),
                    }}>
                    Year:
                  </Text>
                  <View style={styles.pickerBox}>
                    <TextInput editable={false} />
                    <View>
                      <Picker
                        selectedValue={selectedYear}
                        onValueChange={itemValue => setSelectedYear(itemValue)}
                        style={styles.pickerStyle}>
                        {years.map((year, index) => (
                          <Picker.Item key={index} label={year} value={year} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
              )}

              {!showCalendar && (
                <TouchableOpacity
                  style={styles.ApplyButton}
                  onPress={
                    () => handleMonthApply()
                    // fetchData()
                  }>
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              )}
              <View style={styles.line} />
              {!showCalendar && (
                <View style={styles.intervalBox}>
                  <Text
                    style={{
                      marginRight: moderateScale(5),
                      fontSize: moderateScale(10),
                      marginTop: moderateScale(5),
                    }}>
                    Select Alarm
                  </Text>
                  <View
                    style={{
                      // borderColor: 'gray',
                      borderWidth: 1,
                      // backgroundColor: 'green',
                      height: moderateScale(30),
                      marginTop: 6,
                    }}>
                    <TextInput editable={false} />
                    <View>
                      <Picker
                        selectedValue={selectedAlarmText}
                        onValueChange={handleAlarmTextChange}
                        style={{
                          paddingHorizontal: 8,
                          marginBottom: 10,
                          borderColor: 'gray',
                          borderWidth: 1,
                          // backgroundColor: 'red',
                          marginTop: -50,
                          width: moderateScale(80),
                        }}>
                        {uniqueAlarmTexts.map((alarmText, index) => (
                          <Picker.Item
                            key={index}
                            label={alarmText.trim()}
                            value={alarmText.trim()}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
              )}

              {!showCalendar && (
                <TouchableOpacity
                  style={styles.ApplyButton}
                  onPress={handleApplyButtonPress}>
                  <Text style={styles.applyText}>Apply</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainAlarm: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(8),
    fontWeight: 'bold',
    borderRadius: moderateScale(4),
    position: 'relative',
    zIndex: 100,
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
    marginTop: 4,
  },
  createTime: {
    color: '#db676b',
    fontSize: moderateScale(18),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    zIndex: 100,
    alignItems: 'flex-start',
    padding: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  intervalBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  dateIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  iconText: {
    fontSize: 20,
  },
  inputCalendar: {
    borderColor: '#000',
    borderWidth: 1,
    // width:'100%',
    width: moderateScale(81),
  },
  ApplyButton: {
    backgroundColor: '#144072',
    width: 60,
    height: 30,
    borderRadius: 5,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    textAlign: 'center',
  },
  pickerStyle: {
    paddingHorizontal: 8,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: -50,
    width: moderateScale(80),
  },
  pickerBox: {
    borderWidth: 1,
    height: moderateScale(30),
    marginTop: 6,
  },
});

export default TotalAlarms;
