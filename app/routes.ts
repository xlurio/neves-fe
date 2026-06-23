import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("register", "routes/auth/register.tsx"),
  ...prefix("learning", [
    ...prefix("radicals", [
      route("", "routes/learning/radicals.tsx"),
      route(":radicalSessionId", "routes/learning/radicals/[id]/index.tsx"),
      route(
        ":radicalSessionId/memorization",
        "routes/learning/radicals/[id]/memorization.tsx",
      ),
      route(":radicalSessionId/test", "routes/learning/radicals/[id]/test.tsx"),
      route("tests/:id/result", "routes/learning/tests/[id]/result.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
