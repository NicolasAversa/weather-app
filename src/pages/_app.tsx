import { AppProps } from "next/app";
import {
  WeatherProvider,
  initialValues,
} from "@/context/weatherContext/WeatherProvider";
import { useLocalStorage } from "@/hooks";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/600.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [favoriteCities] = useLocalStorage("favoriteCities", []);

  return (
    <WeatherProvider
      initialValues={{
        ...initialValues,
        favoriteCities,
      }}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </WeatherProvider>
  );
}

export default MyApp;
