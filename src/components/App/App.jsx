import './App.css';
import {Header} from "../Header";
import {useState} from "react";
import {useLocation,useRoutes} from "react-router-dom";
import {ROUTES} from "../../routes";
import React,{Suspense} from "react";
import {Footer} from "../Footer";
import {Loader} from "../Loader";
function App() {
    const [mode,setMode] = useState(localStorage.getItem('mode') || 'light');
    const routes = useRoutes(ROUTES);
    let location = useLocation();
    const changeMode =()=> {
        setMode(mode === 'dark' ? 'light': 'dark');
        localStorage.setItem("mode", mode === 'dark' ? 'light': 'dark');
    }
  return (
    <div className={['wrapper',mode].join(' ')}>
      <Header mode={mode} changeMode={changeMode}/>
        <Suspense fallback={<Loader/>}>
            {routes}
            {location.pathname.includes(`/game`,-1) ? null : <Footer/>}
        </Suspense>
    </div>
  );
}

export {App};
