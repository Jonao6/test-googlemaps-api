import { getCoordinates } from "../api/getCoordinates";
import { Location } from "../Interfaces/Location";
import { DefaultMap } from "./defaultMap";

export class FormCoordinate {
  map: DefaultMap;

  constructor(map: DefaultMap) {
    this.map = map;

    const form = document.querySelector("form") as HTMLFormElement;
    form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();

    const addressValue = document.getElementById(
      "address"
    )! as HTMLInputElement;
    const address: string = addressValue.value;
    getCoordinates({ address }).then((location: Location | null) => {
        if(location) {
            this.map.updateMap(location);
        }
      })
      .catch((error) => {
        console.error("Error fetching coordinates:", error);
      });
  }
}