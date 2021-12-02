import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import Notification from "./Components/Notification/Notification";
import AskMe from "./Components/AskMe/AskMe";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route path="/askquestion" component={AskQuestion} />
          <Route path="/notification" component={Notification} />
          <Route path="/" component={AskMe} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
