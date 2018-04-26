import { observable, action } from 'mobx';
import fetch from 'isomorphic-fetch';
class Home {

    @observable page = 1;

    @observable loaded = false;

    @observable homeData = [];

    @action setInitialProps = (list) => {
        this.homeData = list;
        this.loaded = true;
    }

    @action getInitialProps = async () => {
        let response = await fetch('http://localhost:3000/api');
        if (response.status == 200) {
            this.homeData = (await response.json()).res.vertical;
            return this.homeData;
        };
    }

    @action loadNext = async () => {
        let response = await fetch(`http://localhost:3000/api?skip=${this.page * 20}`);
        if (response.status == 200) {
            this.homeData = this.homeData.concat((await response.json()).res.vertical)
            this.page++;
        };
    }
}

export default Home;