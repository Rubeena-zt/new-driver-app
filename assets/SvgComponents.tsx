import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Circle, G} from 'react-native-svg';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export const FilterComponent = props => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M18,28H14a2,2,0,0,1-2-2V18.41L4.59,11A2,2,0,0,1,4,9.59V6A2,2,0,0,1,6,4H26a2,2,0,0,1,2,2V9.59A2,2,0,0,1,27.41,11L20,18.41V26A2,2,0,0,1,18,28ZM6,6V9.59l8,8V26h4V17.59l8-8V6Z"
      fill={props.iconColor}
    />
    <Path
      d="M18,28H14a2,2,0,0,1-2-2V18.41L4.59,11A2,2,0,0,1,4,9.59V6A2,2,0,0,1,6,4H26a2,2,0,0,1,2,2V9.59A2,2,0,0,1,27.41,11L20,18.41V26A2,2,0,0,1,18,28ZM6,6V9.59l8,8V26h4V17.59l8-8V6Z"
      fill={props.iconColor}
    />
  </Svg>
);

export const RefreshIcon = props => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12 10H6.78A11 11 0 0127 16h2A13 13 0 006 7.68V4H4v8h8zM20 22h5.22A11 11 0 015 16H3a13 13 0 0023 8.32V28h2V20H20z"
      fill={props.iconColor}
    />
    <Path
      d="M12 10H6.78A11 11 0 0127 16h2A13 13 0 006 7.68V4H4v8h8zM20 22h5.22A11 11 0 015 16H3a13 13 0 0023 8.32V28h2V20H20z"
      fill={props.iconColor}
    />
  </Svg>
);
