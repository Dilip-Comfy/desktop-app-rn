/* eslint-disable react-native/no-inline-styles */
import FontFamily from '@assets/Fonts/FontFamily';
import { useTheme } from '@theme/themeContext';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomLucideIcon from './CustomLucideIcon';
import moment from 'moment';

const CustomDateTimePicker: React.FC<any> = ({
  title,
  onChangeDate,
  iconName = 'CalendarDays',
  iconColor,
  iconSize = moderateScale(24),
  mode = 'date', // accepts 'date' | 'time' | 'datetime'
  placeholder = 'Select Date',
  customDropdownStyle,
  customDropdownContainerStyle,
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
    onChangeDate?.(date); // emit date to parent if passed
  };

  // Format display based on mode
  const getFormattedDate = () => {
    if (!selectedDate) return placeholder;
    if (mode === 'time') return moment(selectedDate).format('hh:mm A');
    if (mode === 'datetime')
      return moment(selectedDate).format('DD MMM YYYY - hh:mm A');
    return moment(selectedDate).format('DD MMM YYYY'); // default: date
  };

  return (
    <View style={[styles.container, customDropdownContainerStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}

      <TouchableOpacity
        onPress={showDatePicker}
        activeOpacity={0.6}
        style={[
          styles.pickerContainer,
          customDropdownStyle,
          { backgroundColor: theme.white },
        ]}
      >
        <Text style={[selectedDate ? styles.selectedText : styles.placeholder]}>
          {getFormattedDate()}
        </Text>

        <CustomLucideIcon
          name={iconName}
          size={iconSize}
          color={iconColor || theme.iconColor}
          style={{ marginRight: moderateScale(5) }}
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        date={selectedDate || new Date()}
        is24Hour={false}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: moderateScale(24),
    },
    title: {
      fontSize: moderateScale(12),
      fontFamily: FontFamily.UbuntuMedium,
      marginBottom: moderateScale(5),
      color: theme.authentTitle,
    },
    pickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.gray,
      borderRadius: moderateScale(10),
      height: moderateScale(51),
      paddingHorizontal: moderateScale(5),
      backgroundColor: theme.white,
    },
    placeholder: {
      color: theme.grayLight,
      fontSize: moderateScale(14),
      fontFamily: FontFamily.UbuntuMedium,
    },
    selectedText: {
      fontSize: moderateScale(14),
      color: theme.black,
      fontFamily: FontFamily.UbuntuMedium,
    },
  });

export default CustomDateTimePicker;
