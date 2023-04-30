import axios from 'axios';

const KEY = '34267718-575dae68b3f1b9c8f0d64e611';
const BASE_URL = 'https://pixabay.com/api/';

const fetchImages = async (page, val) => {
  const URL = `${BASE_URL}?key=${KEY}`;
  const options = {
    params: {
      q: val,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page,
    },
  };
  const response = await axios.get(URL, options);

  return response.data;
};

export default fetchImages;
