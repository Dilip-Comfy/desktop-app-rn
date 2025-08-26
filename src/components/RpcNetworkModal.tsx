/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {themeColors} from '../styles/Colors';
import CustomLucideIcon from './CustomLucideIcon';
import CustomButton from './CustomButton';

interface RpcNetworkModalProps {
  popupOpen: boolean;
  closePopup: () => void;
  networks: {name: string; chainId: string; rpcUrl: string}[];
  chainId: any; // chainId of currently selected
  onSelectNetwork: (chainData: any) => void;
}

const RpcNetworkModal: React.FC<RpcNetworkModalProps> = ({
  popupOpen,
  closePopup,
  networks,
  chainId,
  onSelectNetwork,
}) => {
  const [selected, setSelected] = useState(chainId);

  if (!popupOpen) return null;

  const handleSelect = (chainId: string, chainData: any) => {
    setSelected(chainId);
    onSelectNetwork(chainData);
    closePopup();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>Select Network</Text>

        <FlatList
          data={networks}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.chainId}
          renderItem={({item}) => {
            const isActive = selected === item.chainId;
            return (
              <TouchableOpacity
                style={[styles.networkItem, isActive && styles.activeNetwork]}
                onPress={() => handleSelect(item.chainId, item)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CustomLucideIcon
                    name="Globe"
                    color={isActive ? themeColors.themeBlue : themeColors.white}
                    size={moderateScale(16)}
                  />
                  <Text
                    style={[
                      styles.networkName,
                      isActive && {color: themeColors.themeBlue},
                    ]}>
                    {item.name}
                  </Text>
                </View>
                {isActive && (
                  <CustomLucideIcon
                    name="Check"
                    color={themeColors.themeBlue}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />

        <CustomButton
          text={'Close'}
          onPress={() => {
            closePopup();
          }}
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
            borderRadius: moderateScale(5),
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: themeColors.blackTransparent70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalBox: {
    width: '70%',
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    backgroundColor: themeColors.boxBackground2Dark,
  },
  title: {
    fontSize: scale(16),
    color: themeColors.white,
    marginBottom: moderateScale(15),
    textAlign: 'center',
  },
  networkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    borderBottomWidth: 1,
    borderColor: themeColors.grayDark,
  },
  activeNetwork: {
    backgroundColor: themeColors.blackTransparent30,
    borderRadius: moderateScale(8),
  },
  networkName: {
    marginLeft: moderateScale(10),
    fontSize: scale(10),
    color: themeColors.white,
  },
  closeBtn: {
    marginTop: moderateScale(15),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
    backgroundColor: themeColors.grayDark,
  },
  closeTxt: {
    textAlign: 'center',
    fontSize: scale(14),
    color: themeColors.white,
  },
});

export default RpcNetworkModal;
