/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {sendNative, sendToken} from '../utils/bip39-m'; // ✅ adjust import path
import {themeColors} from '../styles/Colors';

interface SendTokenModalProps {
  popupOpen: boolean;
  closePopup: () => void;
  onSuccessFunction: () => void;
  wallet: any; // {address, privateKey, ...}
  rpcUrl: string;
  tokenAddress?: string; // undefined = native coin
}

const SendTokenModal: React.FC<SendTokenModalProps> = ({
  popupOpen,
  closePopup,
  wallet,
  rpcUrl,
  onSuccessFunction,
  tokenAddress,
}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  //   const handleSend = async () => {
  //     if (!recipient || !amount) {
  //       Alert.alert('Error', 'Please enter recipient and amount');
  //       return;
  //     }
  //     setLoading(true);
  //     try {
  //       let receipt;
  //       if (tokenAddress) {
  //         // ERC20
  //         receipt = await sendToken(
  //           wallet.privateKey,
  //           tokenAddress,
  //           recipient,
  //           amount,
  //           rpcUrl,
  //         );
  //       } else {
  //         // Native coin
  //         receipt = await sendNative(
  //           wallet.privateKey,
  //           recipient,
  //           amount,
  //           rpcUrl,
  //         );
  //       }
  //       setLoading(false);
  //       Alert.alert('✅ Success', `Tx Hash: ${receipt.transactionHash}`);
  //       closePopup();
  //       setRecipient('');
  //       setAmount('');
  //     } catch (err: any) {
  //       console.error(err);
  //       setLoading(false);
  //       Alert.alert('❌ Error', err?.message || 'Transaction failed');
  //     }
  //   };

  const handleSend = async () => {
    if (!recipient || !amount) {
      Alert.alert('Error', 'Please enter recipient and amount');
      return;
    }

    setLoading(true);
    try {
      const receipt = await sendNative(
        wallet.privateKey,
        recipient,
        amount,
        rpcUrl,
      );

      setLoading(false);
      Alert.alert('✅ Success', `Tx Hash: ${receipt.transactionHash}`);

      closePopup();
      onSuccessFunction();
      setRecipient('');
      setAmount('');
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      Alert.alert('❌ Error', err?.message || 'Transaction failed');
    }
  };

  if (!popupOpen) return null; // 🔑 don't render when closed

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: themeColors.blackTransparent70,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999, // ensures it's on top
      }}>
      <View
        style={{
          width: '60%',

          padding: 20,
          borderRadius: 12,
          backgroundColor: themeColors.boxBackground2Dark,
        }}>
        <Text
          style={{
            fontSize: scale(16),
            color: themeColors.white,
            marginVertical: moderateScale(15),
            textAlign: 'center',
          }}>
          Send Token
        </Text>

        {/* Recipient Input */}
        <TextInput
          value={recipient}
          onChangeText={setRecipient}
          placeholder="Recipient Address"
          style={{
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
        />

        {/* Amount Input */}
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount"
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
          }}
        />

        {/* Buttons */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={closePopup}
            disabled={loading}
            style={{
              flex: 1,
              marginRight: 8,
              backgroundColor: '#EDEDED',
              borderRadius: 8,
              paddingVertical: 12,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#000',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSend}
            disabled={loading}
            style={{
              flex: 1,
              marginLeft: 8,
              backgroundColor: themeColors.grayDark,
              borderRadius: 8,
              paddingVertical: 12,
            }}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  color: '#FFF',
                }}>
                Send
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SendTokenModal;
