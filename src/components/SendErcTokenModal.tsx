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
import {ethers} from 'ethers';

interface SendErcTokenModalProps {
  popupOpen: boolean;
  closePopup: () => void;
  onSuccessFunction: (rpcObj: any) => void;
  wallet: any; // {address, privateKey, ...}
  rpcUrl: string;
  selectedErc: any; // undefined = native coin
}

const ERC20_ABI_BALANCE = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

const SendErcTokenModal: React.FC<SendErcTokenModalProps> = ({
  popupOpen,
  closePopup,
  wallet,
  rpcUrl,
  onSuccessFunction,
  selectedErc,
}) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState('');

  const handleSend = async () => {
    if (!recipient || !amount) {
      Alert.alert('Error', 'Please enter recipient and amount');
      return;
    }
    setLoading(true);
    try {
      // ERC20
      let receipt = await sendToken(
        wallet.privateKey,
        contractAddress,
        recipient,
        amount,
        rpcUrl,
      );

      setLoading(false);
      Alert.alert('✅ Success', `Tx Hash: ${receipt.transactionHash}`);
      closePopup();

      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const token = new ethers.Contract(
        contractAddress,
        ERC20_ABI_BALANCE,
        provider,
      );

      const rawBalance = await token.balanceOf(wallet.address);
      const tokenDecimals = await token.decimals();

      const formattedBalance = ethers.formatUnits(rawBalance, tokenDecimals);

      let updatedErc = selectedErc;

      updatedErc.formattedBalance = formattedBalance;
      updatedErc.contractAddress = contractAddress;

      onSuccessFunction(updatedErc);
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
        <TextInput
          value={contractAddress}
          onChangeText={val => {
            setContractAddress(val);
            if (ethers.isAddress(val)) {
            }
          }}
          placeholder="Token Contract Address"
          style={{
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 8,
            padding: 10,
            color: themeColors.black,
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
          }}
        />

        <Text
          style={{
            fontSize: scale(8),
            color: themeColors.white,
            marginBottom: 20,
            textAlign: 'right',
          }}>
          Balance : {selectedErc?.formattedBalance || 0}
        </Text>

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

export default SendErcTokenModal;
