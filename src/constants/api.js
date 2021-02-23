export const HEADERS = {
  DEFAULT_HEADER: { 'Content-Type': 'application/json; charset=UTF-8' },
  JWT_HEADER: () => ({
    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
  }),
  file_header: () => ({
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
  }),
}

export const API = {
  AUTH: {
    login: () => ({
      endpoint: 'auth/login',
      method: 'POST',
    }),
    reginster: () => ({
      endpoint: 'auth/adduser',
      method: 'POST',
    }),
    loginWithToken: () => ({
      endpoint: 'auth/login/token',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
  },

  ACCOUNT: {
    accountUser: () => ({
      endpoint: 'api/user/getbyid',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateAccount: () => ({
      endpoint: 'api/user/update',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
   
  },

  UPLOAD_FILE: {
    
    uploadFileProduct: () => ({
      endpoint: `/product/image`,
      method: 'POST',
      headers: HEADERS.file_header(), 
    })
  },
 
  SHOP_INFO: {
    shopInfoById: () => ({
      endpoint: 'api/shop/byid?id=1',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    inSertShopInfo: () => ({
      endpoint: 'api/shop/ins',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),

  },

  PRODUCTS: {
    productById: () => ({
      endpoint: 'api/product/byid',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    inSertProduct: () => ({
      endpoint: 'api/product/ins',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getProductOfShop: () => ({
      endpoint: 'api/product',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    deleteProduct: () => ({
      endpoint: 'api/product/del',
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateProduct: () => ({
      endpoint: 'api/product/update',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    })
  },
  CATOGORIES: {
    catogoriesById: () => ({
      endpoint: 'api/catogories/byid',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    inSertCatogories: () => ({
      endpoint: 'api/catogories/ins',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getCatogories: () => ({
      endpoint: 'api/catogories',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
    deleteCatogories: () => ({
      endpoint: 'api/catogories/del',
      method: 'DELETE',
      headers: HEADERS.JWT_HEADER(),
    }),
    updateCatogories: () => ({
      endpoint: 'api/catogories/update',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    })
    
  },
  IMPORTTIKETDETAIL: {

    inSertTiketDetail: () => ({
      endpoint: 'api/importproduct/ins',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getTiketDetail: () => ({
      endpoint: 'api/importproduct',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  ORDERDETAIL: {
    inSertOrder: () => ({
      endpoint: 'api/orders/ins',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getOrderDetail: () => ({
      endpoint: 'api/orders',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  CUSTOMER: {
    inSertCustomer: () => ({
      endpoint: 'api/customer/ins',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getCustomer: () => ({
      endpoint: 'api/customer',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
  SUPPLIER: {
    inSertSupplier: () => ({
      endpoint: 'api/supplier/ins',
      method: 'POST',
      headers: HEADERS.JWT_HEADER(),
    }),
    getSupplier: () => ({
      endpoint: 'api/supplier',
      method: 'GET',
      headers: HEADERS.JWT_HEADER(),
    }),
  },
}
