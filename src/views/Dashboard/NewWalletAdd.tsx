/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ethers from 'ethers';
import {moderateScale} from 'react-native-size-matters';

// 🔐 Storage key
const STORAGE_KEY = 'WALLETS';

const WalletManager = () => {
  const [wallets, setWallets] = useState([]);
  const [activeWallet, setActiveWallet] = useState(null);

  useEffect(() => {
    loadWallets();
  }, []);

  // Load wallets from storage
  const loadWallets = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setWallets(parsed);
        setActiveWallet(parsed[0]); // default first wallet
      }
    } catch (err) {
      console.error('Error loading wallets', err);
    }
  };

  // Save wallets to storage
  const saveWallets = async walletArray => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(walletArray));
  };

  // Create a new wallet
  const createWallet = async () => {
    try {
      const wallet = ethers.Wallet.createRandom();
      const newWallet = {
        address: wallet.address,
        privateKey: wallet.privateKey,
      };
      const updated = [...wallets, newWallet];
      setWallets(updated);
      setActiveWallet(newWallet);
      saveWallets(updated);
      Alert.alert('Success', `New Wallet Created: ${wallet.address}`);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  // Import wallet using private key
  const importWallet = async privateKey => {
    try {
      const wallet = new ethers.Wallet(privateKey.trim());
      const newWallet = {
        address: wallet.address,
        privateKey: wallet.privateKey,
      };
      const updated = [...wallets, newWallet];
      setWallets(updated);
      setActiveWallet(newWallet);
      saveWallets(updated);
      Alert.alert('Success', `Wallet Imported: ${wallet.address}`);
    } catch (err) {
      Alert.alert('Error', 'Invalid private key');
    }
  };

  // Switch active wallet
  const switchWallet = wallet => {
    setActiveWallet(wallet);
    Alert.alert('Active Wallet Changed', wallet.address);
  };

  // Delete a wallet
  const deleteWallet = async wallet => {
    const updated = wallets.filter(w => w.address !== wallet.address);
    setWallets(updated);
    if (activeWallet?.address === wallet.address) {
      setActiveWallet(updated[0] || null);
    }
    saveWallets(updated);
  };

  // Render wallet list
  const renderWallet = ({item}) => (
    <TouchableOpacity
      onPress={() => switchWallet(item)}
      onLongPress={() => deleteWallet(item)}
      style={{
        padding: moderateScale(12),
        marginVertical: moderateScale(6),
        backgroundColor:
          activeWallet?.address === item.address ? '#4cafef' : '#222',
        borderRadius: moderateScale(8),
      }}>
      <Text style={{color: '#fff', fontSize: moderateScale(14)}}>
        {item.address}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{flex: 1, padding: moderateScale(16), backgroundColor: '#000'}}>
      <Text
        style={{color: '#fff', fontSize: moderateScale(16), marginBottom: 10}}>
        Wallet Manager
      </Text>

      <TouchableOpacity
        onPress={createWallet}
        style={{
          padding: moderateScale(12),
          backgroundColor: '#28a745',
          marginBottom: moderateScale(10),
          borderRadius: moderateScale(8),
        }}>
        <Text style={{color: '#fff', textAlign: 'center'}}>
          ➕ Create Wallet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          importWallet(
            prompt('Enter Private Key') || '', // ⚠️ Replace prompt() with a secure modal in real app
          )
        }
        style={{
          padding: moderateScale(12),
          backgroundColor: '#007bff',
          marginBottom: moderateScale(10),
          borderRadius: moderateScale(8),
        }}>
        <Text style={{color: '#fff', textAlign: 'center'}}>
          📥 Import Wallet
        </Text>
      </TouchableOpacity>

      <FlatList
        data={wallets}
        renderItem={renderWallet}
        keyExtractor={item => item.address}
      />

      {activeWallet && (
        <View
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: '#333',
            borderRadius: 8,
          }}>
          <Text style={{color: '#fff'}}>Active Wallet:</Text>
          <Text style={{color: '#4cafef', fontSize: moderateScale(12)}}>
            {activeWallet.address}
          </Text>
        </View>
      )}
    </View>
  );
};

export default WalletManager;
