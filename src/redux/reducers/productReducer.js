import { GET_ERROR, CREATE_PRODUCTS } from "../type";

const inital = {
  products: [],
  loading: true,
};
const productReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATE_PRODUCTS:
      return {
        products: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return {
        loading: true,
        products: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
