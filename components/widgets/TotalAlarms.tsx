import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Picker} from '@react-native-picker/picker';
import {Calendar} from 'react-native-calendars';
import {FilterComponent, RefreshIcon} from '../../assets/SvgComponents';

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

const TotalAlarms = () => {
  const [totalAlarms, setTotalAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedValue, setSelectedValue] = useState('Day');
  const [intervalValue, setIntervalValue] = useState('Day');
  const [selectedDate, setSelectedDate] = useState(apiDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedAlarmText, setSelectedAlarmText] = useState('');

  const uniqueAlarmTexts = [
    ...new Set(totalAlarms.map(item => item.alarmtext)),
  ];
  console.log('uniqueAlarmTexts', uniqueAlarmTexts);
  const handleAlarmTextChange = itemValue => {
    setSelectedAlarmText(itemValue);
  };

  // Assuming selectedDate is in the "2023-07-23" format
  const formattedSelectedDate = `${selectedDate.split('-')[2]}-${
    selectedDate.split('-')[1]
  }-${selectedDate.split('-')[0]}`;

  const filteredData = totalAlarms.filter(
    item => item.alarmtext.trim() === selectedAlarmText,
  );

  const limitedData = totalAlarms?.slice(0, 10);

  const handleOpenModal = () => {
    setModalVisible(true);
    console.log('The filter button was pressed');
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    console.log('The filter button was closed');
  };

  const handleRefresh = () => {
    fetchData();
    console.log('call hgyigjiknolk,');
  };

  const handleDateSelect = date => {
    setSelectedDate(date.dateString);
    setShowCalendar(false);
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
        {limitedData?.map((rowData, index) => (
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
              {/* <SelectPicker
                selectedValue={intervalValue}
                onValueChange={value => setIntervalValue(value)}>
                <SelectPicker.Item key="Day" label="Day" value="Day" />
                <SelectPicker.Item key="Month" label="Month" value="Month" />
                <SelectPicker.Item key="Year" label="Year" value="Year" />
              </SelectPicker> */}

              {/* <View> */}
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
                    editable={false} // Prevent direct text input
                  />
                )}
                <TouchableOpacity
                  style={styles.dateIcon}
                  onPress={() => setShowCalendar(true)}>
                  <Text style={styles.iconText}>📅</Text>
                </TouchableOpacity>
                {showCalendar && (
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
              <TouchableOpacity
                style={{
                  backgroundColor: '#144072',
                  width: 60,
                  height: 30,
                  borderRadius: 5,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onPress={() => fetchData()}>
                <Text>Apply</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <View>
                <Text>Select Alarm</Text>
                <Picker
                  selectedValue={selectedAlarmText}
                  onValueChange={handleAlarmTextChange}>
                  {/* <Picker.Item label="All" value="" /> */}
                  {uniqueAlarmTexts.map((alarmText, index) => (
                    <Picker.Item
                      key={index}
                      label={alarmText.trim()}
                      value={alarmText.trim()}
                    />
                  ))}
                </Picker>

                {/* <FlatList
                  data={filteredData}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <View style={{marginTop: 10}}>
                      <Text>{item.alarmtext}</Text>
                    </View>
                  )}
                /> */}
              </View>
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
    paddingVertical: moderateScale(5),
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
});

export default TotalAlarms;
