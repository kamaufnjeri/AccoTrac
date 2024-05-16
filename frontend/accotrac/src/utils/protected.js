import axios from "axios";
import baseUrl from "./settings";
const fetchProtectedData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/protected`);
    if (response.status !== 200) {
      axios.get(baseUrl);
    }
    // Handle the response as needed
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("Error fetching protected data:", error.response.data);
    } else {
      console.error("Error fetching protected data:", error.message);
    }
    axios.get(baseUrl);
  }
};
export default fetchProtectedData;
