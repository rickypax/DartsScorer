import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import GameSettings from './pages/GameSettings';
import Game from './pages/Game';
import GameEnd from './pages/GameEnd';

import './theme/custom.css'

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/game-settings">
          <GameSettings />
        </Route>
        <Route exact path="/game">
          <Game />
        </Route>
        <Route exact path="/gameend/:player">
          <GameEnd />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
