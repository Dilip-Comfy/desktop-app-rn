/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {ImageBackground, StatusBar, Text, View} from 'react-native';
import React, {Component} from 'react';
import IMAGES from '../../assets/images';
import {moderateScale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {themeColors} from '../../styles/Colors';

export class InitialScreen extends Component {
  render() {
    return (
      <ImageBackground source={IMAGES.ic_background} style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              alignSelf: 'center',
              width: '35%',
              height: '60%',
              //   backgroundColor: 'rgba(25    5,255,255,0.3)',
              backgroundColor: themeColors.white,
              borderRadius: moderateScale(15),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: moderateScale(24),
                fontWeight: '700',
                color: '#3d065f',
                textAlign: 'center',
                width: moderateScale(100),
              }}>
              Let's get started!
            </Text>

            <CustomButton
              text={'Create A New Wallet'}
              backgroundColor={'#121314'}
              btnTxtStyle={{fontSize: moderateScale(12)}}
              height={moderateScale(35)}
              width={'80%'}
              style={{
                alignSelf: 'center',
                marginTop: moderateScale(25),
                borderRadius: moderateScale(5),
              }}
            />
            <CustomButton
              text={'I have an existing wallet'}
              backgroundColor={'#34ade2'}
              //   backgroundColor={themeColors.themeLight}
              btnTxtStyle={{fontSize: moderateScale(12)}}
              height={moderateScale(35)}
              width={'80%'}
              style={{
                alignSelf: 'center',
                marginTop: moderateScale(10),
                borderRadius: moderateScale(5),
              }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default InitialScreen;
