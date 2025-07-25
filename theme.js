// theme.js
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const light = {
  ...MD3LightTheme,
  colors: { ...MD3LightTheme.colors, primary: '#3B82F6' },
};
export const dark = {
  ...MD3DarkTheme,
  colors: { ...MD3DarkTheme.colors, primary: '#3B82F6' },
};
