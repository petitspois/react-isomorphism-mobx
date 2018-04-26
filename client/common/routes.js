import Home from './containers/Home'
import About from './containers/About'
import Data from './containers/Data'

const routes = [
    {
        path: "/",
        component: Home,
        exact:true,
        store:'homeStore',
    },
    {
        path: "/about",
        component: About,
        store:'aboutStore',
    },
    {
        path: "/data",
        component: Data,
        store:''
    },
];


export default routes;