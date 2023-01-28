import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import userReducers from "./user.reducer";
import productReducers from "./product.reducer"
import orderReducers from "./order.reducer"
import categoryReducers from "./category.reducer"


const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    category: categoryReducers,
    product: productReducers,
    order: orderReducers

})

export default rootReducer;