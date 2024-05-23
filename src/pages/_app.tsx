import { AppProps } from "next/app";
import { WeatherProvider, initialValues } from "@/context";
import { useLocalStorage } from "@/hooks";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/theme";
import { Container } from "@mui/material";
import { Box } from "@/components/base";
import { Navbar, NavbarProps } from "@/components/compositions";
import { ROUTES } from "@/constants";
import "@fontsource/metropolis/400.css";
import "@fontsource/metropolis/500.css";
import "@fontsource/metropolis/600.css";

const NAVBAR_ITEMS: NavbarProps["pages"] = [
  {
    href: ROUTES.HOME,
    label: "Home",
  },
  {
    href: ROUTES.FAVORITE_CITIES,
    label: "Favorite cities",
  },
];

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
        <Navbar pages={NAVBAR_ITEMS} />
        <Container maxWidth="sm">
          <Box marginTop={3}>
            <Component {...pageProps} />
          </Box>
        </Container>
      </ThemeProvider>
    </WeatherProvider>
  );
}

export default MyApp;
