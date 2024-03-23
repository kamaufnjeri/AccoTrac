import axios from "axios";

axios.defaults.withCredentials = true;

const URL = "http://localhost:5000";

class RequestHandler {
    static handleGetRequest(newUrl) {
    const getUrl = `${URL}${newUrl}` 
      return axios.get(getUrl)
        .then(response => {
          if (response.data) {
            if (response.status === 200) {
              return response.data;
            }
             return response.data;
            }
            throw new Error("Response does not have data")
        })
        .catch(error => {
          if (error.response && error.response.data) {
            console.error('Error fetching data:', error.response.data);
            return  error.response.data;
          } else {
            console.error('Error fetching data:', error.message);
            throw new Error(error.message);
          }
        });
    }

    static handlePostRequest(newUrl, data) {
        const postUrl = `${URL}${newUrl}`;
        return axios.post(postUrl, data)
          .then(response => {
            console.log(response)
            if (response.data && (response.status === 201 || response.status == 200)) {
              return response.data;
            } else {
                if (response.data) {
                    return response.data;
                }
              throw new Error('Response data is empty');
            }
          })
          .catch(error => {
            console.log("error", error)
            if (error.response && error.response.data) {
                return error.response.data;
            } else {
              throw new Error(error);
            }
          });
      }
  }
  
  export default RequestHandler;
  