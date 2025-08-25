/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';

import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../../styles/Colors';
import CustomLucideIcon from '../../components/CustomLucideIcon';
import IMAGES from '../../assets/images';
import CustomTextInput from '../../components/CustomTextInput';
import {
  getAllChainBalances,
  getBalance,
  RPC_LIST,
} from '../../utils/rpcNetworks';
import CustomLoader from '../../components/CustomLoader';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import SendTokenModal from '../../components/SendTokenModal';
import ReceiveTokenModal from '../../components/ReceiveTokenModal';
// import Icon from 'react-native-vector-icons/Feather';

export default function DashboardHeader({route, navigation}) {
  const [hideShow, setHideShow] = useState(false);
  const [showSendPopup, setShowSendPopup] = useState(false);
  const [showReceivePopup, setShowReceivePopup] = useState(false);

  const {wallet} = route.params;

  // console.warn('Wallet', `${wallet.address}`);
  // console.warn('privateKey', `${wallet.privateKey}`);
  // console.warn('mnemonic', `${wallet.mnemonic}`);

  const [balances, setBalances] = useState([]);
  const [totalBalance, setTotalBalance] = useState('0.0');
  const [loading, setLoading] = useState(true);

  const fetchBalances = async () => {
    try {
      setLoading(true);

      const {results, totalBalance: totalBal} = await getAllChainBalances(
        wallet.address,
        RPC_LIST,
      );

      console.log('resultss', results);

      let res = await getBalance(wallet.address);

      setBalances(results);
      setTotalBalance(res);
    } catch (e) {
      console.error('Dashboard fetch error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalances(); // auto-run when wallet changes
  }, [wallet.address]);

  const copyToClipboard = () => {
    // 1. Copy the text
    Clipboard.setString(wallet.address);

    // 2. Show the cross-platform Toast notification
    Toast.show({
      type: 'success', // or 'info', 'error', 'warning'
      text1: 'Copied!',
      text2: 'The text has been copied to your clipboard.',
      position: 'bottom', // Use 'top' or 'bottom'
      visibilityTime: 2000, // 2 seconds
    });
  };

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

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.button, styles.buyButton]}>
            <Text style={[styles.buttonText, {color: themeColors.white}]}>
              Buy ▼
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowSendPopup(true);
            }}>
            <CustomLucideIcon
              name="MoveUpRight"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowReceivePopup(true);
            }}>
            <CustomLucideIcon
              name="MoveDownLeft"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <CustomLucideIcon
              name="Network"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}> Switch Network</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <CustomLucideIcon
              name="UsersRound"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.buttonText}>Accounts </Text>
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
            <Text style={styles.titleSecond}>Decentralized Account</Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.addressTextStyle, {marginBottom: 0}]}>
                {wallet?.address}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  copyToClipboard();
                }}>
                <CustomLucideIcon
                  name="Copy"
                  color={themeColors.white}
                  style={{marginLeft: moderateScale(10)}}
                />
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.title,
                  {marginBottom: 0, fontSize: moderateScale(24)},
                ]}>
                {hideShow ? '$***' : `$${totalBalance}`}
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

          <ScrollView style={styles.container} nestedScrollEnabled>
            <ScrollView horizontal showsHorizontalScrollIndicator>
              <View>
                {/* Header */}
                <View style={styles.headerRow}>
                  <Text style={[styles.headerText, {width: moderateScale(50)}]}>
                    #
                  </Text>
                  <Text style={styles.headerText}>Token</Text>
                  <Text
                    style={[
                      styles.headerText,
                      {
                        textAlign: 'left',
                        borderWidth: 1,
                        borderColor: themeColors.white,
                        width: moderateScale(200),
                      },
                    ]}>
                    Name
                  </Text>
                  <Text style={styles.headerText}>Balance</Text>
                </View>

                {/* Data Rows */}
                {balances?.map(item => (
                  <View key={item.chainId} style={styles.dataRow}>
                    <Text style={[styles.cellText, {width: moderateScale(50)}]}>
                      {item.chainId}
                    </Text>

                    <View style={styles.tokenCell}>
                      <View style={{marginLeft: moderateScale(8)}}>
                        <Text style={styles.symbolText}>{item.symbol}</Text>
                        {/* <Text style={styles.namewhite}>{item.name} </Text> */}
                      </View>
                    </View>

                    <Text
                      style={[
                        styles.cellText,
                        {width: moderateScale(200), textAlign: 'left'},
                      ]}>
                      {item.name}
                    </Text>
                    <Text
                      style={[styles.cellText, {width: moderateScale(140)}]}>
                      {item.balance}
                    </Text>

                    {/* <Text
                      style={[
                        styles.cellText,
                        {
                          color: themeColors.themeGreen,
                          width: moderateScale(100),
                        },
                      ]}>
                      {item.balance}
                    </Text> */}
                    {/* <Text
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
                    <Text style={styles.cellText}>{item.age}</Text> */}
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        </View>
      </View>

      <SendTokenModal
        popupOpen={showSendPopup}
        closePopup={() => setShowSendPopup(false)}
        onSuccessFunction={fetchBalances}
        wallet={wallet}
        rpcUrl={'https://bsc-testnet.bnbchain.org'}
        tokenAddress={undefined} // or pass token address for ERC20
      />

      <ReceiveTokenModal
        popupOpen={showReceivePopup}
        closePopup={() => setShowReceivePopup(false)}
        // onSuccessFunction={fetchBalances}
        wallet={wallet}
        // rpcUrl={'https://bsc-testnet.bnbchain.org'}
        // tokenAddress={undefined} // or pass token address for ERC20
      />

      <CustomLoader visible={loading} />
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
    // marginBottom: moderateScale(10),
  },
  addressTextStyle: {
    // color: themeColors.white,
    fontSize: moderateScale(8),
    marginBottom: moderateScale(10),
    color: themeColors.grayMidLight,
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
    width: moderateScale(150),
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
    borderBottomWidth: 0.5,
    borderBottomColor: themeColors.borderColor,
  },
  tokenCell: {
    flexDirection: 'row',
    width: moderateScale(150),
    textAlign: 'center',
  },
  symbolText: {
    fontFamily: 'UrbanistSemiBold',
    color: themeColors.white,
    fontSize: moderateScale(12),
    width: moderateScale(130),
    textAlign: 'center',
  },
  namewhite: {
    fontFamily: 'UrbanistRegular',
    color: themeColors.grayLight,
    fontSize: moderateScale(8),
  },
  cellText: {
    fontFamily: 'UrbanistRegular',
    color: themeColors.white,
    fontSize: moderateScale(12),
    width: moderateScale(150),
    textAlign: 'center',
    borderWidth: 1,
    borderColor: themeColors.white,
  },
});
