import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Home from "./components/Home";
import PrivateRoute from "./components/shared/PrivateRoute";
import AuthContextComponent from "./components/context/AuthContext";
function App() {
  return (
    <>
      <Router>
        <AuthContextComponent>
          <Navbar />
          <Switch>
            <Route exact path="/sign-up" component={Auth} />
            <Route exact path="/login" component={Auth} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route
              exact
              path="/logout"
              render={() => <Redirect to="/login" />}
            />
          </Switch>
        </AuthContextComponent>
      </Router>
    </>
  );
}
export default App;