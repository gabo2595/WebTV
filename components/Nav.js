import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  title: {
    flexGrow: 1
  }
}));

const ElevationScroll = props => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
};

const Nav = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const store = useSelector(state => state.sidebar);

  const handleDrawer = useCallback(
    () => () => {
      store.open
        ? dispatch({ type: "SIDE_BAR_CLOSED" })
        : dispatch({ type: "SIDE_BAR_OPEN" });
    },
    [store]
  );

  return (
    <>
      <ElevationScroll>
        <AppBar
          color="default"
          position="fixed"
          className={store.type === "persistent" ? classes.appBar : ""}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              Persistent drawer
            </Typography>
            <IconButton
              onClick={handleDrawer()}
              color="inherit"
              aria-label="open drawer"
              edge="end">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
});

export default Nav;
