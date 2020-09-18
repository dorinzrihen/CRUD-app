import axios from 'axios';

export default axios.create({
  baseURL: `https://thingproxy.freeboard.io/fetch/https://5f634739363f0000162d8744.mockapi.io/data`,
});
