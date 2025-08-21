import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CustomLucideIcon from '../../components/CustomLucideIcon';
import {themeColors} from '../../styles/Colors';
import CustomButton from '../../components/CustomButton';

const ImportSecretPhrase = ({navigation}) => {
  const [phraseWords, setPhraseWords] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleTextChange = text => {
    if (phraseWords.length >= 24) {
      setInputValue('');
      return;
    }

    // 🔑 Check if user pasted multiple words
    const words = text.trim().split(/\s+/);

    if (words.length > 1) {
      // User pasted a phrase
      const remainingSlots = 24 - phraseWords.length;
      const validWords = words.slice(0, remainingSlots);

      setPhraseWords(prev => [...prev, ...validWords]);
      setInputValue('');
    } else {
      // Normal typing flow
      if (text.endsWith(' ')) {
        const newWord = text.trim();
        if (newWord.length > 0) {
          setPhraseWords(prev => [...prev, newWord]);
        }
        setInputValue('');
      } else {
        setInputValue(text);
      }
    }
  };
  const handleRemoveWord = indexToRemove => {
    setPhraseWords(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}>
          <CustomLucideIcon name="ArrowLeft" color={themeColors.white} />
        </TouchableOpacity>

        <Text style={styles.title}>
          Confirm your Secret{'\n'}Recovery Phrase
        </Text>
        <Text style={styles.description}>
          Type your secret phrase, separating each word with a space.
        </Text>

        <ScrollView style={{maxHeight: moderateScale(200)}}>
          <View style={styles.grid}>
            {phraseWords.map((word, index) => (
              <View key={index} style={styles.phraseBox}>
                <Text style={styles.phraseText}>
                  {index + 1}. {word}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveWord(index)}
                  style={{marginLeft: moderateScale(5)}}>
                  <CustomLucideIcon name="X" color={themeColors.white} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <TextInput
          style={styles.input}
          placeholder="Type your phrase here..."
          placeholderTextColor={themeColors.grayLight}
          value={inputValue}
          onChangeText={handleTextChange}
          autoCapitalize="none"
        />

        <CustomButton
          text={'Continue'}
          onPress={() => navigation.navigate('Dashboard')}
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

export default ImportSecretPhrase;

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
    justifyContent: 'flex-start',
  },
  phraseBox: {
    borderWidth: 1,
    borderColor: themeColors.themeLight,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(6),
    margin: moderateScale(5),
    flexDirection: 'row',
  },
  phraseText: {
    fontFamily: 'UrbanistSemiBold',
    fontSize: moderateScale(12),
    color: themeColors.white,
  },
  input: {
    backgroundColor: themeColors.boxBackground2Dark,
    color: themeColors.white,
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(6),
    marginTop: moderateScale(10),
    minHeight: moderateScale(80),
  },
});
