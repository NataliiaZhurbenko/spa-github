import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Loader from "./Loader/Loader";
import Context from "../context";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "10px solid #ccc",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    margin: "auto",
    minWidth: 350,
  },
  large: {
    width: theme.spacing(7.5),
    height: theme.spacing(7.5),
  },
}));

const useGetCurrentUser = () => {
  const { state } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    login: "",
    avatar_url: "",
    company: "",
    created_at: "",
  });
  const APIurl = `https://api.github.com/users/${state.currentUser}`;

  useEffect(() => {
    if (state.isProfileOpen) {
      setLoading(true);
      getCurrentUser()
        .then((data) => setUser(data))
        .then(() => setLoading(false));
    }
  }, [state.isProfileOpen]);

  async function getCurrentUser() {
    const response = await fetch(APIurl);
    const data = await response.json();
    return data;
  }

  return [user, loading];
};

export default function UserProfile() {
  const { state, dispatch } = useContext(Context);
  const [user, loading] = useGetCurrentUser();
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={state.isProfileOpen}
      onClose={() => dispatch({ type: "close" })}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={state.isProfileOpen}>
        <div className={classes.paper}>
          {loading ? (
            <Loader />
          ) : (
            <Grid container spacing={2}>
              <Grid item>
                <div>
                  <Avatar
                    alt="Remy Sharp"
                    src={user.avatar_url}
                    className={classes.large}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography variant="h6" color="textPrimary">
                      {user.login}
                    </Typography>
                    <Typography variant="subtitle2" color="textPrimary">
                      {user.company}
                    </Typography>
                    <Typography variant="caption">{user.created_at}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </div>
      </Fade>
    </Modal>
  );
}
