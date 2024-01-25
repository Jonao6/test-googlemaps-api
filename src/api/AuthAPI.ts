import { Loader } from "@googlemaps/js-api-loader";
const apiKey: string = process.env.API_KEY as string;
export const loader = new Loader({
    apiKey: apiKey,
    version: "weekly",
  });