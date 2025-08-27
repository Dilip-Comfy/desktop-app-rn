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
import CustomDropdown from '../../components/CustomDropdown';
import {Dropdown} from 'react-native-element-dropdown';
import RpcNetworkModal from '../../components/RpcNetworkModal';
import AddNewTokenModal from '../../components/AddNewTokenModal';
import SendErcTokenModal from '../../components/SendErcTokenModal';
import {getTokenBalance} from '../../utils/bip39-m';

// import Icon from 'react-native-vector-icons/Feather';
// console.warn('Wallet', `${wallet.address}`);
// console.warn('privateKey', `${wallet.privateKey}`);
// console.warn('mnemonic', `${wallet.mnemonic}`);
export default function DashboardHeader({route, navigation}) {
  const [hideShow, setHideShow] = useState(false);
  const [showSendPopup, setShowSendPopup] = useState(false);
  const [showSendTokenPopup, setShowSendTokenPopup] = useState(false);
  const [showReceivePopup, setShowReceivePopup] = useState(false);
  const [isRpcModalOpen, setIsRpcModalOpen] = useState(false);
  const [addTokenModalOpen, setAddTokenModalOpen] = useState(false);
  const [selectedRpc, setSelectedRpc] = useState({});
  const [selectedErc, setSelectedErc] = useState({});
  const {wallet} = route.params;

  const [rpcListData, setRpcListData] = useState([]);
  const [newRpcListData, setNewRpcListData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBalances = async () => {
    try {
      setLoading(true);

      const {results, totalBalance: totalBal} = await getAllChainBalances(
        wallet.address,
        RPC_LIST,
      );

      setRpcListData(results);
      setSelectedRpc(results[0]);
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

  const updateTokenBalance = async (chainId, tokenObj) => {
    try {
      // get fresh balance for only this token
      const updatedToken = await getTokenBalance(
        wallet.address,
        tokenObj,
        chainId,
      );

      setRpcListData(prev =>
        prev.map(network => {
          if (network.chainId === chainId) {
            return {
              ...network,
              ercTokenList: network.ercTokenList.map(token =>
                token.tokenAddress === updatedToken.tokenAddress
                  ? updatedToken // replace balance
                  : token,
              ),
            };
          }
          return network;
        }),
      );

      // update selectedRpc too if we are on that network
      setSelectedRpc(prev =>
        prev && prev.chainId === chainId
          ? {
              ...prev,
              ercTokenList: prev.ercTokenList.map(token =>
                token.tokenAddress === updatedToken.tokenAddress
                  ? updatedToken
                  : token,
              ),
            }
          : prev,
      );
    } catch (e) {
      console.error('Update balance error', e);
    }
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

          {/* <CustomTextInput
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
          /> */}
        </View>

        <View style={styles.actionsRow}>
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

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsRpcModalOpen(true);
            }}>
            <CustomLucideIcon
              name="Network"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <View>
              <Text style={styles.buttonText}>Switch Network</Text>
              <Text
                style={[
                  styles.buttonText,
                  {fontWeight: '500', color: themeColors.themeColor},
                ]}>
                {selectedRpc?.name}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <CustomLucideIcon
              name="UsersRound"
              color={themeColors.black}
              style={{marginRight: moderateScale(5)}}
            />
            <View>
              <Text style={styles.buttonText}>Default Accounts</Text>
              <Text
                style={[
                  styles.buttonText,
                  {fontWeight: '500', color: themeColors.themeColor},
                ]}>
                {wallet?.address?.substring(0, 5) +
                  '...' +
                  wallet?.address?.slice(-5)}
              </Text>
            </View>
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
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
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
                  {hideShow ? '$***' : `$${selectedRpc?.balance || 0}`}
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

              {/* <Text
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
            </Text> */}
            </View>
            <TouchableOpacity
              onPress={() => setAddTokenModalOpen(true)}
              style={[styles.button, {height: moderateScale(20)}]}>
              <CustomLucideIcon
                name="Coins"
                color={themeColors.black}
                style={{marginRight: moderateScale(5)}}
              />
              <Text style={styles.buttonText}>Add Token</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <ScrollView>
              <View>
                {/* Header */}
                <View style={styles.headerRow}>
                  <Text style={[styles.headerText, {width: moderateScale(60)}]}>
                    Token Id
                  </Text>
                  <Text
                    style={[styles.headerText, {width: moderateScale(120)}]}>
                    Token
                  </Text>
                  <Text
                    style={[
                      styles.headerText,
                      {
                        textAlign: 'left',
                        width: moderateScale(150),
                      },
                    ]}>
                    Name
                  </Text>
                  <Text
                    style={[
                      styles.headerText,
                      {
                        textAlign: 'left',
                        width: moderateScale(80),
                      },
                    ]}>
                    Balance
                  </Text>
                </View>

                {/* Data Rows */}

                <View key={selectedRpc?.chainId} style={styles.dataRow}>
                  <Text style={[styles.cellText, {width: moderateScale(60)}]}>
                    {selectedRpc?.chainId}
                  </Text>

                  <Text style={styles.symbolText}>{selectedRpc?.symbol}</Text>

                  <Text
                    style={[
                      styles.cellText,
                      {
                        width: moderateScale(150),
                        textAlign: 'left',
                      },
                    ]}>
                    {selectedRpc?.name}
                  </Text>
                  <Text
                    style={[
                      styles.cellText,
                      {
                        width: moderateScale(100),
                        textAlign: 'left',
                        backgroundColor: themeColors.themeBarBlue,
                      },
                    ]}>
                    {selectedRpc?.balance}
                  </Text>
                </View>

                {selectedRpc?.ercTokenList?.map(item => (
                  <View style={styles.dataRow}>
                    <Text style={[styles.cellText, {width: moderateScale(60)}]}>
                      {/* {item?.chainId} */}0
                    </Text>

                    <Text style={styles.symbolText}>{item?.tokenSymbol}</Text>

                    <Text
                      style={[
                        styles.cellText,
                        {
                          width: moderateScale(150),
                          textAlign: 'left',
                        },
                      ]}>
                      {item?.tokenName}
                    </Text>
                    <Text
                      style={[
                        styles.cellText,
                        {width: moderateScale(90), textAlign: 'left'},
                      ]}>
                      {item?.formattedBalance}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        setSelectedErc(item);
                        console.warn(item.formattedBalance);
                        setShowSendTokenPopup(true);
                      }}
                      style={[
                        styles.button,
                        {
                          backgroundColor: themeColors.white,
                          paddingVertical: moderateScale(2),
                        },
                      ]}>
                      <Text
                        style={[
                          {
                            color: themeColors.black,
                            // fontSize: moderateScale(10),
                          },
                        ]}>
                        Send
                      </Text>
                      <CustomLucideIcon
                        name="Send"
                        color={themeColors.black}
                        style={{marginLeft: moderateScale(5)}}
                        size={moderateScale(8)}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
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

      <RpcNetworkModal
        popupOpen={isRpcModalOpen}
        closePopup={() => setIsRpcModalOpen(false)}
        networks={rpcListData}
        chainId={selectedRpc?.chainId}
        onSelectNetwork={rpc => {
          setSelectedRpc(rpc);
        }}
      />

      <AddNewTokenModal
        popupOpen={addTokenModalOpen}
        closePopup={() => setAddTokenModalOpen(false)}
        onSuccessFunction={fetchBalances}
        networkData={rpcListData}
        onAddDone={tokenObj => {
          setRpcListData(prev =>
            prev.map(network => {
              if (network.chainId === tokenObj.network.dataObj.chainId) {
                const updatedNetwork = {
                  ...network,
                  ercTokenList: [...(network.ercTokenList || []), tokenObj],
                };
                setSelectedRpc(updatedNetwork); // keep selected in sync
                return updatedNetwork;
              }
              return network;
            }),
          );
        }}
        wallet={wallet}
        rpcUrl={'https://bsc-testnet.bnbchain.org'}
      />

      <SendErcTokenModal
        popupOpen={showSendTokenPopup}
        closePopup={() => setShowSendTokenPopup(false)}
        onSuccessFunction={updatedErc => {
          // 🔹 Update rpcListData
          setRpcListData(prev =>
            prev.map(network => {
              // only update the network which has the ERC token we sent
              if (
                network.ercTokenList?.some(
                  token => token.symbol === updatedErc.symbol,
                )
              ) {
                return {
                  ...network,
                  ercTokenList: network.ercTokenList.map(token =>
                    token.symbol === updatedErc.symbol
                      ? {
                          ...token,
                          formattedBalance: updatedErc.formattedBalance,
                        }
                      : token,
                  ),
                };
              }
              return network;
            }),
          );

          // 🔹 Keep selectedRpc in sync (if it's the same network)
          setSelectedRpc(prev =>
            prev?.ercTokenList?.some(
              token => token.symbol === updatedErc.symbol,
            )
              ? {
                  ...prev,
                  ercTokenList: prev.ercTokenList.map(token =>
                    token.symbol === updatedErc.symbol
                      ? {
                          ...token,
                          formattedBalance: updatedErc.formattedBalance,
                        }
                      : token,
                  ),
                }
              : prev,
          );
        }}
        wallet={wallet}
        rpcUrl={'https://bsc-testnet.bnbchain.org'}
        selectedErc={selectedErc}
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
    borderBottomColor: themeColors.white,
    alignItems: 'center',
  },
  tokenCell: {
    flexDirection: 'row',
    width: moderateScale(120),
    textAlign: 'center',
    borderWidth: 1,
    borderColor: themeColors.white,
  },
  symbolText: {
    fontFamily: 'UrbanistSemiBold',
    color: themeColors.white,
    fontSize: moderateScale(12),
    width: moderateScale(120),
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
  },
});

const dropDownStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
