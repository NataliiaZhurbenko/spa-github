import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { OpenInBrowser } from "@material-ui/icons";
import Context from "../context";

export default function User(props) {
  const { dispatch } = useContext(Context);
  const { login, avatar_url, html_url } = props.user;

  const handleListItemClick = (event, userName) => {
    const win = window.open(html_url, "_blank");
    if (win != null) {
      win.focus();
    }
  };

  function handleOpenProfile() {
    dispatch({ type: "open", payload: login });
  }

  return (
    <div>
      <ListItem button>
        <ListItemAvatar onClick={handleOpenProfile}>
          <Avatar alt="Remy Sharp" src={avatar_url} />
        </ListItemAvatar>
        <ListItemText primary={login} onClick={handleOpenProfile} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="open"
            onClick={handleListItemClick}
          >
            <OpenInBrowser color="action" fontSize="large" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}
