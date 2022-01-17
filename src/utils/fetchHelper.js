const axios = require('axios').default;


module.exports = async function makeRequest(url, params) {
    try {
      const response = await axios.get(url);
      return response.data
    } catch (error) {
      console.error(error);
    }
  }