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

const Testing = () => {
  const [totalAlarms, setTotalAlarms] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [selectedValue, setSelectedValue] = useState('Day');
  const [intervalValue, setIntervalValue] = useState('Day');
  const [selectedOption, setSelectedOption] = useState('day');

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

  const options = ['day', 'month', 'year'];

  return (
    <View>
      <View>
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
          <Text style={styles.cell1}>{rowData?.createtime.split(' ')[1]}</Text>
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
        <View style={styles.modalView}>
          {/* <Picker
            selectedValue={intervalValue}
            onValueChange={value => setIntervalValue(value)}>
            <Picker.Item key="Day" label="Day" value="Day" />
            <Picker.Item key="Month" label="Month" value="Month" />
            <Picker.Item key="Year" label="Year" value="Year" />
          </Picker> */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={selectedOption}
              editable={false}
              onTouchStart={() => setSelectedOption('')}
            />
            <Picker
              selectedValue={selectedOption}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedOption(itemValue)
              }
              style={styles.picker}>
              {options.map(option => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>
          <Text>You selected: {selectedOption}</Text>
        </View>
      </Modal>
    </View>
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
  modalView: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    zIndex: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
  },
  picker: {
    width: 120,
  },
});

export default Testing;
