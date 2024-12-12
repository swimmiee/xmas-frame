import { colors, units, createSystem, defaultVars } from "frog/ui";

export const {
  Box,
  Columns,
  Column,
  Divider,
  Heading,
  HStack,
  Icon,
  Image,
  Rows,
  Row,
  Spacer,
  Text,
  VStack,
  vars,
} = createSystem({
  colors: {
    ...colors.dark,
    background300: "#242424",
    background400: "#595959",
    xred:"#d6001c",
    xgreen:"#036f3e",
    xblue:"#005aa7",
    text100: "#f5f5f5",
  },
  fontSizes: {
    ...defaultVars.fontSizes,
    "10": 10 / 630,
    "8": 8 / 630,
  },

  units: {
    ...units,
    "10": 10 / 630,
    "148": 149.5 / 630,
    "108": 108 / 630,
  },
});
