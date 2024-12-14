import PATH from "../routes/path.js";
import { Button, FrameHandler, TextInput } from "frog";
import { EnvState } from "../../api";
import { BlankInput } from "hono/types";
import { Box, Image } from "../ui.js";

const SearchMyTree: FrameHandler<
  EnvState,
  typeof PATH.DECORATE,
  BlankInput
> = async (c) => {
  return c.res({
    imageAspectRatio: "1.91:1",
    image: (
      <Box
        grow
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Box
          position="absolute"
          alignItems="center"
          top="0"
          bottom="0"
          left="0"
          right="0"
        >
          <Image src="/static/search-address.png" height="100%" width="100%" />
        </Box>
      </Box>
    ),
    intents: [
      <TextInput placeholder="Enter your address..." />,
      <Button action={PATH.HOME}>🏠</Button>,
      <Button action={PATH.MY_TREES}>Confirm</Button>,
    ],
  });
};

export default SearchMyTree;
