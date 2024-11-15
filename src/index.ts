import { serveStatic } from "@hono/node-server/serve-static";
import { Env, Frog } from "frog";
import { vars } from "./ui";
import { devtools } from "frog/dev";
import TreeMain from "./tree-view";
import CreateTree from "./create-tree";
import PATH from "./routes/path";
import { CONFIGS } from "./configs";
import CreateTx from "./create-tree/createTx";

export interface State {
  create: { bgId: number };
}

export type EnvState = Env & { State: State };

export const app = new Frog<{ State: State }>({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: "XMAS Frame",
  ui: { vars },
  initialState: {
    create: {
      bgId: 0,
    },
  },
});

app.use("/*", serveStatic({ root: "./public" }));
app.frame(PATH.TREE_HOME, TreeMain);
app.frame(PATH.CREATE_TREE, CreateTree);
app.transaction(PATH.CREATE_TREE_TX, CreateTx);

devtools(app, { serveStatic });
