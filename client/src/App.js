import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import Detalles from "./components/Detalles";
import {Form} from "./components/Form";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/recipeCreate" component={Form} />
          <Route path="/home/:id" component={Detalles} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
