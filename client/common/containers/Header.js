import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

const HeaderWrap = styled.div`
    background-color: white;
    box-shadow:0 2px 8px #f0f1f2;
`;

const NavLinksyd = styled(NavLink).attrs({ activeClassName : 'active' })`
    display:inline-block;
    padding:0 20px;
    height:64px;
    line-height:64px;
    color:#314659;
    &.active {
        color:#1890ff;
    }
`;

class Header extends Component{
    render(){
        return (
            <HeaderWrap>
                <NavLinksyd exact  to="/">Home</NavLinksyd>
                <NavLinksyd exact  to="/about">About</NavLinksyd>
                <NavLinksyd exact  to="/data">Data</NavLinksyd>
            </HeaderWrap>
        )
    }
}

export default Header;