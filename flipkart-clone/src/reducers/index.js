import { combineReducers } from "redux";
import categoryReducers from "./category.reducer"


const rootReducer = combineReducers({
    category: categoryReducers

})

export default rootReducer;