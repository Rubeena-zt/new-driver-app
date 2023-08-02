import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {CloseIcon} from '../../assets/SvgComponents';
import InsuranceData from '../InsuranceData';
import MaintenanceData from '../MaintenanceData';

function Reminders() {
  const [remDetails, setRemDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clickedReminder, setClickedReminder] = useState('');

  function formatDateDDmmmYYY(dateString) {
    if (dateString == null) return;
    if (dateString.length === 0) return;
    const date = new Date(dateString);
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    return date.toLocaleDateString('en-IN', options); //Eg: Jun 21, 2023
  }

  useEffect(() => {
    console.log('clickedreminder', clickedReminder);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the API endpoint URL
        const apiUrl = `https://test.g-trackit.com:8090/apis/v1/reminders`;
        const headers = {
          'Content-Type': 'application/json',
          'Api-Key': 'zaeemkey1',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImFjY2Vzc0NvZGVzIjpbIjEiLCIyIiwiMyJdLCJpZCI6MSwicm9sZSI6IjAiLCJtb2JpbGUiOiIxMDAwMiIsImVtYWlsIjoiIiwicm9sZVZhbCI6Im51bGwiLCJpc09wZXJhdG9yIjowLCJpc3MiOiJaYWVlbSIsImlhdCI6MTY5MDY5ODg4MCwiZXhwIjoxNjkzMjkwODgwfQ.TGJiKKxgaBzfOt12uE8gt_47X_1MHUGyDv4PUBEST7w',
        };
        const response = await fetch(apiUrl, {
          headers: headers,
        });
        if (!response.ok) {
          throw new Error('Network response was not ok-reminders');
        }
        const data = await response.json();
        console.log('alarmdata', data);
        // console.log('reminderDetails', data);
        // console.log(
        //   'insuranceendtime',
        //   remDetails?.overDue?.data?.insuranceendtime,
        // );
        console.log('type', data?.overDue[0]?.type);

        setRemDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getColorByType = type => {
    if (type === 'Insurance') {
      return {color: 'rgb(4, 106, 223)'};
    } else if (type === 'Maintenance') {
      return {color: '#ffc400'};
    }
  };

  function getOverdueMsg(type, insuranceendtime, param, operate) {
    if (type === 'Maintenance') {
      switch (operate) {
        case '2':
          return ` is overdue since ${formatDateDDmmmYYY(param)}`;
        case '3':
          return ` was due at ${param}Kms`;
        case '4':
          // maintenance = 'Periodic maintenance';
          return ` (${param}Kms) is overdue`;
        default:
          break;
      }
    } else if (type === 'Insurance') {
      return ` expired on ${formatDateDDmmmYYY(insuranceendtime)}`;
    }
  }

  let maintenanceType = 'Maintenance';

  function getUpcomingMsg(type, insuranceendtime, param, operate) {
    if (type === 'Maintenance') {
      switch (operate) {
        case '2':
          return ` is due on ${formatDateDDmmmYYY(param)}`;
        case '3':
          return ` is due at ${param}Kms`;
        case '4':
          maintenanceType = 'Periodic maintenance';
          return ` (${param}Kms)`;
        default:
          break;
      }
    } else if (type === 'Insurance') {
      return ` will expire on ${formatDateDDmmmYYY(
        remDetails?.data?.insuranceendtime,
      )}`;
    }
  }

  const handleOpenModal = (details, reminderType) => {
    setClickedReminder({...details, reminderStatus: reminderType});
    setShowModal(true);
    console.log('modal button pressed');
    // if (reminderStatus === 'overDue') {
    //   return 'overDue';
    // } else {
    //   return 'upComing';
    // }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formattedDate = new Date().toLocaleDateString('en-GB');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.reminderHeader}>
        <Text style={styles.header}>Reminders</Text>
        <Text style={styles.headerDate}>{formattedDate}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.overdueHeading}>
        <Text style={styles.overDuelength}>{remDetails?.overDue?.length}</Text>
        <Text style={styles.overDue}>Overdue</Text>
      </View>
      <ScrollView>
        <View style={styles.overdueContainer}>
          {remDetails?.overDue?.map((item, index) => (
            <View key={index}>
              <Text style={styles.plate}>{item.plate}</Text>
              <View style={styles.textDetails}>
                <Text>
                  <Text style={(styles.remType, getColorByType(item.type))}>
                    {item.type}
                  </Text>
                  <Text>
                    {getOverdueMsg(
                      item.type,
                      item.data.insuranceendtime,
                      item.data.param,
                      item.data.operate,
                    )}
                  </Text>
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={() => handleOpenModal(item, 'overDue')}>
                    <Text style={styles.details}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.upComingHeading}>
        <Text style={styles.upCominglength}>
          {remDetails?.upComing?.length}
        </Text>
        <Text style={styles.upComing}>Upcoming</Text>
      </View>
      <ScrollView>
        <View style={styles.upComingContainer}>
          {remDetails?.upComing?.map((item, index) => (
            <View key={index}>
              <Text style={styles.plate}>{item.plate}</Text>
              <View style={styles.textDetails}>
                <Text>
                  <Text style={(styles.remType, getColorByType(item.type))}>
                    {item.type}
                  </Text>
                  <Text>
                    {getUpcomingMsg(
                      item.type,
                      item.data.insuranceendtime,
                      item.data.param,
                      item.data.operate,
                    )}
                  </Text>
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={() => handleOpenModal(item, 'upComing')}>
                    <Text style={styles.details}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.reminderHeading}>
              <Text style={styles.reminderDetails}>Reminder details</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <CloseIcon
                  width={moderateScale(15)}
                  height={moderateScale(15)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <>
              {clickedReminder?.type === 'Insurance' ? (
                <View>
                  {clickedReminder.reminderStatus === 'overDue' ? (
                    <Text style={styles.insuranceText}>OverDue Insurance</Text>
                  ) : (
                    <Text style={styles.insuranceUpcoming}>
                      Upcoming Insurance
                    </Text>
                  )}
                  <InsuranceData
                    plate={clickedReminder?.data?.plate}
                    operator={clickedReminder?.data?.operator}
                    insuranceno={clickedReminder?.data?.insuranceno}
                    insurancetype={clickedReminder?.data?.insurancetype}
                    insuranceendtime={clickedReminder?.data?.insuranceendtime}
                    insurancecompany={clickedReminder?.data?.insurancecompany}
                    insurancemoney={clickedReminder?.data?.insurancemoney}
                  />
                </View>
              ) : (
                <View>
                  {clickedReminder.reminderStatus === 'upComing' ? (
                    <Text style={styles.maintenanceText}>
                      Upcoming Maintenance
                    </Text>
                  ) : (
                    <Text style={styles.maintenanceOverdue}>
                      Overdue Maintenance
                    </Text>
                  )}
                  <MaintenanceData
                    plate={clickedReminder?.data?.plate}
                    operator={clickedReminder?.data?.operator}
                    maintenanceno={clickedReminder?.data?.maintenanceno}
                    maintenancetype={clickedReminder?.data?.maintenancetype}
                    dueDate={
                      clickedReminder?.data?.operate === '2'
                        ? formatDateDDmmmYYY(clickedReminder?.data.param)
                        : ''
                    }
                    duekm={
                      clickedReminder?.data?.operate == 3 ||
                      clickedReminder?.data?.operate == 4
                        ? clickedReminder?.data?.param
                        : ''
                    }
                    remarks={clickedReminder?.data?.memo}
                  />
                </View>
              )}
            </>
            
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    height: '100%',
    padding: moderateScale(6),
    marginBottom: moderateScale(15),
    overflow: 'hidden',
  },
  header: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: moderateScale(5),
    // textAlign: 'center',
    paddingVertical: moderateScale(4),
  },
  headerDate: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#bbb',
    paddingHorizontal: moderateScale(5),
    // textAlign: 'center',
    paddingVertical: moderateScale(4),
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overdueHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(3),
    // color: 'green',
  },
  overDuelength: {
    fontSize: moderateScale(22),
    color: '#db676b',
  },
  overDue: {
    color: '#db676b',
    fontSize: moderateScale(12),
  },
  overdueContainer: {
    flexDirection: 'column',
  },
  upComingHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(3),
    color: 'green',
  },
  upCominglength: {
    fontSize: moderateScale(22),
    color: '#32CB67',
  },
  upComing: {
    color: '#32CB67',
    fontSize: moderateScale(12),
  },
  upComingContainer: {
    flexDirection: 'column',
  },
  plate: {
    fontSize: moderateScale(10),
  },
  remType: {
    fontSize: moderateScale(12),
  },
  maintenance: {
    color: '#ffc400',
  },
  insurance: {
    color: 'rgb(4, 106, 223)',
  },
  details: {
    color: '#144072',
    textDecorationLine: 'underline',
  },
  textDetails: {
    // width:
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '60%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 5,
    zIndex: 100,
    alignItems: 'flex-start',
    padding: moderateScale(8),
  },
  reminderDetails: {
    fontSize: moderateScale(18),
    color: '#000',
    padding: moderateScale(4),
  },
  reminderHeading: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#bbb',
  },
  insuranceText: {
    fontSize: moderateScale(15),
    color: '#db676b',
    marginBottom: moderateScale(3),
    textAlign: 'center',
  },
  insuranceUpcoming: {
    fontSize: moderateScale(15),
    color: '#32CB67',
    marginBottom: moderateScale(3),
    textAlign: 'center',
  },
  maintenanceText: {
    fontSize: moderateScale(15),
    color: '#32CB67',
    marginBottom: moderateScale(3),
    textAlign: 'center',
  },
  maintenanceOverdue: {
    fontSize: moderateScale(15),
    color: '#db676b',
    marginBottom: moderateScale(3),
    textAlign: 'center',
  },
});

export default Reminders;
