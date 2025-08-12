import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import {moderateScale, scale} from 'react-native-size-matters';

interface CustomButtonProps {
  text?: string;
  backgroundColor?: any;
  textColor?: string;
  icon?: any;
  onPress: any;
  width?: any;
  height?: any;
  style?: any;
  btnTxtStyle?: any;
  marginTop?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  backgroundColor,
  textColor = '#FFFFFF',
  icon,
  marginTop,
  onPress,
  width = '100%',
  height = moderateScale(45),
  style,
  btnTxtStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor, width, height, marginTop},
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.content}>
        {icon}
        <Text style={[styles.text, {color: textColor}, btnTxtStyle]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: moderateScale(16),
  },
});

export default CustomButton;
