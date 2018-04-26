import React, { Component } from 'react';
import Header from './Header';
import { observer, inject} from 'mobx-react';


@inject('aboutStore')
@observer
class About extends Component{


    componentDidMount = () => {
        if(!this.props.aboutStore.loaded)this.props.aboutStore.getInitialProps();
    };
    

    render(){
        let { aboutStore } = this.props;
        let { aboutData } = aboutStore;
        return (
            <div>
                <Header/>
                <div>渲染关于</div>
                {
                    aboutData.subjects && aboutData.subjects.map((item, index) => {
                        return <div key={index}>
                            <h2>{item.title}</h2>
                            <img src={item.images.small} alt=""/>
                        </div>
                    })
                }
            </div>
        )
    }
}

export default About;