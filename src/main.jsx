import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './pages/Home';
import Brasileirao from './pages/Brasileirao';
import PremierLeague from './pages/PremierLeague';
import SerieA from './pages/SerieA';
import LaLiga from './pages/LaLiga';
import PalHome from './detailspages/palhome';
import PalAway from './detailspages/palaway';
import SanHome from './detailspages/sanhome';
import SanAway from './detailspages/sanaway';
import SPFCHome from './detailspages/spfchome';
import SPFCAway from './detailspages/spfcaway';
import CorHome from './detailspages/corhome';
import CorAway from './detailspages/coraway';

import { CarrinhoProvider } from '../src/assets/components/CarrinhoContext';


const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Brasileirao",
    element: <Brasileirao />,
  },
  {
    path: "/PremierLeague",
    element: <PremierLeague />,
  },
  {
    path: "/SerieA",
    element: <SerieA />,
  },
  {
    path: "/LaLiga",
    element: <LaLiga />,
  },
  {
    path: "/PalHome",
    element: <PalHome />
  },
  {
    path: "/PalAway",
    element: <PalAway />
  },
  {
    path: "/SanHome",
    element: <SanHome />
  },
  {
    path: "/SanAway",
    element: <SanAway />
  },
  {
    path: "/SPFCHome",
    element: <SPFCHome />
  },
  {
    path: "/SPFCAway",
    element: <SPFCAway />
  },
  {
    path: "/CorHome",
    element: <CorHome/>
  },
  {
    path: "/CorAway",
    element: <CorAway />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <CarrinhoProvider>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  </CarrinhoProvider>
)
