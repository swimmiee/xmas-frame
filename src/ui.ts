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
    background400: "#393939",
    xred:"#d6001c",
    xgreen:"#036f3e"
  },
  fontSizes: {
    ...defaultVars.fontSizes,
    "10": 10 / 630,
  },

  units: {
    ...units,
    "10": 10 / 630,
    "148": 149.5 / 630,
  },
});
