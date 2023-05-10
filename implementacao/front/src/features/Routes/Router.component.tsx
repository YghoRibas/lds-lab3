import { type ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateWrapper } from './components';
import { Login } from '../Login';
import { Home } from '../Home';

export const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<PrivateWrapper />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};
