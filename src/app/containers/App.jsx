import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import IntlProvider from 'components/IntlProvider';
import Header from 'components/Header';
import PageInitial from 'pageProviders/Initial';
import PageLogin from 'pageProviders/Login';
import * as PAGES from 'constants/pages';
import {
  fetchUser,
} from '../actions/user';
import AllCars from "../../pages/NewPages/containers/AllCars";
import CreateCar from "../../pages/NewPages/containers/CreateCar";
import UpdateCar from "../../pages/NewPages/containers/UpdateCar";
import AllCarsPage from 'pageProviders/AllCars';
import CreateCarPage from 'pageProviders/CreateCar';
import UpdateCarPage from 'pageProviders/UpdateCar';
import CreateUpdatePage from "../../pageProviders/Create-Update";

const App = () => {
  const [state, setState] = useState({
    componentDidMount: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    setState(prevState => ({
      ...prevState,
      componentDidMount: true,
    }));
  }, []);

  return (
    <BrowserRouter>
      <IntlProvider>
        <Header />
        {state.componentDidMount && (
            <Switch>
              <Route path={`/${PAGES.LOGIN}`}>
                <PageLogin />
              </Route>
              <Route path={`/${PAGES.INITIAL}`}>
                <PageInitial />
              </Route>
              <Route path={`/${PAGES.ALL_CARS}`}>
                <AllCarsPage />
              </Route>
              <Route path={`/${PAGES.ADD_CAR}`}>
                <CreateCarPage />
              </Route>
              <Route path={`/${PAGES.UPDATE_CAR}`}>
                <UpdateCarPage />
              </Route>
              <Route exact  path={`/${PAGES.CREATE}`}>
                <CreateUpdatePage />
              </Route>
              <Route exact  path={`/${PAGES.UPDATE}`}>
                <CreateUpdatePage />
              </Route>
              <Redirect from="*" to={`/${PAGES.INITIAL}`} />
            </Switch>
        )}
      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;
