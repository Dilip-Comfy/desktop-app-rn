/* eslint-disable react-native/no-inline-styles */
import FontFamily from '@assets/Fonts/FontFamily';
import { useTheme } from '@theme/themeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { moderateScale } from 'react-native-size-matters';

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
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View
      style={[
        {
          width: '100%',
        },
        customDropdownContainerStyle,
      ]}
    >
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <Dropdown
        maxHeight={maxHeight}
        style={[
          {
            height: moderateScale(45),
            borderRadius: 10,
            width: '100%',
            backgroundColor: theme.white,
          },
          customDropdownStyle,
        ]}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onFocus={onFocus}
        iconColor={theme.black}
        iconStyle={{
          height: moderateScale(20),
          width: moderateScale(20),
        }}
        onChange={onChange}
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholder}
        containerStyle={{
          backgroundColor: 'white',
          borderRadius: 10,
          width: '86%',
        }}
        itemContainerStyle={{ backgroundColor: 'white' }}
        itemTextStyle={{ fontSize: moderateScale(14), color: theme.black }}
      />
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    dropdown: {
      height: 50,
      borderRadius: 10,
      width: '100%',
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: 'white',
      paddingHorizontal: 15,
    },
    title: {
      fontSize: moderateScale(12),
      fontFamily: FontFamily.UbuntuMedium,
      marginBottom: moderateScale(5),
      color: theme.authentTitle,
    },
    dropdownBox: {
      backgroundColor: 'white',
      // borderRadius: 10,
    },
    placeholder: {
      color: theme.gray,
      fontSize: moderateScale(14),
      fontFamily: FontFamily.UbuntuMedium,
    },
    selectedText: {
      fontSize: moderateScale(14),
      color: theme.black,
      fontFamily: FontFamily.UbuntuMedium,
    },
  });

export default CustomDropdown;
