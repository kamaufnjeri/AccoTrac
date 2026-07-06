const accotracStatus = process.env.APPLICATION_STATUS;
const accotracApiProductionDomain = process.env.API_DOMAIN;
const accotracApiTestingDomain = process.env.TESTING_API_DOMAIN;
let baseUrl = "";
if (accotracStatus === "production") {
  baseUrl = "api";
} else if (accotracStatus === "production-cpanel") {
  baseUrl = accotracApiProductionDomain;
} else if (accotracStatus === "testing-cpanel") {
  baseUrl = accotracApiTestingDomain;
} else if (accotracStatus === "development") {
  baseUrl = "";
} else {
  baseUrl = "api";
}
export default baseUrl;
