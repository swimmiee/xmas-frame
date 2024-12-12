import { serveStatic } from "@hono/node-server/serve-static";
import { Env, Frog } from "frog";
import { vars } from "./ui";
import { devtools } from "frog/dev";
import TreeMain from "./tree-view";
import CreateTree from "./create-tree";
import PATH from "./routes/path";
import CreateTx from "./create-tree/createTx";
import DecorateTree from "./decorate";
import HomePage from "./main/main";
import DecorateConfirm from "./decorate/confirm";
import AdornTx from "./decorate/adornTx";
import { handle } from "frog/next";
import BuyXMAS from "./buy-xmas";
import BuyXMASTx from "./decorate/buyXMAStx";
import { createNeynar } from "frog/middlewares";

export interface State {
  temp: string;
  tree: {
    owner: string | null;
    ornamentCount: number | null;
    bgId: number | null;
    ornamentIds: number[] | null;
    adorners: string[] | null;
    minted: boolean | null;
  };
  create: {
    bgId: number;
    nextTreeId: number;
    bgCount: number;
    bgPrices: string[] | null;
    xmasBalance: string | null;
  };
  decorate: {
    ornCount: number;
    ornPrices: string[] | null;
    currOrnId: number;
    currOrnPrice: string;
    page: number;
  };
  buyXMAS: {
    price10: string;
    price100: string;
    price1000: string;
    reserve: string;
    swappedAmount: string;
  };
}

export type EnvState = Env & { State: State };

const neynar = createNeynar({ apiKey: "NEYNAR_FROG_FM" });
export const app = new Frog<{ State: State }>({
  basePath: "/",
  browserLocation: "/:path",
  hub: neynar.hub(),
  title: "X-MAS Frame",
  ui: { vars },
  initialState: {
    temp: "",
    tree: {
      owner: null,
      ornamentCount: null,
      bgId: null,
      ornamentIds: null,
      adorners: null,
      minted: null,
    },
    create: {
      bgId: 1,
      nextTreeId: 0,
      bgCount: 0,
      bgPrices: null,
      xmasBalance: null,
    },
    decorate: {
      currOrnId: 0,
      page: 0,
      currOrnPrice: "0",
      ornPrices: null,
      ornCount: 0,
    },
    buyXMAS: {
      price10: "-",
      price100: "-",
      price1000: "-",
      reserve: "-",
      swappedAmount: "-",
    },
  },
});

app.use(neynar.middleware({ features: ["interactor", "cast"] }));
app.use("/*", serveStatic({ root: "./public" }));
app.frame(PATH.HOME, HomePage);
app.frame(PATH.TREE_HOME, TreeMain);
app.frame(PATH.DECORATE, DecorateTree);
app.frame(PATH.DECORATE_CONFIRM, DecorateConfirm);
app.frame(PATH.CREATE_TREE, CreateTree);
app.frame(PATH.BUY_XMAS, BuyXMAS);

app.transaction(PATH.CREATE_TREE_TX, CreateTx);
app.transaction(PATH.DECORATE_TX, AdornTx);
app.transaction(PATH.BUY_XMAS_TX, BuyXMASTx);

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
// @ts-ignore
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
