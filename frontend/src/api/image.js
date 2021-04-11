import { instance } from '@/api';
const uploadImg = data =>
  instance.post('image/upload/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export { uploadImg };
