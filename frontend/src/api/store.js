import { instance, instanceAuth } from '@/api';
const storeDetail = storeId => instanceAuth.get(`restaurants/${storeId}/`);

export { storeDetail };
