
import { combineReducers } from 'redux-immutable';
import authReducer from './auth/login/redux/reducer';
import registerReducer from "./auth/Register/redux/reducer";
import authDetailReducer from "./auth/AuthDetail/redux/reducer";
import appReducer from "../components/Header/redux/reducer";
import shopInfoReducer from "./Home/redux/reducer";
import productReducer from "./Product/redux/reducer";
import catogoriesReducer from "./Catogories/redux/reducer";
import importTiketReducer from "./TiketDetail/redux/reducer";
import orderDetailReducer from "./OrderDetail/redux/reducer";
import supplierReducer from "./Supplier/redux/reducer";
import customerReducer from "./Customer/redux/reducer";
export default combineReducers({
    shopInfoReducer,
    authDetailReducer,
    registerReducer,
    authReducer,
    appReducer,
    productReducer,
    catogoriesReducer,
    importTiketReducer,
    orderDetailReducer,
    supplierReducer,
    customerReducer
});
