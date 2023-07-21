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
import {FilterComponent, RefreshIcon} from '../../assets/SvgComponents';

const TotalAlarms = () => {
  const [totalAlarms, setTotalAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedValue, setSelectedValue] = useState('Day');
  const [intervalValue, setIntervalValue] = useState('Day');

  // Define your list of options for the dropdown
  // const dropdownOptions = ['Day', 'Month', 'Year'];

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

  const fetchData = useCallback(async () => {
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
      console.log('createtime', data[0]?.createtime);
      setTotalAlarms(data);
      // console.log('type', typeof data[0].plate);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [apiDate, setTotalAlarms]);

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
          <Text style={{marginTop: moderateScale(15)}}>{formattedDate}</Text>
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
                    fontSize: moderateScale(13),
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
                        marginTop: -60,
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
                    fontSize: moderateScale(13),
                    marginTop: moderateScale(5),
                  }}>
                  Date
                </Text>
                <TextInput
                  style={{
                    borderColor: 'grey',
                    borderWidth: 1,
                    width: moderateScale(80),
                  }}
                />
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
    marginBottom:5,
  },
});

export default TotalAlarms;
