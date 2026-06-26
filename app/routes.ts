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
      route("radicals", "routes/learning/radicals.tsx"),
      route("frequency", "routes/learning/frequency.tsx"),
    ]),
    ...prefix("practice", [
      route("radicals", "routes/practice/radicals.tsx"),
      ...prefix("radicals", [
        route(":radicalSessionId", "routes/practice/radicals/[id]/index.tsx"),
        route(
          ":radicalSessionId/memorization",
          "routes/practice/radicals/[id]/memorization.tsx",
        ),
        route("tests/:testId", "routes/practice/radicals/tests/[id]/index.tsx"),
        route(
          "tests/:id/result",
          "routes/practice/radicals/tests/[id]/result.tsx",
        ),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
