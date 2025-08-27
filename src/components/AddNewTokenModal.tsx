/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {ethers} from 'ethers';
import {themeColors} from '../styles/Colors';
import CustomDropdown from './CustomDropdown';
import {getTokenBalance} from '../utils/bip39-m';

interface AddNewTokenModalProps {
  popupOpen: boolean;
  closePopup: () => void;
  onSuccessFunction: () => void;
  wallet: any; // {address, privateKey, ...}
  rpcUrl: string;
  onAddDone: (rpcObj) => void;
  networkData: any;
}

const ERC20_ABI_FETCH = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
];

const ERC20_ABI_BALANCE = [
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
];

const AddNewTokenModal: React.FC<AddNewTokenModalProps> = ({
  popupOpen,
  closePopup,
  wallet,
  rpcUrl,
  onSuccessFunction,
  onAddDone,
  networkData,
}) => {
  const [contractAddress, setContractAddress] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedNetworkName, setSelectedNetworkName] = useState<string | null>(
    null,
  );
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [networks, setNetworks] = useState([]);

  useEffect(() => {
    const transformed = networkData?.map(item => ({
      label: item.name,
      value: item.name,
      dataObj: item,
    }));
    // Alert.alert(`${transformed}`);
    setNetworks(transformed);
  }, [networkData]);

  // 👉 Fetch Token Info when contract address is entered
  const fetchTokenInfo = async (address: string) => {
    try {
      if (!ethers.isAddress(address)) {
        Alert.alert('Invalid', 'Please enter a valid contract address');
        return;
      }
      if (!selectedNetwork) {
        Alert.alert('Select Network', 'Please choose a network first');
        return;
      }

      setLoading(true);
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const token = new ethers.Contract(address, ERC20_ABI_FETCH, provider);

      const tokenName = await token.name();
      const tokenSymbol = await token.symbol();
      const tokenDecimals = await token.decimals();

      setName(tokenName);
      setSymbol(tokenSymbol);
      setDecimals(tokenDecimals.toString());
    } catch (err: any) {
      console.error(err);
      Alert.alert('❌ Error', 'Unable to fetch token info');
    } finally {
      setLoading(false);
    }
  };

  // 👉 Fetch balance when "Add" button is pressed
  const fetchBalance = async () => {
    try {
      setLoading(true);
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const token = new ethers.Contract(
        contractAddress,
        ERC20_ABI_BALANCE,
        provider,
      );

      const rawBalance = await token.balanceOf(wallet.address);
      const tokenDecimals = await token.decimals();
      const tokenSymbol = await token.symbol();

      const formattedBalance = ethers.formatUnits(rawBalance, tokenDecimals);

      Alert.alert(
        '✅ Token Added',
        `You have ${formattedBalance} ${tokenSymbol}`,
      );

      // onSuccessFunction();
      let rpcObj = {
        tokenName: name,
        tokenSymbol,
        tokenDecimals,
        formattedBalance,
        network: selectedNetwork,
      };
      onAddDone(rpcObj);
      setContractAddress('');
      setSymbol('');
      setDecimals('');
      closePopup();
    } catch (err: any) {
      console.error(err);
      Alert.alert('❌ Error', err?.message || 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  if (!popupOpen) return null;
  console.log(`${networks[0]?.label}`);
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
        zIndex: 999,
      }}>
      <View
        style={{
          width: '70%',
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
          Import Token
        </Text>

        <CustomDropdown
          items={networks}
          placeholder="Select Network"
          value={selectedNetworkName}
          setValue={setSelectedNetworkName}
          setSelectedItem={value => {
            console.warn(`${value.dataObj.chainId}`);
            setSelectedNetwork(value);
          }}
          containerStyle={{width: '100%'}}
          dropdownStyle={{backgroundColor: themeColors.white}}
          textStyle={{}}
        />

        <Text style={styles.textHeaderStyle}>Token Contract Address</Text>
        <TextInput
          value={contractAddress}
          onChangeText={val => {
            setContractAddress(val);
            if (ethers.isAddress(val)) {
              fetchTokenInfo(val);
            }
          }}
          placeholder="Token Contract Address"
          style={{
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 8,
            padding: 10,
            color: themeColors.black,
          }}
        />

        {/* Token Symbol */}

        <Text style={styles.textHeaderStyle}>Token Symbol</Text>
        <TextInput
          value={symbol}
          editable={false}
          placeholder="Token Symbol"
          style={{
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 8,
            padding: 10,
            color: themeColors.black,
          }}
        />

        <Text style={styles.textHeaderStyle}>Decimals</Text>
        {/* Decimals */}
        <TextInput
          value={decimals}
          editable={false}
          placeholder="Decimals"
          style={{
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
            color: themeColors.black,
          }}
        />

        {/* Buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: moderateScale(15),
          }}>
          <TouchableOpacity
            onPress={() => {
              setContractAddress('');
              setSymbol('');
              setDecimals('');
              closePopup();
            }}
            disabled={loading}
            style={{
              flex: 1,
              marginRight: 8,
              backgroundColor: '#EDEDED',
              borderRadius: 8,
              paddingVertical: 12,
            }}>
            <Text style={{textAlign: 'center', color: '#000'}}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={fetchBalance}
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
              <Text style={{textAlign: 'center', color: '#FFF'}}>Add</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddNewTokenModal;

const styles = StyleSheet.create({
  textHeaderStyle: {
    fontSize: scale(8),
    color: themeColors.white,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(5),
  },
});
