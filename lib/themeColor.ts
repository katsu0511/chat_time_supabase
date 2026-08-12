import { blue, red, yellow, purple, green, orange, brown, pink, grey } from '@mui/material/colors';

export enum ThemeColor {
  blue = 'blue',
  red = 'red',
  yellow = 'yellow',
  purple = 'purple',
  green = 'green',
  orange = 'orange',
  brown = 'brown',
  pink = 'pink',
  grey = 'grey'
};

export const ColorGroup: Record<ThemeColor, Color> = {
  blue: { main: blue[500], second: blue[300], light: blue[100] },
  red: { main: red[500], second: red[300], light: red[100] },
  yellow: { main: yellow[500], second: yellow[300], light: yellow[100] },
  purple: { main: purple[500], second: purple[300], light: purple[100] },
  green: { main: green[500], second: green[300], light: green[100] },
  orange: { main: orange[500], second: orange[300], light: orange[100] },
  brown: { main: brown[500], second: brown[300], light: brown[100] },
  pink: { main: pink[500], second: pink[300], light: pink[100] },
  grey: { main: grey[500], second: grey[300], light: grey[100] }
};
