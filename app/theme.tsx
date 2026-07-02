import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";
import { type LinkProps } from "@mui/material/Link";
import { createTheme } from "@mui/material/styles";
import { forwardRef } from "react";

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  palette: {
    mode: "dark",
  },
});

export default theme;
