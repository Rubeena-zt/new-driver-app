import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {MaintenanceIcon} from '../assets/SvgComponents';

const MaintenanceData = props => {
  return (
    <View style={styles.mainMaintenance}>
      <View style={styles.iconStyle}>
        <MaintenanceIcon width={moderateScale(80)} height={moderateScale(80)} />
      </View>
      <View style={styles.maintenanceData}>
        <View>
          <Text style={styles.maintenanceText}>Plate No</Text>
          <Text style={styles.maintenanceText}>Assigned To</Text>
          <Text style={styles.maintenanceText}>Maintenance No</Text>
          <Text style={styles.maintenanceText}>Maintenance Type</Text>
          <Text style={styles.maintenanceText}>Due Date</Text>
          <Text style={styles.maintenanceText}>Due Kms</Text>
          <Text style={styles.maintenanceText}>Remarks</Text>
        </View>
        <View>
          <Text style={styles.maintenanceText}>:</Text>
          <Text style={styles.maintenanceText}>:</Text>
          <Text style={styles.maintenanceText}>:</Text>
          <Text style={styles.maintenanceText}>:</Text>
          <Text style={styles.maintenanceText}>:</Text>
          <Text style={styles.maintenanceText}>:</Text>
          <Text style={styles.maintenanceText}>:</Text>
        </View>
        <View>
          <Text style={styles.maintenanceText}>{props.plate}</Text>
          <Text style={styles.maintenanceText}>{props.operator}</Text>
          <Text style={styles.maintenanceText}>{props.maintenanceno}</Text>
          <Text style={styles.maintenanceText}>{props.maintenancetype}</Text>
          <Text style={styles.maintenanceText}>{props.dueDate}</Text>
          <Text style={styles.maintenanceText}>{props.duekm}</Text>
          <Text style={styles.maintenanceText}>{props.remarks}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainMaintenance: {
    padding: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    backgroundColor: '#dfe8eb',
    width: moderateScale(100),
    height: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  maintenanceData: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  maintenanceText: {
    fontSize: moderateScale(12),
    color: '#000',
    marginBottom: 2,
    // lineHeight: 1,
  },
});
export default MaintenanceData;
