import { serveStatic } from "@hono/node-server/serve-static";
import { Frog } from "frog";
import { vars } from "./ui";
import { devtools } from "frog/dev";
import TreeMain from "./tree-view";

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: "Frog Frame",
  ui: { vars },
});

app.use("/*", serveStatic({ root: "./public" }));
app.frame("/tree/:id", TreeMain);

devtools(app, { serveStatic });
