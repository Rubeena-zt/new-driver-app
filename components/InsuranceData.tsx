import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
// import Reports from '../assets/Svgs/eports.svg';
import {InsurancePolicyIcon} from '../assets/SvgComponents';

const InsuranceData = props => {
  return (
    <View style={styles.iconAndText}>
      <View style={styles.iconStyle}>
        <InsurancePolicyIcon
          width={moderateScale(80)}
          height={moderateScale(80)}
        />
      </View>
      <View style={styles.insuranceData}>
        <View>
          <Text style={styles.insuranceText}>Plate No</Text>
          <Text style={styles.insuranceText}>Assigned To</Text>
          <Text style={styles.insuranceText}>Insurance No</Text>
          <Text style={styles.insuranceText}>Insurance Type</Text>
          <Text style={styles.insuranceText}>Due Date</Text>
          <Text style={styles.insuranceText}>Insurance Company</Text>
          <Text style={styles.insuranceText}>Insurance Premium</Text>
        </View>
        <View>
          <Text style={styles.insuranceText}>:</Text>
          <Text style={styles.insuranceText}>:</Text>
          <Text style={styles.insuranceText}>:</Text>
          <Text style={styles.insuranceText}>:</Text>
          <Text style={styles.insuranceText}>:</Text>
          <Text style={styles.insuranceText}>:</Text>
          <Text style={styles.insuranceText}>:</Text>
        </View>
        <View>
          <Text style={styles.insuranceText}>{props.plate}</Text>
          <Text style={styles.insuranceText}>{props.operator}</Text>
          <Text style={styles.insuranceText}>{props.insuranceno}</Text>
          <Text style={styles.insuranceText}>{props.insurancetype}</Text>
          <Text style={styles.insuranceText}>{props.insuranceendtime}</Text>
          <Text style={styles.insuranceText}>{props.insurancecompany}</Text>
          <Text style={styles.insuranceText}>{props.insurancemoney}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconAndText: {
    padding: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  iconStyle: {
    backgroundColor: '#dfe8eb',
    width: moderateScale(100),
    height: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  insuranceData: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  insuranceText: {
    fontSize: moderateScale(12),
    color: '#000',
    marginBottom: 2,
    // lineHeight: 1,
  },
});
export default InsuranceData;
