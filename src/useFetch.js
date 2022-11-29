import { useEffect, useState } from "react";

export function useFetch(baseUrl, initialType) {
  const [data, setData] = useState(null);

  const fetchUrl = (type) => {
    fetch(baseUrl + "/" + type) // fetch는 네트워크상에서 데이터 받아올때 쓰는 api
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    fetchUrl(initialType);
  }, []);

  return {
    data,
    fetchUrl,
  };
}
