const PATH = {
  TREE_HOME: "/tree/:id",
  TREE_DECORATE: "/tree/:id/decorate",
  TREE_DECORATE_SELECT: "/tree/:id/decorate/:id",
  TREE_DECORATE_CONFIRM: "/tree/:id/decorate/:id/confirm",

  CREATE_TREE: "/create",
  CREATE_TREE_TX: "/create/tx"
} as const;

export default PATH;
