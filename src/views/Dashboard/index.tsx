/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../../styles/Colors';
import CustomLucideIcon from '../../components/CustomLucideIcon';
import IMAGES from '../../assets/images';
import CustomTextInput from '../../components/CustomTextInput';

// import Icon from 'react-native-vector-icons/Feather';

const cryptoData = [
  {
    rank: 1,
    icon: '',
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$4,709.33',
    change24h: '+$373.14',
    changePct24h: '+7.92%',
    marketCap: '$568.1B',
    age: '8y',
    fdv: '$578/2B',
  },
  {
    rank: 2,
    icon: '',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    price: '$120,498.00',
    change24h: '+$1,429.13',
    changePct24h: '+1.19%',
    marketCap: '$15.3B',
    age: '8y',
    fdv: '$578/2B',
  },
  {
    rank: 3,
    icon: '',
    symbol: 'MGC',
    name: 'Meta Games Coin',
    price: '$2.26',
    change24h: '+$0.03',
    changePct24h: '+1.49%',
    marketCap: '$226.3B',
    age: '1y',
    fdv: '$578/2B',
  },
  {
    rank: 4,
    icon: '',
    symbol: 'LINK',
    name: 'ChainLink Token',
    price: '$23.90',
    change24h: '+$1.62',
    changePct24h: '+6.77%',
    marketCap: '$16.2B',
    age: '1y',
    fdv: '$578/2B',
  },
  {
    rank: 5,
    icon: '',
    symbol: 'GRD',
    name: 'GRADE',
    price: '$280.86',
    change24h: '+$5.67',
    changePct24h: '+2.02%',
    marketCap: '$14.6B',
    age: '7M',
    fdv: '$578/2B',
  },
  {
    rank: 6,
    icon: '',
    symbol: 'MGC',
    name: 'Meta Games Coin',
    price: '$2.26',
    change24h: '+$0.03',
    changePct24h: '+1.49%',
    marketCap: '$226.3B',
    age: '1y',
    fdv: '$578/2B',
  },
  {
    rank: 7,
    icon: '',
    symbol: 'LINK',
    name: 'ChainLink Token',
    price: '$23.90',
    change24h: '+$1.62',
    changePct24h: '+6.77%',
    marketCap: '$16.2B',
    age: '1y',
    fdv: '$578/2B',
  },
  {
    rank: 8,
    icon: '',
    symbol: 'GRD',
    name: 'GRADE',
    price: '$280.86',
    change24h: '+$5.67',
    changePct24h: '+2.02%',
    marketCap: '$14.6B',
    age: '7M',
    fdv: '$578/2B',
  },
];

export default function DashboardHeader() {
  const [hideShow, setHideShow] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.im_logo}
        resizeMode="cover"
        style={{
          height: moderateScale(50),
          aspectRatio: 1 / 1,
          alignSelf: 'center',
          marginVertical: moderateScale(15),
        }}
      />
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: moderateScale(10),
          }}>
          <Text style={[styles.title, {flex: 1}]}>Dashboard</Text>

          <CustomTextInput
            title=""
            icon={
              <CustomLucideIcon
                name="Search"
                color={themeColors.white}
                style={{marginHorizontal: moderateScale(5)}}
              />
            }
            placeholder="Search for a token..."
            placeholderTextColor={themeColors.white}
            style={{
              width: '35%',
              backgroundColor: themeColors.transparent,
              marginBottom: 0,
            }}
            customInputContainerStyle={{
              height: moderateScale(25),
              borderRadius: moderateScale(2),
              backgroundColor: themeColors.transparent,
              borderWidth: 0.5,
              borderColor: themeColors.grayLight,
            }}
            inputStyle={{
              height: moderateScale(20),
              backgroundColor: themeColors.transparent,
              color: themeColors.white,
              fontSize: moderateScale(12),
            }}
          />
        </View>
        {/*
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.button, styles.buyButton]}>
            <Text style={[styles.buttonText, {color: themeColors.white}]}>
              Buy ▼
            </Text>
          </TouchableOpacity>

          {[
            {label: 'Swap', icon: 'RefreshCcw'},
            {label: 'Bridge', icon: 'Waypoints'},
            {label: 'Send', icon: 'MoveUpRight'},
            {label: 'Sell', icon: 'Minus'},
            {label: 'Stake', icon: 'Sprout'},
            {label: 'Network', icon: 'Network'},
            {label: 'Accounts', icon: 'UsersRound'},
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <CustomLucideIcon
                name={item.icon}
                color={themeColors.black}
                style={{marginRight: moderateScale(5)}}
              />
              <Text style={styles.buttonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View> */}

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.button, styles.buyButton]}>
            <Text style={[styles.buttonText, {color: themeColors.white}]}>
              Buy ▼
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <CustomLucideIcon
              name="RefreshCcw"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}>Swap</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <CustomLucideIcon
              name="Waypoints"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}>Bridge</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <CustomLucideIcon
              name="MoveUpRight"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <CustomLucideIcon
              name="Minus"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}>Sell</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <CustomLucideIcon
              name="Sprout"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}>Stake</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <CustomLucideIcon
              name="Network"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}>Network</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <CustomLucideIcon
              name="UsersRound"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}>Accounts</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: moderateScale(10),
            padding: moderateScale(10),
            borderWidth: 0.8,
            borderColor: themeColors.gray,
          }}>
          <View>
            <Text style={styles.titleSecond}>Decentralized Accounts</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.title,
                  {marginBottom: 0, fontSize: moderateScale(24)},
                ]}>
                {hideShow ? '***' : '$0.00'}
              </Text>

              <TouchableOpacity
                onPress={() => setHideShow(!hideShow)}
                style={{marginLeft: moderateScale(5)}}>
                <CustomLucideIcon
                  name={hideShow ? 'Eye' : 'EyeOff'}
                  size={moderateScale(25)}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.title,
                {
                  marginBottom: 0,
                  fontSize: moderateScale(12),
                  fontWeight: '500',
                  color: themeColors.themeRed,
                  marginVertical: moderateScale(10),
                },
              ]}>
              $0.00 (0.00%)
            </Text>
          </View>
          {/* 
          <ScrollView horizontal style={styles.container}>
            <View>

              <View style={styles.headerRow}>
                <Text style={styles.headerText}>#</Text>
                <Text style={styles.headerText}>Token</Text>
                <Text style={styles.headerText}>Price</Text>
                <Text style={styles.headerText}>Change (24h)</Text>
                <Text style={styles.headerText}>Change % (24h)</Text>
                <Text style={styles.headerText}>Market Cap</Text>
                <Text style={styles.headerText}>Age</Text>
              </View>


              {cryptoData.map(item => (
                <View key={item.rank} style={styles.dataRow}>
                  <Text style={styles.cellText}>{item.rank}</Text>
                  <View style={styles.tokenCell}>
                 
                    <View style={{marginLeft: moderateScale(8)}}>
                      <Text style={styles.symbolText}>{item.symbol}</Text>
                      <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                  </View>
                  <Text style={styles.cellText}>{item.price}</Text>
                  <Text
                    style={[styles.cellText, {color: themeColors.themeGreen}]}>
                    {item.change24h}
                  </Text>
                  <Text
                    style={[styles.cellText, {color: themeColors.themeGreen}]}>
                    {item.changePct24h}
                  </Text>
                  <Text style={styles.cellText}>{item.marketCap}</Text>
                  <Text style={styles.cellText}>{item.age}</Text>
                </View>
              ))}
            </View>
          </ScrollView> */}
          <ScrollView style={styles.container} nestedScrollEnabled>
            <ScrollView horizontal showsHorizontalScrollIndicator>
              <View>
                {/* Header */}
                <View style={styles.headerRow}>
                  <Text style={styles.headerText}>#</Text>
                  <Text style={styles.headerText}>Token</Text>
                  <Text style={styles.headerText}>Price</Text>
                  <Text style={styles.headerText}>Change (24h)</Text>
                  <Text style={styles.headerText}>Change % (24h)</Text>
                  <Text style={styles.headerText}>Market Cap</Text>
                  <Text style={styles.headerText}>FDV</Text>
                  <Text
                    style={[
                      styles.headerText,
                      {marginLeft: moderateScale(-15)},
                    ]}>
                    Age
                  </Text>
                </View>

                {/* Data Rows */}
                {cryptoData.map(item => (
                  <View key={item.rank} style={styles.dataRow}>
                    <Text style={styles.cellText}>{item.rank}</Text>

                    <View style={styles.tokenCell}>
                      <View style={{marginLeft: moderateScale(8)}}>
                        <Text style={styles.symbolText}>{item.symbol}</Text>
                        <Text style={styles.nameText}>{item.name}</Text>
                      </View>
                    </View>

                    <Text style={styles.cellText}>{item.price}</Text>

                    <Text
                      style={[
                        styles.cellText,
                        {
                          color: themeColors.themeGreen,
                          width: moderateScale(100),
                        },
                      ]}>
                      {item.change24h}
                    </Text>
                    <Text
                      style={[
                        styles.cellText,
                        {
                          color: themeColors.themeGreen,
                          marginLeft: moderateScale(15),
                        },
                      ]}>
                      {item.changePct24h}
                    </Text>
                    <Text style={styles.cellText}>{item.marketCap}</Text>
                    <Text style={styles.cellText}>{item.fdv}</Text>
                    <Text style={styles.cellText}>{item.age}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
    padding: moderateScale(10),
  },
  title: {
    color: themeColors.white,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
  },

  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(8),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.white,
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(5),
    // gap: moderateScale(5),
  },
  buyButton: {
    borderWidth: 1.2,
    borderColor: themeColors.grayLight,
    backgroundColor: themeColors.transparent,
  },
  buyText: {
    color: themeColors.white,
    fontSize: moderateScale(10),
  },
  buttonText: {
    color: themeColors.text,
    fontSize: moderateScale(8),
  },

  titleSecond: {
    color: themeColors.white,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
  },

  // sdfsdf
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: themeColors.borderColor,
    paddingVertical: moderateScale(8),
  },
  headerText: {
    fontFamily: 'UrbanistSemiBold',
    color: themeColors.white,
    fontSize: moderateScale(12),
    width: moderateScale(120),
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
    borderBottomWidth: 0.5,
    borderBottomColor: themeColors.borderColor,
  },
  tokenCell: {
    flexDirection: 'row',
    width: moderateScale(120),
  },
  symbolText: {
    fontFamily: 'UrbanistSemiBold',
    color: themeColors.white,
    fontSize: moderateScale(12),
  },
  namewhite: {
    fontFamily: 'UrbanistRegular',
    color: themeColors.grayLight,
    fontSize: moderateScale(10),
  },
  cellText: {
    fontFamily: 'UrbanistRegular',
    color: themeColors.white,
    fontSize: moderateScale(12),
    width: moderateScale(120),
  },
});
