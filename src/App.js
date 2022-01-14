import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AllQuotes from "./components/AllQuotes";
import QuoteDetail from "./components/QuoteDetail";
import NewQuote from "./components/NewQuote";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container center col-md-7">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteid">
            <QuoteDetail />
          </Route>
          <Route path="/newquote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
