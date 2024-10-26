import { useInsertDataWithImage } from "../../hooks/useInsertData";
import { CREATE_PRODUCTS ,GET_ERROR} from "../type";



// Create Product
export const createProduct = (formatData) => async (dispatch) => {
    try {
        const response = await useInsertDataWithImage(`/api/v1/products`, formatData);
        dispatch({
            type: CREATE_PRODUCTS,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}

