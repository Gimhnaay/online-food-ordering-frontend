import logo from './logo.svg';
import './App.css';
import { Navbar } from './component/Navbar/Navbar';
import { ThemeProvider } from '@emotion/react';
import { dark } from '@mui/material/styles/createPalette';
import { darkTheme } from './Theme/DarkTheme';
import { CssBaseline } from '@mui/material';
import Home from './component/Home/Home';
import RestaurantDetails from './component/Restaurent/RestaurantDetails';
import Cart from './component/Cart/Cart';
import Profile from './component/Profile/Profile';
import { CustomerRoute } from './Routers/CustomerRoute';
import UserProfile from './component/Profile/UserProfile';
import { Orders } from './component/Profile/Order';
import Favorites from './component/Profile/Favorites';
import { Events } from './component/Profile/Events';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/Sate/Authentication/Action';
import { findCart } from './component/Sate/Cart/Action';
import Routers from './Routers/Routers';
import { getRestaurantByUserId } from './component/Sate/Restaurant/Action';


function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt))
  }, [auth.jwt]);

  useEffect(()=>{
    dispatch(getRestaurantByUserId(auth.jwt || jwt));
  },[auth.user])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
