import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {themeColors} from '../../styles/Colors';
import CustomButton from '../../components/CustomButton';
import CustomLucideIcon from '../../components/CustomLucideIcon';
// import {generateMnemonic} from 'bip39';
import {generateMnemonic} from '../../utils/bip39-m';
// import CustomLucideIcon from '../../components/CustomLucideIcon';

const SecretPhrase = ({navigation}) => {
  const [mnemonic, setMnemonic] = useState([]);
  const [mnemonicWords, setMnemonicWords] = useState([]);

  const handleGenerate = () => {
    const phrases = generateMnemonic(); // 24 words
    let finalPhrases = phrases.split(' ');
    setMnemonic(finalPhrases);
    setMnemonicWords(phrases);
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}>
          <CustomLucideIcon name="ArrowLeft" color={themeColors.white} />
        </TouchableOpacity>

        <View>
          {/* Step Info */}
          <Text style={styles.stepText}>Step 2 of 3</Text>
          <Text style={styles.title}>
            Save your Secret{'\n'}Recovery Phrase
          </Text>

          {/* Description */}
          <Text style={styles.stepText}>
            This is your Secret Recovery Phrase. Write it down in the correct
            order and keep it safe. If someone has your Secret Recovery Phrase,
            they can access your wallet.
          </Text>

          <Text
            style={[
              styles.stepText,
              {
                color: themeColors.themeRed,
                marginVertical: moderateScale(15),
                marginBottom: moderateScale(10),
              },
            ]}>
            Don’t share it with anyone, ever.
          </Text>

          {/* Phrase Grid */}
          <View style={styles.grid}>
            {mnemonic?.map((word, index) => (
              <View key={index} style={styles.phraseBox}>
                <Text style={styles.phraseText}>
                  {index + 1}. {word}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <CustomButton
          text={'Continue'}
          onPress={() =>
            navigation.navigate('ConfirmSecretPhrase', {
              generatedPhrases: mnemonicWords,
            })
          }
          backgroundColor={themeColors.white}
          btnTxtStyle={{
            fontSize: moderateScale(12),
            color: themeColors.black,
            fontWeight: '600',
          }}
          height={moderateScale(32)}
          width={'80%'}
          style={{
            alignSelf: 'center',
            marginVertical: moderateScale(15),
            borderRadius: moderateScale(5),
          }}
        />
      </View>
    </View>
  );
};

export default SecretPhrase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    width: '70%',

    borderWidth: 1,
    borderColor: themeColors.grayBoxDark,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },

  backButton: {
    marginBottom: moderateScale(10),
  },

  stepText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: moderateScale(12),
    color: themeColors.textDark,
    marginBottom: moderateScale(6),
  },
  title: {
    fontFamily: 'UrbanistBold',
    fontSize: moderateScale(20),
    color: themeColors.textDark,
    marginBottom: moderateScale(14),
    lineHeight: moderateScale(28),
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  phraseBox: {
    backgroundColor: themeColors.boxBackground2Dark,
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(10),
    width: '24%',
    alignItems: 'center',
  },
  phraseText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: moderateScale(8),
    color: themeColors.white,
  },
});
