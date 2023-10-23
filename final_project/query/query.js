const axios = require("axios");

class Http {
  getRequest = async () => {
    try {
      return await axios.get("http://localhost:3000");
    } catch (error) {
      throw new Error(error);
    }
  };
  isbnGetRequest = async (isbn) => {
    try {
      return await axios.get(`http://localhost:3000/isbn/${isbn}`);
    } catch (error) {
      throw new Error(error);
    }
  };
  authorGetRequest = async (author) => {
    try {
      return await axios.get(`http://localhost:3000/author/${author}`);
    } catch (error) {
      throw new Error(error);
    }
  };
  titleGetRequest = async (author) => {
    try {
      return await axios.get(`http://localhost:3000/title/${author}`);
    } catch (error) {
      throw new Error(error);
    }
  };
}
module.exports = Http