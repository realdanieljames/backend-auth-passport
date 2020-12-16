import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import AuthContext from "./components/context/AuthContext";



function App() {
  return (
    <>
      <Router>
        <AuthContext>
          <Navbar />
          <Switch>
            <Route exact path="/sign-up" component={Auth} />
            <Route exact path="/login" component={Auth} />
          </Switch>
        </AuthContext>
      </Router>
    </>
  );
}
export default App;