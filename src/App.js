import { Route, Switch } from "react-router-dom";
import "./App.css";
import Page from "./components/Page/Page";
import Page2 from "./components/Page2/Page2";
import ForcastProvider from "./context/ForcastProvider";

function App() {
  return (
    <div className="App">
      <ForcastProvider>
        <Switch>
          <Route exact path="/">
            <Page />
          </Route>
          <Route path="/generated">
            <Page2 />
          </Route>
        </Switch>
      </ForcastProvider>
    </div>
  );
}

export default App;
