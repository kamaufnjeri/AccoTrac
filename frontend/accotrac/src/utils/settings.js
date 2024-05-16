const accotracStatus = "production";
let baseUrl = "";
if (accotracStatus === "production") {
  baseUrl = "api";
} else if (accotracStatus === "development") {
  baseUrl = "http://localhost:5000";
} else {
  baseUrl = "api";
}
export default baseUrl;
