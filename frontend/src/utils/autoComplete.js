import data from '@/assets/final.json';
const filteredRestaurant = str => {
  if (str !== '') {
    str = str.split(' ');
    str = str.join('|');
    const reg = new RegExp(`^${str}`, 'i');
    return data.filter(row => row['name'].match(reg));
  }
};
export { filteredRestaurant };
