import React from 'react';
import Header from './Header';
import Footer from "./Footer";
import './Layout.css'; // 별도의 CSS 파일로 스타일을 관리합니다.
import TopButton from '../Component/TopButton';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Header/>
            <div className="content">
                {children}
            </div>
            <Footer/>
            <TopButton/>
        </div>
    );
};

export default Layout;