/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import CustomVectorIcons from './CustomVectorIcons';
import { useTheme } from '@theme/themeContext';
import FontFamily from '@assets/Fonts/FontFamily';
import { moderateScale } from 'react-native-size-matters';

interface CustomTextInputProps extends TextInputProps {
  title?: string;
  placeholder?: string;
  icon?: any;
  icon2?: any;
  secureTextEntry?: boolean;
  onIconPress?: () => void;
  showBorderOnFocus?: boolean;
  defaultBorderColor?: string;
  focusBorderColor?: string;
  focusOuterBorderColor?: string;
  errorMessage?: string;
  onFocusClearError?: () => void;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  customInputContainerStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      title,
      placeholder,
      value,
      onChangeText,
      secureTextEntry = false,
      icon,
      icon2,
      onIconPress,
      showBorderOnFocus = true,
      defaultBorderColor = '#000',
      focusBorderColor = '#5f259f',
      focusOuterBorderColor = '#e0cbd7',
      errorMessage = '',
      onFocusClearError,
      style,
      inputStyle,
      customInputContainerStyle,
      errorStyle,
      onSubmitEditing,
      keyboardType,
      returnKeyType,
      autoCapitalize,
      ...textInputProps
    },
    ref,
  ) => {
    const { theme, isDark } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(!secureTextEntry);
    const styles = getStyles(theme);

    const handleFocus = () => {
      setIsFocused(true);
      if (onFocusClearError) {
        onFocusClearError();
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const hasError = !!errorMessage;

    return (
      <View style={[styles.container, style]}>
        {title && <Text style={styles.title}>{title}</Text>}

        <View
          style={[
            styles.inputContainer,
            {
              borderColor: hasError
                ? theme.themeRed
                : showBorderOnFocus && isFocused
                ? focusBorderColor
                : defaultBorderColor,
            },
            customInputContainerStyle,
          ]}
        >
          {icon}
          <TextInput
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={theme.grayLight}
            value={value}
            ref={ref}
            onSubmitEditing={onSubmitEditing}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            secureTextEntry={!showPassword}
            {...textInputProps}
          />
          {secureTextEntry && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <CustomVectorIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={moderateScale(25)}
                color={theme.gray}
                iconSet="Ionicons"
              />
            </TouchableOpacity>
          )}

          {icon2}
        </View>

        {hasError && (
          <Text style={[styles.errorText, errorStyle]}>{errorMessage}</Text>
        )}
      </View>
    );
  },
);

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: moderateScale(25),
    },
    title: {
      fontSize: moderateScale(12),
      fontFamily: FontFamily.UbuntuMedium,
      marginBottom: moderateScale(5),
      color: theme.authentTitle,
    },
    outerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.black,
      borderRadius: moderateScale(10),
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E8E8E8',
      borderRadius: moderateScale(10),
      height: moderateScale(50),
      paddingHorizontal: moderateScale(5),
      backgroundColor: theme.white,
    },
    input: {
      flex: 1,
      height: moderateScale(45),
      paddingVertical: 0,
      fontSize: moderateScale(14),
      fontFamily: FontFamily.UbuntuMedium,
      color: theme.black,
      marginHorizontal: moderateScale(5),
    },
    errorText: {
      marginTop: moderateScale(2),
      fontSize: moderateScale(14),
      color: theme.themeRed,
      fontFamily: FontFamily.UbuntuMedium,
    },
  });

export default CustomTextInput;
