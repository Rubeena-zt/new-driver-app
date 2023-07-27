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
import moment from 'moment';
import {moderateScale} from 'react-native-size-matters';
import {Picker} from '@react-native-picker/picker';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {FilterComponent, RefreshIcon} from '../../assets/SvgComponents';
import {setStartDate, setEndDate, setMonth} from '../../features/dateSlice';

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
  // const selectedDate = useSelector(state => state.date);
  // const selectedDate = useSelector(state => state.date.date);
  const {startDate, endDate, month} = useSelector(state => state.date);
  console.log('startDateredux', startDate);
  console.log('endDateredux', endDate);

  const [totalAlarms, setTotalAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Day');
  // const [selectedDate, setSelectedDate] = useState(apiDate);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedAlarmText, setSelectedAlarmText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const uniqueAlarmTexts = [
    ...new Set(totalAlarms.map(item => item.alarmtext)),
  ];
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
  // const formattedSelectedDate = `${selectedDate.split('-')[2]}-${
  //   selectedDate.split('-')[1]
  // }-${selectedDate.split('-')[0]}`;

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
    console.log('date', date);
    console.log('selectedStartDate', selectedStartDate);
    console.log('selectedEndDate', selectedEndDate);

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date.dateString);
      setSelectedEndDate(null); // Reset the selectedEndDate when a new selectedStartDate is selected
    } else {
      setSelectedEndDate(date.dateString);
    }
  };

  const assignMarkedDates = () => {
    let markedDates = {};
    if (selectedStartDate && selectedEndDate) {
      // If both selectedStartDate and selectedEndDate are selected, mark dates in between
      const startDateObj = new Date(selectedStartDate);
      const endDateObj = new Date(selectedEndDate);
      const currentDate = new Date(startDateObj);

      while (currentDate <= endDateObj) {
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = {selected: true, selectedColor: 'blue'};
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else if (selectedStartDate) {
      // If only selectedStartDate is selected, mark the selected selectedStartDate
      markedDates[selectedStartDate] = {selected: true, selectedColor: 'blue'};
    }

    setMarkedDates(markedDates);
  };

  useEffect(() => {
    assignMarkedDates();
  }, [selectedStartDate, selectedEndDate]);

  const handleDateApply = () => {
    dispatch(setStartDate(selectedStartDate));
    dispatch(setEndDate(selectedEndDate));
    fetchData();
    setShowCalendar(false);
    setModalVisible(false);
  };

  // Function to handle month selection
  const handleMonthSelect = month => {
    setSelectedMonth(month);
    updateSelectedDate(month, selectedYear);
  };

  const handleYearSelect = year => {
    setSelectedYear(year);
    updateSelectedDate(selectedMonth, year);
  };

  const updateSelectedDate = (month, year) => {
    const fullDate = `${year}-${month}`;
    // dispatch(set(fullDate));
    const startDateMonth = moment(fullDate)
      .startOf('month')
      .format('YYYY-MM-DD');
    console.log('startDateMonth', startDateMonth);

    const endDateMonth = moment(fullDate).endOf('month').format('YYYY-MM-DD');
    console.log('endDateMonth', endDateMonth);
    dispatch(setStartDate(startDateMonth));
    dispatch(setEndDate(endDateMonth));
    dispatch(setMonth(fullDate));
  };

  const handleMonthApply = () => {
    fetchData();
    setShowCalendar(false);
    setModalVisible(false);
  };

  // const handleMonthSelect = selectedMonth => {
  //   // const formattedValue = `${selectedYear}-${selectedMonth}`;
  //   // console.log("formattedValue",formattedValue);
  //   dispatch(setDate({month: selectedMonth}));
  // };

  const fetchData = useCallback(async () => {
    try {
      // Define the API endpoint URL
      let apiUrl = `https://test.g-trackit.com:8090/apis/v1/drivers/alarms?employeeid=0006972129&starttime=${startDate}`;
      // const apiUrl = `https://test.g-trackit.com:8090/apis/v1/vehicles/alarms?date=${selectedDate}`;
      if (endDate) {
        apiUrl += `&endtime=${endDate}`;
      } else {
        // If endDate is not available, set it to be equal to startDate
        apiUrl += `&endtime=${startDate}`;
      }
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
  }, [startDate, endDate]);

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
          {/* <Text style={{marginTop: moderateScale(15)}}>
            {formattedSelectedDate}
          </Text> */}
        </View>

        {/* <View> */}
        <View style={styles.headerRow}>
          <Text style={styles.headerCell1}>Time</Text>
          <Text style={styles.headerCell}>Plate Number</Text>
          <Text style={styles.headerCell}>Alarm</Text>
        </View>
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
          <View>
            {limitedFilteredData?.map((rowData, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell1}>
                  {rowData?.createtime.split(' ')[1]}
                </Text>
                <Text style={styles.cell2}>{rowData?.plate}</Text>
                <Text style={styles.cell3}>{rowData?.alarmtext}</Text>
              </View>
            ))}
          </View>
        )}
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
              {selectedValue === 'day' && (
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
                      value={startDate}
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
                      markingType={'dot'}
                      onDayPress={date => {
                        handleDateSelect(date);
                      }}
                      markedDates={markedDates}
                    />
                  )}
                </View>
              )}
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
                        onValueChange={itemValue =>
                          handleMonthSelect(itemValue)
                        }
                        style={styles.pickerStyle}>
                        {months.map((month, index) => (
                          <Picker.Item
                            key={index}
                            label={month}
                            value={(index + 1).toString().padStart(2, '0')}
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
                        onValueChange={itemValue => handleYearSelect(itemValue)}
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
        {/* </View> */}
        {/* )} */}
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
  noAlarmsFound: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
});

export default TotalAlarms;
