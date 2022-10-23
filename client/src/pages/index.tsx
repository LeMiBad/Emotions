import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React from 'react';

import { LoginPage } from "./LoginPage/LoginPage";
import { RegisterPage } from "./RegisterPage/RegisterPage";
import { MainPage } from "./MainPage/MainPage";
import { JournalPage } from './JournalPage/JournalPage';

export const Pages = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/journal" component={() => <JournalPage />} />
        <Route path="/*" component={MainPage} />
      </Switch>
      <ToastContainer hideProgressBar={true} />
    </BrowserRouter>
  );
};
