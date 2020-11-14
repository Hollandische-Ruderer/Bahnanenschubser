import Menu from './components/Menu';
import Page from './pages/Page';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {Redirect, Route, useHistory, useParams} from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from "./pages/Home";
import HomeViewModel from "./viewmodels/HomeViewModel";
import Splash from "./pages/Splash";
import Fahrten from "./pages/FahrtenPage/Fahrten";
import FahrtenViewModel from "./viewmodels/FahrtenViewModel";
import MockedFahrtenProvider from "./provider/MockedFahrtenProvider";
import FeedPage from "./pages/FeedPage/FeedPage";
import FeedViewModel from "./viewmodels/FeedViewModel";
import IFahrtenViewModel from "./viewmodels/IFahrtenViewModel";

const HomeComponent: React.FC = () => {
  const history = useHistory();
  const fwd = (to: string) => {
    history.push(to);
  };
  return <Home viewmodel={new HomeViewModel()} forward={fwd} />
};

const fahrtenViewModel = new FahrtenViewModel(new MockedFahrtenProvider());

const FahrtenComponent: React.FC = () => {
  // I know it's ugly, but it's a hackathon ...
  const { originLocation, destinationLocation } = useParams();
  const history = useHistory();
  const fwd = (to: string) => {
    history.push(to);
  };

  return <Fahrten viewModel={fahrtenViewModel} originLocation={originLocation} destinationLocation={destinationLocation} forward={fwd} />
};


const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/:name" component={Page} exact />
            <Route path="/home" component={HomeComponent} exact />
            <Route path="/splash" component={Splash} exact />
            <Route path="/feed" component={() => <FeedPage viewModel={new FeedViewModel()} />} exact />
            <Route path="/fahrten/:originLocation/:destinationLocation" component={FahrtenComponent} exact />
            <Redirect from="/" to="/splash" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
