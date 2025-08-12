import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CustomLucideIcon from '../../components/CustomLucideIcon';
import {themeColors} from '../../styles/Colors';
import CustomButton from '../../components/CustomButton';

const ConfirmSecretPhrase = ({}) => {
  const [selectedWords, setSelectedWords] = useState({});
  const phraseOrder = Array.from({length: 12}, (_, i) => i + 1);
  const missingWords = ['notice', 'abuse', 'olympic'];

  const handleSelect = word => {
    const emptySlot = phraseOrder.find(num => !selectedWords[num]);
    if (emptySlot) {
      setSelectedWords(prev => ({...prev, [emptySlot]: word}));
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <CustomLucideIcon name="ArrowLeft" color={themeColors.white} />
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Step Info */}
          <Text style={styles.stepText}>Step 3 of 3</Text>
          <Text style={styles.title}>
            Confirm your Secret{'\n'}Recovery Phrase
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            Select the missing words in the correct order.
          </Text>

          {/* Phrase Grid */}
          <View style={styles.grid}>
            {phraseOrder.map(num => (
              <View
                key={num}
                style={[
                  styles.phraseBox,
                  selectedWords[num] && styles.filledBox,
                ]}>
                <Text style={styles.phraseText}>
                  {num}. {selectedWords[num] ? selectedWords[num] : '*****'}
                </Text>
              </View>
            ))}
          </View>

          {/* Word Selection */}
          <View style={styles.wordOptions}>
            {missingWords.map((word, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.wordButton}
                onPress={() => handleSelect(word)}
                activeOpacity={0.7}>
                <Text style={styles.wordButtonText}>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <CustomButton
          text={'Continue'}
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

export default ConfirmSecretPhrase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(20),
  },
  mainContainer: {
    width: '50%',
    alignSelf: 'center',
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
    color: themeColors.white,
    marginBottom: moderateScale(6),
  },
  title: {
    fontFamily: 'UrbanistBold',
    fontSize: moderateScale(22),
    color: themeColors.white,
    marginBottom: moderateScale(14),
    lineHeight: moderateScale(28),
  },
  description: {
    fontFamily: 'UrbanistRegular',
    fontSize: moderateScale(14),
    color: themeColors.white,
    marginBottom: moderateScale(20),
    lineHeight: moderateScale(20),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
  },
  phraseBox: {
    backgroundColor: themeColors.boxBackground2Dark,
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(10),
    width: '32%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColors.gray,
  },
  filledBox: {
    borderWidth: 2,
    borderColor: themeColors.themeLight,
  },
  phraseText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: moderateScale(12),
    color: themeColors.white,
  },
  wordOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  wordButton: {
    backgroundColor: themeColors.grayLight,
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(18),
    borderRadius: moderateScale(6),
  },
  wordButtonText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: moderateScale(14),
    color: themeColors.text,
  },
});
