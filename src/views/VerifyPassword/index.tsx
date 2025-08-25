/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CustomLucideIcon from '../../components/CustomLucideIcon';
import {themeColors} from '../../styles/Colors';
import CustomButton from '../../components/CustomButton';

import CustomLoader from '../../components/CustomLoader';

const VerifyPassword = ({navigation}) => {
  const [isVisible, setVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = text => {
    setInputValue(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}>
          <CustomLucideIcon name="ArrowLeft" color={themeColors.white} />
        </TouchableOpacity>

        <Text style={styles.stepText}>Step 3 of 3</Text>
        <Text style={styles.title}>Wallet Password</Text>
        <Text style={styles.description}>
          Unlocks wallet on this device only.
        </Text>

        <Text style={styles.stepText}>Enter Wallet Passowrd</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Passowrd..."
            placeholderTextColor={themeColors.grayLight}
            value={inputValue}
            onChangeText={handleTextChange}
            autoCapitalize="none"
            secureTextEntry={isVisible}
          />

          <TouchableOpacity
            onPress={() => {
              setVisible(!isVisible);
            }}>
            <CustomLucideIcon
              name={!isVisible ? 'Eye' : 'EyeOff'}
              color={themeColors.white}
              style={{marginLeft: moderateScale(12)}}
            />
          </TouchableOpacity>
        </View>

        <CustomButton
          text={'Create Password'}
          onPress={() => {}}
          backgroundColor={themeColors.white}
          btnTxtStyle={{
            fontSize: moderateScale(10),
            color: themeColors.black,
            fontWeight: '600',
          }}
          height={moderateScale(25)}
          width={'80%'}
          style={{
            alignSelf: 'center',
            marginVertical: moderateScale(18),
            marginTop: moderateScale(30),
            borderRadius: moderateScale(5),
          }}
        />
      </View>
      <CustomLoader visible={loading} />
    </View>
  );
};

export default VerifyPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    width: '50%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: themeColors.grayBoxDark,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  backButton: {
    marginBottom: moderateScale(10),
  },
  stepText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: moderateScale(13),
    color: themeColors.white,
    marginBottom: moderateScale(6),
  },
  title: {
    fontFamily: 'UrbanistBold',
    fontSize: moderateScale(22),
    color: themeColors.white,
    // marginBottom: moderateScale(5),
    // lineHeight: moderateScale(28),
  },
  description: {
    fontFamily: 'UrbanistRegular',
    fontSize: moderateScale(10),
    color: themeColors.gray,
    marginBottom: moderateScale(20),
    marginLeft: moderateScale(2),
    // lineHeight: moderateScale(20),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  phraseBox: {
    borderWidth: 1,
    borderColor: themeColors.themeLight,
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(4),
    margin: moderateScale(5),
    flexDirection: 'row',
  },
  phraseText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: moderateScale(8),
    color: themeColors.white,
  },
  inputContainer: {
    backgroundColor: themeColors.boxBackground2Dark,
    borderWidth: 1,
    borderColor: themeColors.white,
    borderRadius: moderateScale(4),
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(6),
    paddingRight: moderateScale(10),
  },
  input: {
    backgroundColor: themeColors.boxBackground2Dark,
    color: themeColors.white,
    flex: 1,
    borderWidth: 0,
  },
});
