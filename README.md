# Weather app project

Weather application engineered in order to show different architecture strategies.

## Project wiki

Please, feel free to visit this project wiki in order to know more about the different decisions were taken in order to create this project.

- [Project objective](/wiki/project-objective.md)
- [Component system](/wiki/component-system.md)
- [Data modelling](/wiki/data-modelling.md)

## Project bootstrap

### Environment variables

Please, run the following command in your terminal in order to create the appropriate .env file.

```bash
echo -e "WEATHER_API_KEY={{your_api_key_here}}" > .env.local
```

Replace the `WEATHER_API_KEY` placeholder with a valid API key obtained in the following way:

1. Navigate to the [RapidAPI](https://rapidapi.com/auth/sign-up) website and sign up for a new account.
2. After finishing the procedure, navigate to the [RapidAPI's WeatherAPI](https://rapidapi.com/weatherapi/api/weatherapi-com/) dashboard.
3. Press the `Test endpoint` button and check the UI is giving you a valid response.
4. Copy your API token from the code snippet on the right side. It should like like this:

```js
const axios = require("axios");

const options = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/current.json",
  params: { q: "53.1,-0.13" },
  headers: {
    // The `X-RapidAPI-Key` is the API token you need to use and include into the .env.local file
    "X-RapidAPI-Key": "abcdefghijklmnopqrstuvwxyz123456789",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
```

### Project start

1. Run `yarn run dev`
2. Open [http://localhost:3000](http://localhost:3000)

### Check typescript errors

1. Run `yarn run ts:check`
