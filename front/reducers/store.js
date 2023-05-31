import produce from "../util/produce";

export const initailState = {
  // 유형
  productTypes: [],
  productTypes2: [],
  //
  st_getProductTypeLoading: false,
  st_getProductTypeDone: false,
  st_getProductTypeError: null,
  //
  st_getProductType2Loading: false,
  st_getProductType2Done: false,
  st_getProductType2Error: null,
  //
  st_newProductTypeLoading: false,
  st_newProductTypeDone: false,
  st_newProductTypeError: null,
  //
  st_modifyProductTypeLoading: false,
  st_modifyProductTypeDone: false,
  st_modifyProductTypeError: null,
  //
  st_delProductTypeLoading: false,
  st_delProductTypeDone: false,
  st_delProductTypeError: null,
};

export const GET_PRODUCTTYPE_REQUEST = "GET_PRODUCTTYPE_REQUEST";
export const GET_PRODUCTTYPE_SUCCESS = "GET_PRODUCTTYPE_SUCCESS";
export const GET_PRODUCTTYPE_FAILURE = "GET_PRODUCTTYPE_FAILURE";

export const GET2_PRODUCTTYPE_REQUEST = "GET2_PRODUCTTYPE_REQUEST";
export const GET2_PRODUCTTYPE_SUCCESS = "GET2_PRODUCTTYPE_SUCCESS";
export const GET2_PRODUCTTYPE_FAILURE = "GET2_PRODUCTTYPE_FAILURE";

export const NEW_PRODUCTTYPE_REQUEST = "NEW_PRODUCTTYPE_REQUEST";
export const NEW_PRODUCTTYPE_SUCCESS = "NEW_PRODUCTTYPE_SUCCESS";
export const NEW_PRODUCTTYPE_FAILURE = "NEW_PRODUCTTYPE_FAILURE";

export const MODIFY_PRODUCTTYPE_REQUEST = "MODIFY_PRODUCTTYPE_REQUEST";
export const MODIFY_PRODUCTTYPE_SUCCESS = "MODIFY_PRODUCTTYPE_SUCCESS";
export const MODIFY_PRODUCTTYPE_FAILURE = "MODIFY_PRODUCTTYPE_FAILURE";

export const DEL_PRODUCTTYPE_REQUEST = "DEL_PRODUCTTYPE_REQUEST";
export const DEL_PRODUCTTYPE_SUCCESS = "DEL_PRODUCTTYPE_SUCCESS";
export const DEL_PRODUCTTYPE_FAILURE = "DEL_PRODUCTTYPE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////

      case GET_PRODUCTTYPE_REQUEST: {
        draft.st_getProductTypeLoading = true;
        draft.st_getProductTypeDone = false;
        draft.st_getProductTypeError = null;
        break;
      }

      case GET_PRODUCTTYPE_SUCCESS: {
        draft.st_getProductTypeLoading = false;
        draft.st_getProductTypeDone = true;
        draft.st_getProductTypeError = null;
        draft.productTypes = action.data;
        break;
      }

      case GET_PRODUCTTYPE_FAILURE: {
        draft.st_getProductTypeLoading = false;
        draft.st_getProductTypeDone = false;
        draft.st_getProductTypeError = action.data.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case GET2_PRODUCTTYPE_REQUEST: {
        draft.st_getProductType2Loading = true;
        draft.st_getProductType2Done = false;
        draft.st_getProductType2Error = null;
        break;
      }

      case GET2_PRODUCTTYPE_SUCCESS: {
        draft.st_getProductType2Loading = false;
        draft.st_getProductType2Done = true;
        draft.st_getProductType2Error = null;
        draft.productTypes2 = action.data;
        break;
      }

      case GET2_PRODUCTTYPE_FAILURE: {
        draft.st_getProductType2Loading = false;
        draft.st_getProductType2Done = false;
        draft.st_getProductType2Error = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case NEW_PRODUCTTYPE_REQUEST: {
        draft.st_newProductTypeLoading = true;
        draft.st_newProductTypeDone = false;
        draft.st_newProductTypeError = null;
        break;
      }

      case NEW_PRODUCTTYPE_SUCCESS: {
        draft.st_newProductTypeLoading = false;
        draft.st_newProductTypeDone = true;
        draft.st_newProductTypeError = null;

        break;
      }

      case NEW_PRODUCTTYPE_FAILURE: {
        draft.st_newProductTypeLoading = false;
        draft.st_newProductTypeDone = false;
        draft.st_newProductTypeError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case MODIFY_PRODUCTTYPE_REQUEST: {
        draft.st_modifyProductTypeLoading = true;
        draft.st_modifyProductTypeDone = false;
        draft.st_modifyProductTypeError = null;
        break;
      }

      case MODIFY_PRODUCTTYPE_SUCCESS: {
        draft.st_modifyProductTypeLoading = false;
        draft.st_modifyProductTypeDone = true;
        draft.st_modifyProductTypeError = null;

        break;
      }

      case MODIFY_PRODUCTTYPE_FAILURE: {
        draft.st_modifyProductTypeLoading = false;
        draft.st_modifyProductTypeDone = false;
        draft.st_modifyProductTypeError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case DEL_PRODUCTTYPE_REQUEST: {
        draft.st_delProductTypeLoading = true;
        draft.st_delProductTypeDone = false;
        draft.st_delProductTypeError = null;
        break;
      }

      case DEL_PRODUCTTYPE_SUCCESS: {
        draft.st_delProductTypeLoading = false;
        draft.st_delProductTypeDone = true;
        draft.st_delProductTypeError = null;

        break;
      }

      case DEL_PRODUCTTYPE_FAILURE: {
        draft.st_delProductTypeLoading = false;
        draft.st_delProductTypeDone = false;
        draft.st_delProductTypeError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
