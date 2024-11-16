const PATH = {
  HOME: "/",
  TREE_HOME: "/tree/:id",
  DECORATE: "/tree/:id/decorate",
  DECORATE_CONFIRM: "/tree/:id/decorate/confirm",

  CREATE_TREE: "/create",
  CREATE_TREE_TX: "/create/tx/:bgId",
  DECORATE_TX: "/tree/:id/decorate/:ornId/tx"
} as const;

export default PATH;
