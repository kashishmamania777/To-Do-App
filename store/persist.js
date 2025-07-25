// store/persist.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const persist = (key, initial) => ({
  persist: async (set, get) => {
    // load on first run
    const raw = await AsyncStorage.getItem(key);
    if (raw) set(JSON.parse(raw));

    // auto-save every change
    return state => {
      AsyncStorage.setItem(key, JSON.stringify(state));
      set(state);
    };
  },
  ...initial,
});
