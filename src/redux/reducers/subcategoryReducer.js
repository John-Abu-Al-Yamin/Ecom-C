import { GET_ERROR, CREATE_SUB_CATEGORY,GET_SUB_CATEGORY } from "../type";

const inital = {
  subcategory: [],
  loading: true,
};
const subcategoryReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATE_SUB_CATEGORY:
      return {

        subcategory: action.payload,
        loading: false,
      };

      case GET_SUB_CATEGORY:
        return {
  
          subcategory: action.payload,
          loading: false,
        };


    case GET_ERROR:
      return {
        loading: true,
        subcategory: action.payload,
      };
    default:
      return state;
  }
};
export default subcategoryReducer;
