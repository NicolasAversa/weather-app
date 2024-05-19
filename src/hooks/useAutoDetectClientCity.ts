import { fetchIpFromClient, fetchCityFromIp } from "@/utils/api";
import { useEffect, useState } from "react";

const useAutoDetectClientCity = () => {
  const [city, setCity] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    (async function () {
      try {
        const clientIp = await fetchIpFromClient();
        if (!clientIp) return;

        const clientCity = await fetchCityFromIp(clientIp);
        setCity(clientCity);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return { city, isDetectingCity: isLoading };
};

export { useAutoDetectClientCity };
