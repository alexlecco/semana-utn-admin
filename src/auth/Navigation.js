import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const Navigation = () =>
  <div>
    <ul>
      <li><Link to={routes.SIGN_IN}>Ingresar</Link></li>
      <li><Link to={routes.LANDING}>Ver</Link></li>
      <li><Link to={routes.HOME}>Inicio</Link></li>
      <li><Link to={routes.ACCOUNT}>Cuenta</Link></li>
    </ul>
  </div>

export default Navigation;
