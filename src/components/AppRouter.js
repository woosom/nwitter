import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "components/Navigation";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

export const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Switch>
                {isLoggedIn ?
                    <>
                        <Route exact path="/">
                            { userObj ? <Home userObj={userObj}/> : <></> }
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser} />
                        </Route>
                    </>
                    :
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    </>}
            </Switch>
        </Router>
    )
}

export default AppRouter;
