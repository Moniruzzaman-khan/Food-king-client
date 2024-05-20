import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import SignUpPage from "./pages/SignUpPage.jsx";
import CartProvider from "./components/ContextReducer.jsx";
import MyOrders from "./pages/MyOrders.jsx";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<LoginPage />}></Route>
                    <Route path='/signup' element={<SignUpPage />}></Route>
                    <Route path='/myorder' element={<MyOrders />}></Route>
                </Routes>
            </BrowserRouter>
        </CartProvider>
    )
}

export default App
