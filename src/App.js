import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/sign-up" component={Auth} />
          <Route exact path="/login" component={Auth} />
        </Switch>
      </Router>
    </>
  );
}
export default App;