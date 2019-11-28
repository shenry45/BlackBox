import React from 'react';
import { Switch, Route } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/Index';
import ToTop from './components/ToTop';
import NoPage from './pages/NoPage';

function App() {
  return (
    <>
      <ToTop />
      <Header />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route component={NoPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
