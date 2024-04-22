import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://10.0.0.214:1337/api'
});

const getCategory = () => axiosClient.get('/categories?populate=*');

const getSliders = () => axiosClient.get('/sliders?populate=*').then(resp => {
  return resp.data.data;
});

const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp => {
  return resp.data.data;
});

const getAllProducts = () => axiosClient.get('/products?populate=*').then(resp => {
  return resp.data.data;
});

const getProductsByCategory = (category) => axiosClient.get(`/products?filters[categories] [name] [$in]=${category}&populate=*`)
.then(resp => {
  return resp.data.data;
})

const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', 
{username, email, password});

const SignIn = (email, password) => axiosClient.post('/auth/local',
{identifier: email, password});

const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, {
  headers: {
    Authorization: `Bearer ${jwt}`
  }
});

const getCartItems = (userId, jwt) => axiosClient.get(`/user-carts?filters[userId] [$eq]=${userId}&populate=*`, {
  headers: {
    Authorization: `Bearer ${jwt}`
  }
}).then(resp => {
  return resp.data.data
})


export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  SignIn,
  addToCart,
  getCartItems
}