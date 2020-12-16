import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {AuthContext} from "./context/AuthContext";
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




const{
    state: {user},
    dispatch,
} = useContext(AuthContext);

const isUserLoggedIn = user ? true : false;

const navLinkTitleOne =  isUserLoggedIn ? "/profile" : "/login";
const navLinkDisplayOne =  isUserLoggedIn ? `${user.email}` : "Login";

const navLinkTitleTwo =  isUserLoggedIn ? "/logout" : "/sign-up";
const navLinkDisplayTwo =  isUserLoggedIn ? "Logout" : "Sign up";

const logoutFunc = isUserLoggedIn ?  logout: null;

function logout (){
dispatch({
    type: "LOG_OUT",
})
}

return (
    <div className={classes.root}>
    <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" className={classes.title}>
            <Link to="/">React Auth Fullstack</Link>
        </Typography>





        <NavLink activeStyle={{ color: "red" }} exact to={navLinkTitleOne}>
            <Button color="inherit" style={{ color: "white" }}>
            {navLinkDisplayOne}
            </Button>
        </NavLink>
        <NavLink activeStyle={{ color: "red" }} exact to={navLinkTitleTwo} onClick={logoutFunc}>
            <Button color="inherit" style={{ color: "white" }}>
            {navLinkDisplayTwo}
            </Button>
        </NavLink>
        </Toolbar>
    </AppBar>
    </div>
);
}