import produce from "../util/produce";

export const initailState = {
  cartList: [], // 장바구니
  // 장바구니 가져오기
  st_cartListLoading: false,
  st_cartListDone: false,
  st_cartListError: null,
  // 장바구니 추가하기
  st_cartCreateLoading: false,
  st_cartCreateDone: false,
  st_cartCreateError: null,
  // 장바구니 수량 수정하기
  st_cartQunUpdateLoading: false,
  st_cartQunUpdateDone: false,
  st_cartQunUpdateError: null,
  // 장바구니 삭제하기
  st_cartDeleteLoading: false,
  st_cartDeleteDone: false,
  st_cartDeleteError: null,
};

export const CART_LIST_REQUEST = "CART_LIST_REQUEST";
export const CART_LIST_SUCCESS = "CART_LIST_SUCCESS";
export const CART_LIST_FAILURE = "CART_LIST_FAILURE";

export const CART_CREATE_REQUEST = "CART_CREATE_REQUEST";
export const CART_CREATE_SUCCESS = "CART_CREATE_SUCCESS";
export const CART_CREATE_FAILURE = "CART_CREATE_FAILURE";

export const CART_QUN_UPDATE_REQUEST = "CART_QUN_UPDATE_REQUEST";
export const CART_QUN_UPDATE_SUCCESS = "CART_QUN_UPDATE_SUCCESS";
export const CART_QUN_UPDATE_FAILURE = "CART_QUN_UPDATE_FAILURE";

export const CART_DELETE_REQUEST = "CART_DELETE_REQUEST";
export const CART_DELETE_SUCCESS = "CART_DELETE_SUCCESS";
export const CART_DELETE_FAILURE = "CART_DELETE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CART_LIST_REQUEST: {
        draft.st_cartListLoading = true;
        draft.st_cartListDone = false;
        draft.st_cartListError = null;
        break;
      }
      case CART_LIST_SUCCESS: {
        draft.st_cartListLoading = false;
        draft.st_cartListDone = true;
        draft.st_cartListError = null;
        draft.cartList = action.data;
        break;
      }
      case CART_LIST_FAILURE: {
        draft.st_cartListLoading = false;
        draft.st_cartListDone = false;
        draft.st_cartListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case CART_CREATE_REQUEST: {
        draft.st_cartCreateLoading = true;
        draft.st_cartCreateDone = false;
        draft.st_cartCreateError = null;
        break;
      }
      case CART_CREATE_SUCCESS: {
        draft.st_cartCreateLoading = false;
        draft.st_cartCreateDone = true;
        draft.st_cartCreateError = null;
        break;
      }
      case CART_CREATE_FAILURE: {
        draft.st_cartCreateLoading = false;
        draft.st_cartCreateDone = false;
        draft.st_cartCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case CART_QUN_UPDATE_REQUEST: {
        draft.st_cartQunUpdateLoading = true;
        draft.st_cartQunUpdateDone = false;
        draft.st_cartQunUpdateError = null;
        break;
      }
      case CART_QUN_UPDATE_SUCCESS: {
        draft.st_cartQunUpdateLoading = false;
        draft.st_cartQunUpdateDone = true;
        draft.st_cartQunUpdateError = null;
        break;
      }
      case CART_QUN_UPDATE_FAILURE: {
        draft.st_cartQunUpdateLoading = false;
        draft.st_cartQunUpdateDone = false;
        draft.st_cartQunUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case CART_DELETE_REQUEST: {
        draft.st_cartDeleteLoading = true;
        draft.st_cartDeleteDone = false;
        draft.st_cartDeleteError = null;
        break;
      }
      case CART_DELETE_SUCCESS: {
        draft.st_cartDeleteLoading = false;
        draft.st_cartDeleteDone = true;
        draft.st_cartDeleteError = null;
        break;
      }
      case CART_DELETE_FAILURE: {
        draft.st_cartDeleteLoading = false;
        draft.st_cartDeleteDone = false;
        draft.st_cartDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
