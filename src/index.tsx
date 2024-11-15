import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { Box, Image, vars } from "./ui";
import { TreeBackground } from "./TreeBackground";
import { PlainTree } from "./PlainTree";
import { Ornament } from "./Ornament";
// import { neynar } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: "Frog Frame",
  ui: { vars },
});

app.use("/*", serveStatic({ root: "./public" }));

app.frame("/", (c) => {
  const { buttonValue, inputText, status } = c;
  const fruit = inputText || buttonValue;
  return c.res({
    imageAspectRatio: "1:1",
    image: (
      <Box
        grow
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="background200"
        position="relative"
      >
        <TreeBackground no={1} />
        <PlainTree />

        <Ornament position={0} itemId={3} />
        <Ornament position={1} itemId={4} />
        <Ornament position={2} itemId={5} />
        <Ornament position={3} itemId={6} />
        <Ornament position={4} itemId={7} />
        <Ornament position={5} itemId={8} />
        <Ornament position={6} itemId={9} />
        <Ornament position={7} itemId={10} />
      </Box>
    ),
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === "response" && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

devtools(app, { serveStatic });
