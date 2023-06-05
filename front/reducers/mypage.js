import produce from "../util/produce";

export const initailState = {
  boughtList: [], // 구매내역
  boughtDetail: null, // 구매내역상세
  wishList: [], // 위시리스트
  addressList: [], // 배송지리스트

  // 구매내역 가져오기
  st_boughtListLoading: false,
  st_boughtListDone: false,
  st_boughtListError: null,
  // 구매내역상세 가져오기
  st_boughtDetailLoading: false,
  st_boughtDetailDone: false,
  st_boughtDetailError: null,
  // 위시리스트 가져오기
  st_wishListLoading: false,
  st_wishListDone: false,
  st_wishListError: null,
  // 배송지리스트 가져오기
  st_addressListLoading: false,
  st_addressListDone: false,
  st_addressListError: null,
  // 배송지리스트 추가하기
  st_addressCreateLoading: false,
  st_addressCreateDone: false,
  st_addressCreateError: null,
  // 배송지리스트 수정하기
  st_addressUpdateLoading: false,
  st_addressUpdateDone: false,
  st_addressUpdateError: null,
  // 배송지리스트 삭제하기
  st_addressDeleteLoading: false,
  st_addressDeleteDone: false,
  st_addressDeleteError: null,
  // 배송지리스트 기본배송지
  st_addressBasicLoading: false,
  st_addressBasicDone: false,
  st_addressBasicError: null,
};

export const BOUGHT_LIST_REQUEST = "BOUGHT_LIST_REQUEST";
export const BOUGHT_LIST_SUCCESS = "BOUGHT_LIST_SUCCESS";
export const BOUGHT_LIST_FAILURE = "BOUGHT_LIST_FAILURE";

export const BOUGHT_DETAIL_REQUEST = "BOUGHT_DETAIL_REQUEST";
export const BOUGHT_DETAIL_SUCCESS = "BOUGHT_DETAIL_SUCCESS";
export const BOUGHT_DETAIL_FAILURE = "BOUGHT_DETAIL_FAILURE";

export const WISH_LIST_REQUEST = "WISH_LIST_REQUEST";
export const WISH_LIST_SUCCESS = "WISH_LIST_SUCCESS";
export const WISH_LIST_FAILURE = "WISH_LIST_FAILURE";

export const ADDRESS_LIST_REQUEST = "ADDRESS_LIST_REQUEST";
export const ADDRESS_LIST_SUCCESS = "ADDRESS_LIST_SUCCESS";
export const ADDRESS_LIST_FAILURE = "ADDRESS_LIST_FAILURE";

export const ADDRESS_CREATE_REQUEST = "ADDRESS_CREATE_REQUEST";
export const ADDRESS_CREATE_SUCCESS = "ADDRESS_CREATE_SUCCESS";
export const ADDRESS_CREATE_FAILURE = "ADDRESS_CREATE_FAILURE";

export const ADDRESS_UPDATE_REQUEST = "ADDRESS_UPDATE_REQUEST";
export const ADDRESS_UPDATE_SUCCESS = "ADDRESS_UPDATE_SUCCESS";
export const ADDRESS_UPDATE_FAILURE = "ADDRESS_UPDATE_FAILURE";

export const ADDRESS_DELETE_REQUEST = "ADDRESS_DELETE_REQUEST";
export const ADDRESS_DELETE_SUCCESS = "ADDRESS_DELETE_SUCCESS";
export const ADDRESS_DELETE_FAILURE = "ADDRESS_DELETE_FAILURE";

export const ADDRESS_BASIC_REQUEST = "ADDRESS_BASIC_REQUEST";
export const ADDRESS_BASIC_SUCCESS = "ADDRESS_BASIC_SUCCESS";
export const ADDRESS_BASIC_FAILURE = "ADDRESS_BASIC_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BOUGHT_LIST_REQUEST: {
        draft.st_boughtListLoading = true;
        draft.st_boughtListDone = false;
        draft.st_boughtListError = null;
        break;
      }
      case BOUGHT_LIST_SUCCESS: {
        draft.st_boughtListLoading = false;
        draft.st_boughtListDone = true;
        draft.st_boughtListError = null;
        draft.boughtList = action.data;
        break;
      }
      case BOUGHT_LIST_FAILURE: {
        draft.st_boughtListLoading = false;
        draft.st_boughtListDone = false;
        draft.st_boughtListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case BOUGHT_DETAIL_REQUEST: {
        draft.st_boughtDetailLoading = true;
        draft.st_boughtDetailDone = false;
        draft.st_boughtDetailError = null;
        break;
      }
      case BOUGHT_DETAIL_SUCCESS: {
        draft.st_boughtDetailLoading = false;
        draft.st_boughtDetailDone = true;
        draft.st_boughtDetailError = null;
        draft.boughtDetail = action.data[0];
        break;
      }
      case BOUGHT_DETAIL_FAILURE: {
        draft.st_boughtDetailLoading = false;
        draft.st_boughtDetailDone = false;
        draft.st_boughtDetailError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case WISH_LIST_REQUEST: {
        draft.st_wishListLoading = true;
        draft.st_wishListDone = false;
        draft.st_wishListError = null;
        break;
      }
      case WISH_LIST_SUCCESS: {
        draft.st_wishListLoading = false;
        draft.st_wishListDone = true;
        draft.st_wishListError = null;
        draft.wishList = action.data.wishList;
        break;
      }
      case WISH_LIST_FAILURE: {
        draft.st_wishListLoading = false;
        draft.st_wishListDone = false;
        draft.st_wishListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case ADDRESS_LIST_REQUEST: {
        draft.st_addressListLoading = true;
        draft.st_addressListDone = false;
        draft.st_addressListError = null;
        break;
      }
      case ADDRESS_LIST_SUCCESS: {
        draft.st_addressListLoading = false;
        draft.st_addressListDone = true;
        draft.st_addressListError = null;
        draft.addressList = action.data;
        break;
      }
      case ADDRESS_LIST_FAILURE: {
        draft.st_addressListLoading = false;
        draft.st_addressListDone = false;
        draft.st_addressListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case ADDRESS_CREATE_REQUEST: {
        draft.st_addressCreateLoading = true;
        draft.st_addressCreateDone = false;
        draft.st_addressCreateError = null;
        break;
      }
      case ADDRESS_CREATE_SUCCESS: {
        draft.st_addressCreateLoading = false;
        draft.st_addressCreateDone = true;
        draft.st_addressCreateError = null;
        break;
      }
      case ADDRESS_CREATE_FAILURE: {
        draft.st_addressCreateLoading = false;
        draft.st_addressCreateDone = false;
        draft.st_addressCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case ADDRESS_UPDATE_REQUEST: {
        draft.st_addressUpdateLoading = true;
        draft.st_addressUpdateDone = false;
        draft.st_addressUpdateError = null;
        break;
      }
      case ADDRESS_UPDATE_SUCCESS: {
        draft.st_addressUpdateLoading = false;
        draft.st_addressUpdateDone = true;
        draft.st_addressUpdateError = null;
        break;
      }
      case ADDRESS_UPDATE_FAILURE: {
        draft.st_addressUpdateLoading = false;
        draft.st_addressUpdateDone = false;
        draft.st_addressUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case ADDRESS_DELETE_REQUEST: {
        draft.st_addressDeleteLoading = true;
        draft.st_addressDeleteDone = false;
        draft.st_addressDeleteError = null;
        break;
      }
      case ADDRESS_DELETE_SUCCESS: {
        draft.st_addressDeleteLoading = false;
        draft.st_addressDeleteDone = true;
        draft.st_addressDeleteError = null;
        break;
      }
      case ADDRESS_DELETE_FAILURE: {
        draft.st_addressDeleteLoading = false;
        draft.st_addressDeleteDone = false;
        draft.st_addressDeleteError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case ADDRESS_BASIC_REQUEST: {
        draft.st_addressBasicLoading = true;
        draft.st_addressBasicDone = false;
        draft.st_addressBasicError = null;
        break;
      }
      case ADDRESS_BASIC_SUCCESS: {
        draft.st_addressBasicLoading = false;
        draft.st_addressBasicDone = true;
        draft.st_addressBasicError = null;
        break;
      }
      case ADDRESS_BASIC_FAILURE: {
        draft.st_addressBasicLoading = false;
        draft.st_addressBasicDone = false;
        draft.st_addressBasicError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
