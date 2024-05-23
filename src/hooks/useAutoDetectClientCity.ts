import { useWeatherContext } from "@/context";
import { fetchIpFromClient, fetchCityFromIp } from "@/utils/api";
import { useEffect, useState } from "react";

interface UseAutoDetectClientCityReturn {
  city?: string;
  isLoading: boolean;
}

const useAutoDetectClientCity = (): UseAutoDetectClientCityReturn => {
  const {
    state: { clientCity },
    dispatchers: { setClientCity },
  } = useWeatherContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        if (clientCity) return;

        setIsLoading(true);
        const clientIp = await fetchIpFromClient();
        if (!clientIp) return;

        const city = await fetchCityFromIp(clientIp);
        if (!city) return;

        setClientCity(city);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return { city: clientCity, isLoading };
};

export { useAutoDetectClientCity };
