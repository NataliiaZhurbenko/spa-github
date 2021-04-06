import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import User from "./User";
import Context from "../context";
import Loader from "./Loader/Loader";
import useGetUsers from "./useGetUsers";
import Button from "@material-ui/core/Button";
import PaginationItem from "@material-ui/lab/PaginationItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    margin: "auto",
  },
  demo: {
    backgroundColor: theme.palette.background,
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  rootPagination: {
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
  },
  buttonNext: {
    marginLeft: theme.spacing(5),
  },
  buttonToFirst: {
    marginRight: theme.spacing(5),
  },
}));

export default function UsersList() {
  const { state, dispatch } = useContext(Context);
  useGetUsers();
  const usersPerPage = 10;

  // Get current users
  const indexOfTheLastUser = state.currentPageIndex * usersPerPage;
  const indexOfTheFirstUser = indexOfTheLastUser - usersPerPage;
  const currentUsers = state.users.slice(
    indexOfTheFirstUser,
    indexOfTheLastUser
  );
  const classes = useStyles();

  const pageNumbers = [
    ...Array(Math.ceil(state.users.length / usersPerPage)).keys(),
  ].map((i) => i + state.firstPageNumber);

  function setCurrentPageIndex(pageIndex) {
    dispatch({ type: "setCurrentPageIndex", payload: pageIndex });
  }

  function paginate(pageNumber) {
    setCurrentPageIndex(pageNumber);
  }

  function loadNextUsers() {
    dispatch({ type: "loadNextUsers" });
    setCurrentPageIndex(1);
  }

  function loadFirstUsers() {
    dispatch({ type: "loadFirstUsers" });
    setCurrentPageIndex(1);
  }

  if (state.isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title}>
              GitHub Users List
            </Typography>
            <div className={classes.demo}>
              <List>
                {currentUsers.map((user) => {
                  return <User key={user.id} user={user} />;
                })}
              </List>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <div className={classes.rootPagination}>
        {state.firstPageNumber > 1 && (
          <Button
            className={classes.buttonToFirst}
            variant="contained"
            onClick={() => loadFirstUsers()}
          >
            Back to 1-st page
          </Button>
        )}

        {pageNumbers.map((number, index) => (
          <PaginationItem
            key={number}
            variant="outlined"
            color="primary"
            selected={state.currentPageIndex === index + 1}
            page={number}
            onClick={() => paginate(index + 1)}
          />
        ))}

        {state.apiUrlNext && (
          <Button
            className={classes.buttonNext}
            variant="contained"
            onClick={() => loadNextUsers()}
          >
            Next 30 users
          </Button>
        )}
      </div>
    </div>
  );
}
