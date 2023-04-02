import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import imgUrl from './assets/imgs/welcome.gif'
import MenuPage from './pages/Setting/Menu'
import UserPage from './pages/Setting/User'
import ProductPage from './pages/Business/Product'
import OverViewPage from './pages/Business/OverView'
import LoginPage from './pages/Login'

export default (
    <Router>
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Main />}>
                <Route index element={<img src={imgUrl} alt="" style={{ width: '100%' }} />}></Route>
                <Route path='/setting/menu' element={<MenuPage />}></Route>
                <Route path='/setting/user' element={<UserPage />}></Route>
                <Route path='/business/product' element={<ProductPage/>}></Route>
                <Route path='/business/overview' element={<OverViewPage/>}></Route>
            </Route>
        </Routes>
    </Router>
)