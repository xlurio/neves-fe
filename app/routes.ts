import {
  type RouteConfig,
  index,
  layout,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("layouts/AuthLayout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
  layout("layouts/ProtectedLayout.tsx", [
    index("routes/index.tsx"),
    ...prefix("learning", [
      route("radicals", "routes/learning/radicals.tsx"),
      route("frequency", "routes/learning/frequency.tsx"),
    ]),
    ...prefix("practice", [
      route("radicals", "routes/practice/radicals.tsx"),
      ...prefix("radicals", [
        route(":sessionId", "routes/practice/radicals/[id]/index.tsx"),
        route(
          ":sessionId/memorization",
          "routes/practice/radicals/[id]/memorization.tsx",
        ),
        route(
          "assessments/:assessmentId",
          "routes/practice/radicals/assessments/[id]/index.tsx",
        ),
        route(
          "assessments/:id/result",
          "routes/practice/radicals/assessments/[id]/result.tsx",
        ),
      ]),
      route("sentences", "routes/practice/sentences.tsx"),
      ...prefix("sentences", [
        route(":sessionId", "routes/practice/sentences/[id]/index.tsx"),
        route(
          ":sessionId/memorization",
          "routes/practice/sentences/[id]/memorization.tsx",
        ),
        route(
          "assessments/:assessmentId",
          "routes/practice/sentences/assessments/[id]/index.tsx",
        ),
        route(
          "assessments/:id/result",
          "routes/practice/sentences/assessments/[id]/result.tsx",
        ),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
