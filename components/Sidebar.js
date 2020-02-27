import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

  const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

const Sidebar = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const store = useSelector(state => state.sidebar);

  const closeDrawer = useCallback(
    () => e => {
      if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
        return;
      }

      dispatch({ type: "SIDE_BAR_CLOSED" });
    },
    []
  );

  return (
    <Drawer
      className={classes.drawer}
      open={store.open}
      variant={store.type}
      onClose={closeDrawer()}
      classes={{
        paper: classes.drawerPaper
      }}>
      {store.type !== "temporary" && <div className={classes.toolbar} />}
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
});
Sidebar.displayName = "Sidebar";

export default Sidebar;
