import { BrowserRouter, Router, Route } from "react-router-dom";

import Home from "./components/Pages/Home.jsx";
import Login from "./components/Pages/Login.jsx";
import Game from "./components/Pages/Game.jsx";
import GameList from "./components/Pages/GameList.jsx";
import { CreateGame } from "./components/Pages/CreateGame.jsx";
import { Admin } from "./components/Pages/Admin.jsx";
import { NotFound } from "./components/Pages/NotFound.jsx";


export const App = () => {

    return (

        <Router>

            <BrowserRouter>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/game/:id" component={Game} />
                <Route path="/games" component={GameList} />
                <Route path="/create-game" component={CreateGame} />
                <Route path="/admin" component={Admin} />
                <Route component={NotFound} />
            </BrowserRouter>

        </Router>

    );

};
