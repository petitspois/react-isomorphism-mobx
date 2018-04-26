import { observable, action } from 'mobx';
import fetch from 'isomorphic-fetch';
class About {

    @observable loaded = false;

    @observable aboutData = {};

    @action setInitialProps = ( list ) => {
        this.aboutData = list;
        this.loaded = true;
    }

    @action getInitialProps = async () => {
        let response = await fetch('http://api.douban.com/v2/movie/in_theaters');
        if(response.status == 200){
            this.aboutData = await response.json();
            this.loaded = true;
            return this.aboutData;
        };
    }
}   

export default About;