import { Location } from "../Interfaces/Location";
import { loader } from "../api/AuthAPI";

export class DefaultMap {
  private static instance: DefaultMap | null = null;
  private map: google.maps.Map | null = null;

  constructor() {
    this.createMap({ lat: 34.6937249, lng: 135.5022535 });
  }

  public static getInstance(): DefaultMap {
    if (!DefaultMap.instance) {
      DefaultMap.instance = new DefaultMap();
    }
    return DefaultMap.instance;
  }

  private async loadMapLibrary(): Promise<google.maps.MapsLibrary> {
    return loader.importLibrary("maps") as Promise<google.maps.MapsLibrary>;
  }

  private async loadMarkerLibrary(): Promise<google.maps.MarkerLibrary> {
    return loader.importLibrary("marker") as Promise<google.maps.MarkerLibrary>;
  }

  private async createMap(location: Location) {
    const { Map } = await this.loadMapLibrary();

    this.map = new Map(document.getElementById("map") as HTMLElement, {
      center: location,
      zoom: 10,
    });

    const locationButton = document.createElement(
      "button"
    ) as HTMLButtonElement;

    locationButton.textContent = "Your location";
    locationButton.classList.add("location-button");

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      locationButton
    );

    locationButton.addEventListener("click", this.handleLocation);
  }

  public updateMap(location: Location) {
    if (location) {
      this.createMap(location);
      this.addMarker(location);
    }
  }

  private async addMarker(location: Location) {
    const { Marker } = await this.loadMarkerLibrary();

    if (this.map) {
      const marker = new Marker({
        position: location,
        map: this.map,
      });
      marker.setMap(this.map);
    }
  }

  private handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accurancy: position.coords.accuracy,
          };
          if(this.map && this.addMarker) {
             this.map?.setCenter(pos);
             this.map?.setZoom(18);
             this.addMarker(pos);
  
          }
        },
        () => {
          alert(
            "Error trying get your position, check your browser or reload this page"
          );
        },
        { enableHighAccuracy: true }
      );
    }
  };
}