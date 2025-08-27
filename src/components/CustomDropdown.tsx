import React, {useState} from 'react';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {moderateScale} from 'react-native-size-matters';
import {ViewStyle, TextStyle} from 'react-native';
import {themeColors} from '../styles/Colors';

type CustomDropdownProps = {
  items: ItemType<string>[]; // dropdown items
  value: string | null; // selected value
  setValue: (value: string | null) => void; // callback for selection
  setSelectedItem: (item: any) => void; // callback for selection
  placeholder?: string;
  containerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  items,
  value,
  setValue,
  placeholder = 'Select an option',
  containerStyle,
  dropdownStyle,
  setSelectedItem,
  textStyle,
}) => {
  const [open, setOpen] = useState(false);
  const [dropdownItems, setItems] = useState(items);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={dropdownItems}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onSelectItem={setSelectedItem}
      placeholder={placeholder}
      containerStyle={[{width: moderateScale(100)}, containerStyle]}
      style={[
        {
          backgroundColor: themeColors.grayBoxDark,
          borderColor: themeColors.grayLight,
          borderRadius: moderateScale(2),
          // width: moderateScale(100),
        },
        dropdownStyle,
      ]}
      textStyle={[
        {
          fontSize: moderateScale(8),
          color: themeColors.text,
          fontFamily: 'UrbanistSemiBold',
        },
        textStyle,
      ]}
      dropDownContainerStyle={{
        backgroundColor: themeColors.white,
        borderColor: themeColors.borderColor2,
        borderRadius: moderateScale(2),
      }}
      arrowIconStyle={{
        tintColor: themeColors.black,
      }}
      tickIconStyle={{
        tintColor: themeColors.themeBlue,
      }}
    />
  );
};

export default CustomDropdown;
