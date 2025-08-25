//           <Text style={{color: themeColors.white, textAlign: 'center'}}>
//             Close
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ReceiveTokenModal;

/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {moderateScale, scale} from 'react-native-size-matters';
import {themeColors} from '../styles/Colors';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import CustomLucideIcon from './CustomLucideIcon';

interface ReceiveTokenModalProps {
  popupOpen: boolean;
  closePopup: () => void;
  wallet: any; // {address, ...}
  tokenSymbol?: string; // Optional: ETH, USDT, etc.
}

const ReceiveTokenModal: React.FC<ReceiveTokenModalProps> = ({
  popupOpen,
  closePopup,
  wallet,
  tokenSymbol = 'ethereum',
}) => {
  const [randomId, setRandomId] = useState(Math.floor(Math.random() * 1000000));

  if (!popupOpen) return null;

  const qrValue = `${tokenSymbol}:${wallet.address}`;

  const regenerateQR = () => {
    setRandomId(Math.floor(Math.random() * 1000000));
  };

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
          width: '60%',
          padding: 20,
          borderRadius: 12,
          backgroundColor: themeColors.boxBackground2Dark,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: scale(16),
            color: themeColors.white,
            marginVertical: moderateScale(15),
            textAlign: 'center',
          }}>
          Receive Token
        </Text>

        <View
          style={{
            backgroundColor: themeColors.white,
            padding: moderateScale(8),
            borderRadius: moderateScale(8),
          }}>
          <QRCode value={qrValue} size={200} color={themeColors.black} />
        </View>

        <Text
          style={{
            fontSize: scale(7),
            color: themeColors.grayLight,
            textAlign: 'center',
            marginTop: moderateScale(15),
          }}>
          {wallet.address}
        </Text>

        <TouchableOpacity
          onPress={() => {
            copyToClipboard();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: moderateScale(5),
          }}>
          <CustomLucideIcon
            name="Copy"
            color={themeColors.themeBlue}
            style={{marginLeft: moderateScale(10)}}
          />
          <Text
            style={{
              color: themeColors.themeBlue,
              fontSize: scale(6),
              fontWeight: '600',
              marginLeft: moderateScale(5),
            }}>
            Copy Address
          </Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', marginTop: moderateScale(10)}}>
          <TouchableOpacity
            onPress={regenerateQR}
            style={{
              backgroundColor: themeColors.grayDark,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 15,
              marginRight: moderateScale(10),
            }}>
            <Text style={{color: themeColors.white}}>New QR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={closePopup}
            style={{
              backgroundColor: themeColors.grayDark,
              borderRadius: 8,
              paddingVertical: 12,
              paddingHorizontal: 15,
            }}>
            <Text style={{color: themeColors.white}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReceiveTokenModal;
