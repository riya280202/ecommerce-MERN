import axios from "../helpers/axios";

export const addProduct = (form) => {
    return async dispatch => {
        const res= await axios.post("http://localhost:2000/api/product/create", form);
        console.log(res);
    }
}