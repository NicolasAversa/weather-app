enum ExternalServices {
  API_64 = "api64",
  WEATHER_API = "weatherApi",
}

const thirdPartyBaseUrls: Record<ExternalServices, string> = {
  [ExternalServices.API_64]: "https://api64.ipify.org",
  [ExternalServices.WEATHER_API]: "https://weatherapi-com.p.rapidapi.com",
};

export { thirdPartyBaseUrls };
