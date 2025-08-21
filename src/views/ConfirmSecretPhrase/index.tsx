import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CustomLucideIcon from '../../components/CustomLucideIcon';
import {themeColors} from '../../styles/Colors';
import CustomButton from '../../components/CustomButton';
import {walletFromMnemonic} from '../../utils/bip39-m';

const ConfirmSecretPhrase = ({route, navigation}) => {
  const {generatedPhrases} = route.params; // ✅ from previous screen
  const phraseWords = generatedPhrases.split(' '); // original 12/24 words
  // shuffle words
  const shuffled = [...phraseWords].sort(() => Math.random() - 0.5);

  const [availableWords, setAvailableWords] = useState(shuffled);
  const [selectedWords, setSelectedWords] = useState([]);

  const handleSelectWord = (word, index) => {
    setSelectedWords([...selectedWords, word]);
    const updated = [...availableWords];
    updated[index] = null; // ✅ keep space but hide word
    setAvailableWords(updated);
  };

  const handleDeselectWord = (word, index) => {
    // remove from selected
    const updatedSelected = [...selectedWords];
    const removedWord = updatedSelected.splice(index, 1)[0];
    setSelectedWords(updatedSelected);

    // put back into available (replace first null slot)
    const updated = [...availableWords];
    const emptyIndex = updated.indexOf(null);
    if (emptyIndex !== -1) updated[emptyIndex] = removedWord;
    else updated.push(removedWord);
    setAvailableWords(updated);
  };
  const handleClearAll = () => {
    setSelectedWords([]); // reset grid
    setAvailableWords(shuffled); // restore original shuffled list
  };

  // const handleProceed = () => {
  //   if (selectedWords.length !== phraseWords.length) {
  //     Alert.alert('Error', 'Please select all words before continuing');
  //   } else if (JSON.stringify(selectedWords) === JSON.stringify(phraseWords)) {
  //     navigation.navigate('Dashboard');
  //   } else {
  //     Alert.alert('Error', 'Wrong order, try again');
  //   }
  // };

  const handleProceed = async () => {
    if (selectedWords.length !== phraseWords.length) {
      Alert.alert('Error', 'Please select all words before continuing');
    } else if (JSON.stringify(selectedWords) === JSON.stringify(phraseWords)) {
      try {
        const mnemonic = selectedWords.join(' ');
        // ✅ Create wallet
        const wallet = walletFromMnemonic(mnemonic);

        // ✅ Save securely
        // await SecureStore.setItemAsync('userWallet', JSON.stringify(wallet));

        // ✅ Navigate with wallet data
        navigation.replace('Dashboard', {wallet});
      } catch (err) {
        Alert.alert('Error', err.message);
      }
    } else {
      Alert.alert('Error', 'Wrong order, try again');
    }
  };

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

        {/* Header */}
        <Text style={styles.stepText}>Step 3 of 3</Text>
        <Text style={styles.title}>
          Confirm your Secret{'\n'}Recovery Phrase
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.description, {flex: 1}]}>
            Tap the words in the correct order.
          </Text>
          <TouchableOpacity
            onPress={handleClearAll}
            activeOpacity={0.6}
            style={{alignSelf: 'flex-end'}}>
            <Text style={styles.description}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Selected Words */}
        <ScrollView>
          <View style={styles.grid}>
            {phraseWords.map((word, idx) => (
              <TouchableOpacity
                onPress={() => handleDeselectWord(word, idx)}
                key={idx}
                style={styles.phraseBox}>
                <Text style={styles.phraseText}>{idx + 1}</Text>
                <Text
                  style={[styles.phraseText, {flex: 1, textAlign: 'center'}]}>
                  {selectedWords[idx] ? selectedWords[idx] : '*****'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.wordOptions}>
            {availableWords.map((word, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.wordButton,
                  !word && {backgroundColor: 'transparent'}, // keep empty slot
                ]}
                disabled={!word}
                onPress={() => word && handleSelectWord(word, idx)}
                activeOpacity={0.7}>
                <Text style={styles.wordButtonText}>{word || ''}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedWords.length === phraseWords.length && (
            <Text
              style={{
                marginTop: 20,
                fontWeight: 'bold',
                color: themeColors.white,
              }}>
              {JSON.stringify(selectedWords) === JSON.stringify(phraseWords)
                ? '✅ Correct order!'
                : '❌ Wrong order, try again'}
            </Text>
          )}

          <CustomButton
            text={'Continue'}
            onPress={handleProceed}
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
        </ScrollView>
      </View>
    </View>
  );
};

export default ConfirmSecretPhrase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
    // paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    width: '60%',
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
    fontSize: moderateScale(12),
    color: themeColors.white,
    marginBottom: moderateScale(20),
    lineHeight: moderateScale(20),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  phraseBox: {
    backgroundColor: themeColors.boxBackground2Dark,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(10),
    width: '24%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColors.gray,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filledBox: {
    borderWidth: 2,
    borderColor: themeColors.themeLight,
  },
  phraseText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: moderateScale(8),
    color: themeColors.white,
  },
  wordOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  wordButton: {
    backgroundColor: themeColors.themeGrayDark,
    paddingVertical: moderateScale(3),
    paddingHorizontal: moderateScale(6),
    // width: '15%',
    alignItems: 'center',
    borderRadius: moderateScale(3),
    marginHorizontal: moderateScale(5),
    marginVertical: moderateScale(3),
  },
  wordButtonText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: moderateScale(8),
    color: themeColors.grayLight,
  },
});
