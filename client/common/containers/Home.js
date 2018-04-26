import React, { Component } from 'react';
import Header from './Header';
import { observer, inject} from 'mobx-react';
import { observable  } from 'mobx';
import styled from 'styled-components';


const HomeWrap = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    width: 100%;
    margin-top:20px;
`;

const ImgItem = styled.div`
    margin-bottom:20px;
    width:350px;
    img{
        width:350px;
        border-radius:20px;
    }
`;

const NextBtn = styled.a`
    display: block;
    padding:30px 0;
    text-align:center;
    color: #1890ff;
`

@inject('homeStore')
@observer
class Home extends Component{

    componentDidMount = () => {
      let { homeStore } = this.props;
      if(!homeStore.loaded)homeStore.getInitialProps();
    };
    
    nextPage = () => {
       let { homeStore } = this.props;
       homeStore.loadNext();
    }
    
    render(){
        let { homeStore } = this.props;
        let { homeData } = homeStore;
        return (
            <div>
                <Header/>
                <HomeWrap>
                {
                    homeData.map((item, index) => {
                        return <ImgItem key={index}><img src={item.thumb} alt=""/></ImgItem>
                    })
                }
                </HomeWrap>
                <NextBtn href="javascript:;" onClick={this.nextPage}>下一页</NextBtn>
            </div>
        )
    }
}

export default Home;