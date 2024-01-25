import { AxiosResponse } from "axios";
import { GeocoderProps } from "../Interfaces/geoCoding";
import { Location } from "../Interfaces/Location";
import { loader } from "./AuthAPI";
const axios = require("axios");
export function getCoordinates(address: GeocoderProps): Promise<Location> {
  const options = {
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/json",
    params: { address: address.address, key: loader.apiKey}
  }
  return axios
  .request(options)
  .then((response: AxiosResponse) => {
      const results = response.data.results
      if(results && results.length > 0) {
        const location = results[0].geometry.location;
        return {
            lat: location.lat,
            lng: location.lng,
        }
      } else {
        console.error("No results found")
        return null;
      }
  })
  .catch(function (error: any) {
      console.error(error);
  });
}


