const PATH = {
  HOME: "/",
  TREE_HOME: "/tree/:id",
  DECORATE: "/tree/:id/decorate",
  DECORATE_CONFIRM: "/tree/:id/decorate/confirm",

  CREATE_TREE: "/create",
  CREATE_TREE_TX: "/create/tx/:bgId",
  DECORATE_TX: "/tree/:id/decorate/:ornId/tx",

  SEARCH_TREE: "/search",
  MY_TREES: "/search/list",
  MY_TREES_ADDR: "/search/list/:address",
  
  BUY_XMAS: "/buy/xmas",
  BUY_XMAS_TX: "/buy/xmas/tx",
} as const;

export default PATH;
