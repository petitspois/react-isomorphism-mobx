import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './app'
import stores from './common/stores'
import routes from './common/routes'
import { matchPath } from 'react-router';


const storeName = routes.find((route)=>matchPath(location.pathname, route)).store || '';

if(storeName){
    stores[storeName].setInitialProps(window.__INITIAL_STATE__);
};

ReactDOM.hydrate(
    <Provider {...stores}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));




