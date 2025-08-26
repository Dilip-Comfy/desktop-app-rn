// utils/secureStorage.js
import RNFS from 'react-native-fs';

const FILE_PATH = `${RNFS.DocumentDirectoryPath}/secureStorage.json`;

// ✅ Save key-value pair (object gets stringified)
export const setItem = async (key, value) => {
  try {
    let store = {};

    const exists = await RNFS.exists(FILE_PATH);
    if (exists) {
      const content = await RNFS.readFile(FILE_PATH, 'utf8');
      store = JSON.parse(content || '{}');
    }

    store[key] = value; // add or update key
    await RNFS.writeFile(FILE_PATH, JSON.stringify(store), 'utf8');

    return true;
  } catch (error) {
    console.error('❌ Error saving item:', error);
    return false;
  }
};

// ✅ Get value by key
export const getItem = async key => {
  try {
    const exists = await RNFS.exists(FILE_PATH);
    if (!exists) return null;

    const content = await RNFS.readFile(FILE_PATH, 'utf8');
    const store = JSON.parse(content || '{}');

    return store[key] || null;
  } catch (error) {
    console.error('❌ Error reading item:', error);
    return null;
  }
};

// ✅ Remove key
export const removeItem = async key => {
  try {
    const exists = await RNFS.exists(FILE_PATH);
    if (!exists) return false;

    const content = await RNFS.readFile(FILE_PATH, 'utf8');
    const store = JSON.parse(content || '{}');

    delete store[key];
    await RNFS.writeFile(FILE_PATH, JSON.stringify(store), 'utf8');

    return true;
  } catch (error) {
    console.error('❌ Error removing item:', error);
    return false;
  }
};

// ✅ Clear all storage
export const clear = async () => {
  try {
    await RNFS.writeFile(FILE_PATH, '{}', 'utf8');
    return true;
  } catch (error) {
    console.error('❌ Error clearing storage:', error);
    return false;
  }
};
