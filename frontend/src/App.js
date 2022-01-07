import "./App.css";
import { LoginContext, MeContext, RefreshContext } from "./Context";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import Notification from "./Components/Notification/Notification";
import Me from "./Components/Me/Me";
import AskMe from "./Components/AskMe/AskMe";
import Login from "./Components/Login/Login";
import Forgot from "./Components/ForgotPassword/Forgot";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [me, setMe] = useState({});
  const [refresh, setRefresh] = useState(false);
  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
      <MeContext.Provider value={{ me, setMe }}>
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
          <Router>
            <div className="App">
              <Navbar />

              <Switch>
                <Route exact path="/askquestion" component={AskQuestion} />
                <Route exact path="/notification" component={Notification} />
                <Route exact path="/" component={AskMe} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgot" component={Forgot} />
                <Route exact path="/me" component={Me} />
              </Switch>
            </div>
          </Router>
        </RefreshContext.Provider>
      </MeContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
