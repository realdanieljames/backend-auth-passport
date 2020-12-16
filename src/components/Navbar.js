import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink, Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
root: {
    flexGrow: 1,
},
menuButton: {
    marginRight: theme.spacing(2),
},
title: {
    flexGrow: 1,
},
}));
export default function ButtonAppBar() {
const classes = useStyles();
return (
    <div className={classes.root}>
    <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
            <Link to="/">React Auth Fullstack</Link>
        </Typography>
        <NavLink activeStyle={{ color: "red" }} exact to="/login">
            <Button color="inherit" style={{ color: "white" }}>
            Login
            </Button>
        </NavLink>
        <NavLink activeStyle={{ color: "red" }} exact to="/sign-up">
            <Button color="inherit" style={{ color: "white" }}>
            Sign up
            </Button>
        </NavLink>
        </Toolbar>
    </AppBar>
    </div>
);
}