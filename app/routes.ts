import {
  type RouteConfig,
  index,
  layout,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("routes/auth-layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
  layout("routes/protected-layout.tsx", [
    index("routes/index.tsx"),
    ...prefix("learning", [
      ...prefix("radicals", [
        route("", "routes/learning/radicals.tsx"),
        route(":radicalSessionId", "routes/learning/radicals/[id]/index.tsx"),
        route(
          ":radicalSessionId/memorization",
          "routes/learning/radicals/[id]/memorization.tsx",
        ),
        route(
          ":radicalSessionId/test",
          "routes/learning/radicals/[id]/test.tsx",
        ),
        route("tests/:id/result", "routes/learning/tests/[id]/result.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
