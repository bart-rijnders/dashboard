import { EPINIO_TYPES } from '@/products/epinio/types';

export default {

  // TODO: RC DISCUSS tie in namespace selector with org

  urlOptions: () => (url, opt) => {
    // TODO: RC API determine handle filter, limit, sort
    return url;
  },

  keyFieldForType: () => (type) => {
    switch (type) {
    case EPINIO_TYPES.APP:
      return 'name';
    case EPINIO_TYPES.NAMESPACE:
    default:
      return 'id';
    }
  },
};
