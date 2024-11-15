import { colors, units, createSystem } from "frog/ui";

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
  colors: colors.dark,
  units: {
    ...units,
    "148": 149.5 / 630,
  },
});
