
import { CREATE_SUB_CATEGORY, GET_ERROR,GET_SUB_CATEGORY } from '../type'
import useGetData from '../../hooks/useGetData'
import { useInsertData } from '../../hooks/useInsertData';

// Create SubCategory
export const createSubCategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertData(`/api/v1/subcategories`, data);
        dispatch({
            type: CREATE_SUB_CATEGORY,
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



// Get SubCategory depend in cat id
export const getOneCategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/categories/${id}/subcategories`);
        console.log(response.data)
        dispatch({
            type: GET_SUB_CATEGORY,
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

