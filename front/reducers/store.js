import produce from "../util/produce";

export const initailState = {
  // 유형
  productTypes: [],
  productTypes2: [],
  thumbnailPath: null,
  detailImagePath: null,
  wishChart: [],
  boughtlist: [],
  productDetail: [], // 상품상세가져오기
  boughtHistoryId: null, // 구매 후 ID값
  // 상품
  products: [],
  products2: [],
  // 상품유형 가져오기
  st_getProductTypeLoading: false,
  st_getProductTypeDone: false,
  st_getProductTypeError: null,
  // 상품유형 통계 가져오기
  st_getProductType2Loading: false,
  st_getProductType2Done: false,
  st_getProductType2Error: null,
  // 상품유형 추가하기
  st_newProductTypeLoading: false,
  st_newProductTypeDone: false,
  st_newProductTypeError: null,
  // 상품유형 수정하기
  st_modifyProductTypeLoading: false,
  st_modifyProductTypeDone: false,
  st_modifyProductTypeError: null,
  // 상품유형 삭제하기
  st_delProductTypeLoading: false,
  st_delProductTypeDone: false,
  st_delProductTypeError: null,
  // 상품데이터 가져오기
  st_getProductLoading: false,
  st_getProductDone: false,
  st_getProductError: null,
  // 상품데이터 통계 가져오기
  st_getProduct2Loading: false,
  st_getProduct2Done: false,
  st_getProduct2Error: null,
  // 상품데이터 토글 수정
  st_toggleProductLoading: false,
  st_toggleProductDone: false,
  st_toggleProductError: null,
  // 상품데이터 수정
  st_updateProductLoading: false,
  st_updateProductDone: false,
  st_updateProductError: null,

  // 상품데이터 썸네일 업로드
  st_uploadThumbnailLoading: false,
  st_uploadThumbnailDone: false,
  st_uploadThumbnailError: null,

  // 상품데이터 썸네일 업로드 적용
  st_saveThumbnailLoading: false,
  st_saveThumbnailDone: false,
  st_saveThumbnailError: null,

  // 상품데이터 상세이미지 업로드 적용
  st_uploadDetailImageLoading: false,
  st_uploadDetailImageDone: false,
  st_uploadDetailImageError: null,

  // 상품데이터 상세이미지 추가
  st_addDetailImageLoading: false,
  st_addDetailImageDone: false,
  st_addDetailImageError: null,

  // 상품데이터 상세이미지 삭제
  st_delDetailImageLoading: false,
  st_delDetailImageDone: false,
  st_delDetailImageError: null,

  // 상품데이터 생성
  st_newProductLoading: false,
  st_newProductDone: false,
  st_newProductError: null,

  // 상품데이터 삭제
  st_delProductLoading: false,
  st_delProductDone: false,
  st_delProductError: null,

  // 상품옵션 추가
  st_addOptionLoading: false,
  st_addOptionDone: false,
  st_addOptionError: null,

  // 상품옵션 삭제
  st_delOptionLoading: false,
  st_delOptionDone: false,
  st_delOptionError: null,

  // 상품옵션2 추가
  st_addOption2Loading: false,
  st_addOption2Done: false,
  st_addOption2Error: null,

  // 상품옵션2 삭제
  st_delOption2Loading: false,
  st_delOption2Done: false,
  st_delOption2Error: null,

  // 위시 통계
  st_wishChartLoading: false,
  st_wishChartDone: false,
  st_wishChartError: null,

  // 구매내역 리스트
  st_getBoughtListLoading: false,
  st_getBoughtListDone: false,
  st_getBoughtListError: null,

  // 주문현황 변경
  st_statusBoughtListLoading: false,
  st_statusBoughtListDone: false,
  st_statusBoughtListError: null,

  // 배송지 변경
  st_deliBoughtListLoading: false,
  st_deliBoughtListDone: false,
  st_deliBoughtListError: null,

  // 상품상세가져오기
  st_productDetialLoading: false,
  st_productDetialDone: false,
  st_productDetialError: null,

  // 취소/환불 처리
  st_cancelBoughtLoading: false,
  st_cancelBoughtDone: false,
  st_cancelBoughtError: null,

  // 상품 구매하기
  st_boughtCreateLoading: false,
  st_boughtCreateDone: false,
  st_boughtCreateError: null,
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

export const GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAILURE = "GET_PRODUCT_FAILURE";

export const GET_PRODUCT2_REQUEST = "GET_PRODUCT2_REQUEST";
export const GET_PRODUCT2_SUCCESS = "GET_PRODUCT2_SUCCESS";
export const GET_PRODUCT2_FAILURE = "GET_PRODUCT2_FAILURE";

export const TOGGLE_PRODUCT_REQUEST = "TOGGLE_PRODUCT_REQUEST";
export const TOGGLE_PRODUCT_SUCCESS = "TOGGLE_PRODUCT_SUCCESS";
export const TOGGLE_PRODUCT_FAILURE = "TOGGLE_PRODUCT_FAILURE";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

export const UPLOAD_THUMBNAIL_REQUEST = "UPLOAD_THUMBNAIL_REQUEST";
export const UPLOAD_THUMBNAIL_SUCCESS = "UPLOAD_THUMBNAIL_SUCCESS";
export const UPLOAD_THUMBNAIL_FAILURE = "UPLOAD_THUMBNAIL_FAILURE";

export const SAVE_THUMBNAIL_REQUEST = "SAVE_THUMBNAIL_REQUEST";
export const SAVE_THUMBNAIL_SUCCESS = "SAVE_THUMBNAIL_SUCCESS";
export const SAVE_THUMBNAIL_FAILURE = "SAVE_THUMBNAIL_FAILURE";

export const UPLOAD_DETAIL_REQUEST = "UPLOAD_DETAIL_REQUEST";
export const UPLOAD_DETAIL_SUCCESS = "UPLOAD_DETAIL_SUCCESS";
export const UPLOAD_DETAIL_FAILURE = "UPLOAD_DETAIL_FAILURE";

export const ADD_DETAIL_REQUEST = "ADD_DETAIL_REQUEST";
export const ADD_DETAIL_SUCCESS = "ADD_DETAIL_SUCCESS";
export const ADD_DETAIL_FAILURE = "ADD_DETAIL_FAILURE";

export const DEL_DETAIL_REQUEST = "DEL_DETAIL_REQUEST";
export const DEL_DETAIL_SUCCESS = "DEL_DETAIL_SUCCESS";
export const DEL_DETAIL_FAILURE = "DEL_DETAIL_FAILURE";

export const NEW_PRODUCT_REQUEST = "NEW_PRODUCT_REQUEST";
export const NEW_PRODUCT_SUCCESS = "NEW_PRODUCT_SUCCESS";
export const NEW_PRODUCT_FAILURE = "NEW_PRODUCT_FAILURE";

export const DEL_PRODUCT_REQUEST = "DEL_PRODUCT_REQUEST";
export const DEL_PRODUCT_SUCCESS = "DEL_PRODUCT_SUCCESS";
export const DEL_PRODUCT_FAILURE = "DEL_PRODUCT_FAILURE";

export const ADD_OPTION_REQUEST = "ADD_OPTION_REQUEST";
export const ADD_OPTION_SUCCESS = "ADD_OPTION_SUCCESS";
export const ADD_OPTION_FAILURE = "ADD_OPTION_FAILURE";

export const DEL_OPTION_REQUEST = "DEL_OPTION_REQUEST";
export const DEL_OPTION_SUCCESS = "DEL_OPTION_SUCCESS";
export const DEL_OPTION_FAILURE = "DEL_OPTION_FAILURE";

export const ADD_OPTION2_REQUEST = "ADD_OPTION2_REQUEST";
export const ADD_OPTION2_SUCCESS = "ADD_OPTION2_SUCCESS";
export const ADD_OPTION2_FAILURE = "ADD_OPTION2_FAILURE";

export const DEL_OPTION2_REQUEST = "DEL_OPTION2_REQUEST";
export const DEL_OPTION2_SUCCESS = "DEL_OPTION2_SUCCESS";
export const DEL_OPTION2_FAILURE = "DEL_OPTION2_FAILURE";

export const WISH_CHART_REQUEST = "WISH_CHART_REQUEST";
export const WISH_CHART_SUCCESS = "WISH_CHART_SUCCESS";
export const WISH_CHART_FAILURE = "WISH_CHART_FAILURE";

export const GET_BOUGHTLIST_REQUEST = "GET_BOUGHTLIST_REQUEST";
export const GET_BOUGHTLIST_SUCCESS = "GET_BOUGHTLIST_SUCCESS";
export const GET_BOUGHTLIST_FAILURE = "GET_BOUGHTLIST_FAILURE";

export const STATUS_BOUGHTLIST_REQUEST = "STATUS_BOUGHTLIST_REQUEST";
export const STATUS_BOUGHTLIST_SUCCESS = "STATUS_BOUGHTLIST_SUCCESS";
export const STATUS_BOUGHTLIST_FAILURE = "STATUS_BOUGHTLIST_FAILURE";

export const DELI_BOUGHTLIST_REQUEST = "DELI_BOUGHTLIST_REQUEST";
export const DELI_BOUGHTLIST_SUCCESS = "DELI_BOUGHTLIST_SUCCESS";
export const DELI_BOUGHTLIST_FAILURE = "DELI_BOUGHTLIST_FAILURE";

export const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
export const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
export const PRODUCT_DETAIL_FAILURE = "PRODUCT_DETAIL_FAILURE";

export const CANCEL_BOUGHT_REQUEST = "CANCEL_BOUGHT_REQUEST";
export const CANCEL_BOUGHT_SUCCESS = "CANCEL_BOUGHT_SUCCESS";
export const CANCEL_BOUGHT_FAILURE = "CANCEL_BOUGHT_FAILURE";

export const BOUGHT_CREATE_REQUEST = "BOUGHT_CREATE_REQUEST";
export const BOUGHT_CREATE_SUCCESS = "BOUGHT_CREATE_SUCCESS";
export const BOUGHT_CREATE_FAILURE = "BOUGHT_CREATE_FAILURE";

export const INIT_TH = "INIT_TH";

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
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case GET_PRODUCT_REQUEST: {
        draft.st_getProductLoading = true;
        draft.st_getProductDone = false;
        draft.st_getProductError = null;
        break;
      }

      case GET_PRODUCT_SUCCESS: {
        draft.st_getProductLoading = false;
        draft.st_getProductDone = true;
        draft.st_getProductError = null;
        draft.products = action.data;
        break;
      }

      case GET_PRODUCT_FAILURE: {
        draft.st_getProductLoading = false;
        draft.st_getProductDone = false;
        draft.st_getProductError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case GET_PRODUCT2_REQUEST: {
        draft.st_getProduct2Loading = true;
        draft.st_getProduct2Done = false;
        draft.st_getProduct2Error = null;
        break;
      }

      case GET_PRODUCT2_SUCCESS: {
        draft.st_getProduct2Loading = false;
        draft.st_getProduct2Done = true;
        draft.st_getProduct2Error = null;
        draft.products2 = action.data;
        break;
      }

      case GET_PRODUCT2_FAILURE: {
        draft.st_getProduct2Loading = false;
        draft.st_getProduct2Done = false;
        draft.st_getProduct2Error = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case TOGGLE_PRODUCT_REQUEST: {
        draft.st_toggleProductLoading = true;
        draft.st_toggleProductDone = false;
        draft.st_toggleProductError = null;
        break;
      }

      case TOGGLE_PRODUCT_SUCCESS: {
        draft.st_toggleProductLoading = false;
        draft.st_toggleProductDone = true;
        draft.st_toggleProductError = null;
        break;
      }

      case TOGGLE_PRODUCT_FAILURE: {
        draft.st_toggleProductLoading = false;
        draft.st_toggleProductDone = false;
        draft.st_toggleProductError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case UPDATE_PRODUCT_REQUEST: {
        draft.st_updateProductLoading = true;
        draft.st_updateProductDone = false;
        draft.st_updateProductError = null;
        break;
      }

      case UPDATE_PRODUCT_SUCCESS: {
        draft.st_updateProductLoading = false;
        draft.st_updateProductDone = true;
        draft.st_updateProductError = null;
        break;
      }

      case UPDATE_PRODUCT_FAILURE: {
        draft.st_updateProductLoading = false;
        draft.st_updateProductDone = false;
        draft.st_updateProductError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case UPLOAD_THUMBNAIL_REQUEST: {
        draft.st_uploadThumbnailLoading = true;
        draft.st_uploadThumbnailDone = false;
        draft.st_uploadThumbnailError = null;
        break;
      }

      case UPLOAD_THUMBNAIL_SUCCESS: {
        draft.st_uploadThumbnailLoading = false;
        draft.st_uploadThumbnailDone = true;
        draft.st_uploadThumbnailError = null;
        draft.thumbnailPath = action.data.path;
        break;
      }

      case UPLOAD_THUMBNAIL_FAILURE: {
        draft.st_uploadThumbnailLoading = false;
        draft.st_uploadThumbnailDone = false;
        draft.st_uploadThumbnailError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case UPLOAD_DETAIL_REQUEST: {
        draft.st_uploadDetailImageLoading = true;
        draft.st_uploadDetailImageDone = false;
        draft.st_uploadDetailImageError = null;
        break;
      }

      case UPLOAD_DETAIL_SUCCESS: {
        draft.st_uploadDetailImageLoading = false;
        draft.st_uploadDetailImageDone = true;
        draft.st_uploadDetailImageError = null;
        draft.detailImagePath = action.data;
        break;
      }

      case UPLOAD_DETAIL_FAILURE: {
        draft.st_uploadDetailImageLoading = false;
        draft.st_uploadDetailImageDone = false;
        draft.st_uploadDetailImageError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case SAVE_THUMBNAIL_REQUEST: {
        draft.st_saveThumbnailLoading = true;
        draft.st_saveThumbnailDone = false;
        draft.st_saveThumbnailError = null;
        break;
      }

      case SAVE_THUMBNAIL_SUCCESS: {
        draft.st_saveThumbnailLoading = false;
        draft.st_saveThumbnailDone = true;
        draft.st_saveThumbnailError = null;
        break;
      }

      case SAVE_THUMBNAIL_FAILURE: {
        draft.st_saveThumbnailLoading = false;
        draft.st_saveThumbnailDone = false;
        draft.st_saveThumbnailError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case ADD_DETAIL_REQUEST: {
        draft.st_addDetailImageLoading = true;
        draft.st_addDetailImageDone = false;
        draft.st_addDetailImageError = null;
        break;
      }

      case ADD_DETAIL_SUCCESS: {
        draft.st_addDetailImageLoading = false;
        draft.st_addDetailImageDone = true;
        draft.st_addDetailImageError = null;
        break;
      }

      case ADD_DETAIL_FAILURE: {
        draft.st_addDetailImageLoading = false;
        draft.st_addDetailImageDone = false;
        draft.st_addDetailImageError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case DEL_DETAIL_REQUEST: {
        draft.st_delDetailImageLoading = true;
        draft.st_delDetailImageDone = false;
        draft.st_delDetailImageError = null;
        break;
      }

      case DEL_DETAIL_SUCCESS: {
        draft.st_delDetailImageLoading = false;
        draft.st_delDetailImageDone = true;
        draft.st_delDetailImageError = null;
        break;
      }

      case DEL_DETAIL_FAILURE: {
        draft.st_delDetailImageLoading = false;
        draft.st_delDetailImageDone = false;
        draft.st_delDetailImageError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case NEW_PRODUCT_REQUEST: {
        draft.st_newProductLoading = true;
        draft.st_newProductDone = false;
        draft.st_newProductError = null;
        break;
      }

      case NEW_PRODUCT_SUCCESS: {
        draft.st_newProductLoading = false;
        draft.st_newProductDone = true;
        draft.st_newProductError = null;
        break;
      }

      case NEW_PRODUCT_FAILURE: {
        draft.st_newProductLoading = false;
        draft.st_newProductDone = false;
        draft.st_newProductError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case DEL_PRODUCT_REQUEST: {
        draft.st_delProductLoading = true;
        draft.st_delProductDone = false;
        draft.st_delProductError = null;
        break;
      }

      case DEL_PRODUCT_SUCCESS: {
        draft.st_delProductLoading = false;
        draft.st_delProductDone = true;
        draft.st_delProductError = null;
        break;
      }

      case DEL_PRODUCT_FAILURE: {
        draft.st_delProductLoading = false;
        draft.st_delProductDone = false;
        draft.st_delProductError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case ADD_OPTION_REQUEST: {
        draft.st_addOptionLoading = true;
        draft.st_addOptionDone = false;
        draft.st_addOptionError = null;
        break;
      }

      case ADD_OPTION_SUCCESS: {
        draft.st_addOptionLoading = false;
        draft.st_addOptionDone = true;
        draft.st_addOptionError = null;
        break;
      }

      case ADD_OPTION_FAILURE: {
        draft.st_addOptionLoading = false;
        draft.st_addOptionDone = false;
        draft.st_addOptionError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case DEL_OPTION_REQUEST: {
        draft.st_delOptionLoading = true;
        draft.st_delOptionDone = false;
        draft.st_delOptionError = null;
        break;
      }

      case DEL_OPTION_SUCCESS: {
        draft.st_delOptionLoading = false;
        draft.st_delOptionDone = true;
        draft.st_delOptionError = null;
        break;
      }

      case DEL_OPTION_FAILURE: {
        draft.st_delOptionLoading = false;
        draft.st_delOptionDone = false;
        draft.st_delOptionError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case ADD_OPTION2_REQUEST: {
        draft.st_addOption2Loading = true;
        draft.st_addOption2Done = false;
        draft.st_addOption2Error = null;
        break;
      }

      case ADD_OPTION2_SUCCESS: {
        draft.st_addOption2Loading = false;
        draft.st_addOption2Done = true;
        draft.st_addOption2Error = null;
        break;
      }

      case ADD_OPTION2_FAILURE: {
        draft.st_addOption2Loading = false;
        draft.st_addOption2Done = false;
        draft.st_addOption2Error = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case DEL_OPTION2_REQUEST: {
        draft.st_delOption2Loading = true;
        draft.st_delOption2Done = false;
        draft.st_delOption2Error = null;
        break;
      }

      case DEL_OPTION2_SUCCESS: {
        draft.st_delOption2Loading = false;
        draft.st_delOption2Done = true;
        draft.st_delOption2Error = null;
        break;
      }

      case DEL_OPTION2_FAILURE: {
        draft.st_delOption2Loading = false;
        draft.st_delOption2Done = false;
        draft.st_delOption2Error = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case WISH_CHART_REQUEST: {
        draft.st_wishChartLoading = true;
        draft.st_wishChartDone = false;
        draft.st_wishChartError = null;
        break;
      }

      case WISH_CHART_SUCCESS: {
        draft.st_wishChartLoading = false;
        draft.st_wishChartDone = true;
        draft.st_wishChartError = null;
        draft.wishChart = action.data;
        break;
      }

      case WISH_CHART_FAILURE: {
        draft.st_wishChartLoading = false;
        draft.st_wishChartDone = false;
        draft.st_wishChartError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case GET_BOUGHTLIST_REQUEST: {
        draft.st_getBoughtListLoading = true;
        draft.st_getBoughtListDone = false;
        draft.st_getBoughtListError = null;
        break;
      }

      case GET_BOUGHTLIST_SUCCESS: {
        draft.st_getBoughtListLoading = false;
        draft.st_getBoughtListDone = true;
        draft.st_getBoughtListError = null;
        draft.boughtlist = action.data;
        break;
      }

      case GET_BOUGHTLIST_FAILURE: {
        draft.st_getBoughtListLoading = false;
        draft.st_getBoughtListDone = false;
        draft.st_getBoughtListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case STATUS_BOUGHTLIST_REQUEST: {
        draft.st_statusBoughtListLoading = true;
        draft.st_statusBoughtListDone = false;
        draft.st_statusBoughtListError = null;
        break;
      }

      case STATUS_BOUGHTLIST_SUCCESS: {
        draft.st_statusBoughtListLoading = false;
        draft.st_statusBoughtListDone = true;
        draft.st_statusBoughtListError = null;
        break;
      }

      case STATUS_BOUGHTLIST_FAILURE: {
        draft.st_statusBoughtListLoading = false;
        draft.st_statusBoughtListDone = false;
        draft.st_statusBoughtListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case DELI_BOUGHTLIST_REQUEST: {
        draft.st_deliBoughtListLoading = true;
        draft.st_deliBoughtListDone = false;
        draft.st_deliBoughtListError = null;
        break;
      }

      case DELI_BOUGHTLIST_SUCCESS: {
        draft.st_deliBoughtListLoading = false;
        draft.st_deliBoughtListDone = true;
        draft.st_deliBoughtListError = null;
        break;
      }

      case DELI_BOUGHTLIST_FAILURE: {
        draft.st_deliBoughtListLoading = false;
        draft.st_deliBoughtListDone = false;
        draft.st_deliBoughtListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case PRODUCT_DETAIL_REQUEST: {
        draft.st_productDetailLoading = true;
        draft.st_productDetailDone = false;
        draft.st_productDetailError = null;
        break;
      }

      case PRODUCT_DETAIL_SUCCESS: {
        draft.st_productDetailLoading = false;
        draft.st_productDetailDone = true;
        draft.st_productDetailError = null;
        draft.productDetail = action.data;
        break;
      }

      case PRODUCT_DETAIL_FAILURE: {
        draft.st_productDetailLoading = false;
        draft.st_productDetailDone = false;
        draft.st_productDetailError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case CANCEL_BOUGHT_REQUEST: {
        draft.st_cancelBoughtLoading = true;
        draft.st_cancelBoughtDone = false;
        draft.st_cancelBoughtError = null;
        break;
      }

      case CANCEL_BOUGHT_SUCCESS: {
        draft.st_cancelBoughtLoading = false;
        draft.st_cancelBoughtDone = true;
        draft.st_cancelBoughtError = null;
        break;
      }

      case CANCEL_BOUGHT_FAILURE: {
        draft.st_cancelBoughtLoading = false;
        draft.st_cancelBoughtDone = false;
        draft.st_cancelBoughtError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case BOUGHT_CREATE_REQUEST: {
        draft.st_boughtCreateLoading = true;
        draft.st_boughtCreateDone = false;
        draft.st_boughtCreateError = null;
        break;
      }

      case BOUGHT_CREATE_SUCCESS: {
        draft.st_boughtCreateLoading = false;
        draft.st_boughtCreateDone = true;
        draft.st_boughtCreateError = null;
        draft.boughtHistoryId = action.data.boughtHistoryId;
        break;
      }

      case BOUGHT_CREATE_FAILURE: {
        draft.st_boughtCreateLoading = false;
        draft.st_boughtCreateDone = false;
        draft.st_boughtCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case INIT_TH: {
        draft.st_uploadThumbnailLoading = false;
        draft.st_uploadThumbnailDone = false;
        draft.st_uploadThumbnailError = null;
        draft.thumbnailPath = null;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
