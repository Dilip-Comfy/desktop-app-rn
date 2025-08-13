import React from 'react';
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
// import CustomLucideIcon from '../../components/CustomLucideIcon';

const SecretPhrase = ({navigation}) => {
  const phrase = [
    'purity',
    'notice',
    'pink',
    'abuse',
    'urge',
    'random',
    'coffee',
    'silver',
    'olympic',
    'problem',
    'energy',
    'segment',
  ];

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
            {phrase.map((word, index) => (
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
          onPress={() => navigation.navigate('ConfirmSecretPhrase')}
          backgroundColor={themeColors.white}
          btnTxtStyle={{
            fontSize: moderateScale(12),
            color: themeColors.black,
            fontWeight: '600',
          }}
          height={moderateScale(35)}
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
    width: '50%',

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
    fontSize: moderateScale(13),
    color: themeColors.textDark,
    marginBottom: moderateScale(6),
  },
  title: {
    fontFamily: 'UrbanistBold',
    fontSize: moderateScale(22),
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
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(10),
    width: '32%',
    alignItems: 'center',
  },
  phraseText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: moderateScale(12),
    color: themeColors.white,
  },
  continueButton: {
    backgroundColor: themeColors.themeColor,
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    alignItems: 'center',
    position: 'absolute',
    bottom: moderateScale(20),
    left: moderateScale(16),
    right: moderateScale(16),
  },
});
