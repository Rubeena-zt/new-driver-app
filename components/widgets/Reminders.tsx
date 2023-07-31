import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

function Reminders() {
  const [remDetails, setRemDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function formatDateDDmmmYYY(dateString) {
    if (dateString == null) return;
    if (dateString.length === 0) return;
    const date = new Date(dateString);
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    return date.toLocaleDateString('en-IN', options); //Eg: Jun 21, 2023
  }

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
        // console.log('alarmdata', data);
        console.log('reminderDetails', data);
        console.log(
          'insuranceendtime',
          remDetails?.overDue[0]?.data?.insuranceendtime,
        );
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

  function getInsuranceMsg(remDetails) {
    if (remDetails === 'overDue') {
      return ` expired on ${formatDateDDmmmYYY(remDetails?.insuranceendtime)}`;
    }
    return ` will expire on ${formatDateDDmmmYYY(
      remDetails?.overDue?.data?.insuranceendtime,
    )}`;
  }

  // function getMaintenanceMsg(remDetails) {
  //   switch (remDetails?.data.operate) {
  //     case '2':
  //       if (remDetails?.data.type === 'overDue') {
  //         return ` is overdue since ${formatDateDDmmmYYY(
  //           remDetails?.data?.param,
  //         )}`;
  //       }
  //       return ` is due on ${formatDateDDmmmYYY(remDetails?.data?.param)}`;
  //     case '3':
  //       if (category === 'overDue') {
  //         return ` was due at ${remDetails?.data?.param}Kms`;
  //       }
  //       return ` is due at ${remDetails?.data?.param}Kms`;
  //     case '4':
  //       maintenanceType = 'Periodic maintenance';
  //       if (category === 'overDue') {
  //         return ` (${remDetails?.data?.param}Kms) is overdue`;
  //       }
  //       return ` (${remDetails?.data?.param}Kms)`;
  //     default:
  //       break;
  //   }
  // }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>Reminders</Text>
      <View style={styles.overdueHeading}>
        <Text style={styles.overDuelength}>{remDetails?.overDue?.length}</Text>
        <Text style={styles.overDue}>Overdue</Text>
      </View>
      <View style={styles.overdueContainer}>
        {remDetails?.overDue?.map((item, index) => (
          <View key={index} style={styles.overduestyle}>
            <Text style={styles.plate}>{item.plate}</Text>
            <Text>
              <Text style={(styles.remType, getColorByType(item.type))}>
                {item.type}
              </Text>
              <Text>{getInsuranceMsg(remDetails)}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    height: '90%',
    width: '85%',
    // paddingRight: moderateScale(9),
  },
  header: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: moderateScale(8),
    textAlign: 'center',
    paddingVertical: moderateScale(4),
  },
  overdueHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(3),
    color: 'green',
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
  plate: {
    fontSize: moderateScale(10),
  },
  remType: {
    fontSize: moderateScale(10),
  },
  maintenance: {
    color: '#ffc400',
  },
  insurance: {
    color: 'rgb(4, 106, 223)',
  },
});

export default Reminders;
