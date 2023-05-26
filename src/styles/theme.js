const {extendTheme} = require('native-base');

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#FFE6E3',
      100: '#FBDCD8',
      200: '#F8D1CC',
      300: '#F4C7C1',
      400: '#F1BDB5',
      500: '#EDB2AA',
      600: '#EAA89E',
      700: '#E69E93',
      800: '#E39387',
      900: '#DF897C',
    },
    // Redefining only one shade, rest of the color will remain same.
    secondary: {
      50: '#F1E1F7',
      100: '#EAD1F8',
      200: '#E3C1F9',
      300: '#DBB0FA',
      400: '#D4A0FB',
      500: '#CD90FB',
      600: '#C680FC',
      700: '#BE6FFD',
      800: '#B75FFE',
      900: '#B04FFF',
    },
  },
});

export default theme;
