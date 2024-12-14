import { serveStatic } from "@hono/node-server/serve-static";
import { Env, Frog } from "frog";
import { vars } from "../src/ui.js";
import { devtools } from "frog/dev";
import TreeMain from "../src/tree-view/index.js";
import CreateTree from "../src/create-tree/index.js";
import PATH from "../src/routes/path.js";
import CreateTx from "../src/create-tree/createTx.js";
import DecorateTree from "../src/decorate/index.js";
import HomePage from "../src/main/main.js";
import DecorateConfirm from "../src/decorate/confirm.js";
import AdornTx from "../src/decorate/adornTx.js";
import { handle } from "frog/next";
import BuyXMAS from "../src/buy-xmas/index.js";
import BuyXMASTx from "../src/decorate/buyXMAStx.js";
import { getTree } from "../src/contracts/tree.js";
import SearchMyTree from "../src/search/index.js";
import MyTrees from "../src/search/MyTrees.js";
// import { createNeynar } from "frog/middlewares";
// const neynar = createNeynar({ apiKey: "NEYNAR_FROG_FM" });

type SearchState = "None" | "Invalid" | "ValidAddr";
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
    userAddress: string;
    createdTreeId: number;
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
    pageCount: number;
  };
  buyXMAS: {
    price10: string;
    price100: string;
    price1000: string;
    reserve: string;
    swappedAmount: string;
  };
  search_tree: {
    state: SearchState;
    page: number;
    ownedCount: number;
    ownedTrees: { treeId: number; ornamentCount: number; bgId: number }[];
  };
}

export type EnvState = Env & { State: State };

export const app = new Frog<{ State: State }>({
  basePath: "/",
  // browserLocation: "/:path",
  title: "X-MAS Tree",
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
      createdTreeId: 0,
      bgCount: 0,
      bgPrices: null,
      xmasBalance: null,
      userAddress: "",
    },
    decorate: {
      currOrnId: 0,
      page: 0,
      pageCount: 1,
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
    search_tree: {
      state: "None",
      page: 0,
      ownedCount: 0,
      ownedTrees: [],
    },
  },
});

app.use("/*", serveStatic({ root: "./public" }));
app.use(PATH.TREE_HOME, async (c, next) => {
  let treeId = c.req.param("id");
  if (isNaN(Number(treeId))) treeId = "0";

  const treeContract = getTree();
  const tree = await treeContract.getTree(treeId);
  // @ts-ignore
  c.set("tree", {
    owner: tree.owner,
    ornamentCount: Number(tree.ornamentCount),
    bgId: Number(tree.bgId),
    ornamentIds: tree.ornamentIds.map(Number),
    adorners: tree.adorners,
  });

  await next();
});
// app.use(
//   PATH.CREATE_TREE,
//   neynar.middleware({ features: ["interactor", "cast"] })
// );

app.frame(PATH.TREE_HOME, TreeMain);
app.frame(PATH.HOME, HomePage);
app.frame(PATH.DECORATE, DecorateTree);
app.frame(PATH.DECORATE_CONFIRM, DecorateConfirm);
app.frame(PATH.CREATE_TREE, CreateTree);
app.frame(PATH.BUY_XMAS, BuyXMAS);
app.frame(PATH.SEARCH_TREE, SearchMyTree);
app.frame(PATH.MY_TREES, MyTrees);
app.frame(PATH.MY_TREES_ADDR, MyTrees);

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
