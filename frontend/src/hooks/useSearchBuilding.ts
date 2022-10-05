import useSWR from "swr";
import axios from "axios";
import queryString from "query-string";

type Building = {
  id: number;
  name: string;
  postal_code: string;
  city: string;
  block: string;
  building: string;
  latitude: number;
  longitude: number;
  prefecture: {
    id: number;
    code: string;
    name: string;
  };
};

const fetcher = (url: string) =>
  axios.get<Building[]>(url).then((res) => res.data);

type Params = {
  query: string;
  lat: number;
  lng: number;
  distance: number;
};

export const useSearchBuilding = (params: Params) => {
  return useSWR(
    `http://localhost/api/search?${queryString.stringify(params)}`,
    fetcher
  );
};
