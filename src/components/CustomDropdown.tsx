/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../styles/Colors';
import CustomLucideIcon from './CustomLucideIcon';

const CustomDropdown: React.FC<any> = ({
  title,
  data,
  onChange,
  value,
  placeholder,
  marginTop,
  maxHeight,
  customDropdownStyle,
  customDropdownContainerStyle,
  onFocus,
  titleStyle,
  itemTextStyle,
  placeholderTextStyle,
  leftIconName = 'Search',
  iconColor = themeColors.black,
  iconStyle = {},
  iconSize = moderateScale(14),
}) => {
  return (
    <View
      style={[
        {
          width: '100%',
        },
        customDropdownContainerStyle,
      ]}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <Dropdown
        maxHeight={maxHeight}
        style={[
          {
            height: moderateScale(45),
            borderRadius: 10,
            width: '100%',
            backgroundColor: themeColors.white,
          },
          customDropdownStyle,
        ]}
        renderLeftIcon={() => (
          <CustomLucideIcon
            name={leftIconName}
            color={iconColor}
            style={iconStyle}
            size={iconSize}
          />
        )}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        iconColor={themeColors.black}
        iconStyle={{
          height: moderateScale(0),
          width: moderateScale(0),
        }}
        onChange={onChange}
        selectedTextStyle={[styles.selectedText, itemTextStyle]}
        placeholderStyle={[styles.placeholder, placeholderTextStyle]}
        containerStyle={{
          backgroundColor: 'white',
          borderRadius: 10,
          width: '86%',
        }}
        itemContainerStyle={{backgroundColor: 'white'}}
        itemTextStyle={[
          {fontSize: moderateScale(10), color: themeColors.black},
          itemTextStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: themeColors.borderColor,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: moderateScale(12),

    marginBottom: moderateScale(5),
    color: themeColors.authentTitle,
  },
  dropdownBox: {
    backgroundColor: 'white',
    // borderRadius: 10,
  },
  placeholder: {
    color: themeColors.gray,
    fontSize: moderateScale(14),
  },
  selectedText: {
    fontSize: moderateScale(14),
    color: themeColors.black,
  },
});

export default CustomDropdown;
