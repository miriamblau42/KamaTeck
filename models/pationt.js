import { Location } from "./location.js";
export class Patient {

    constructor(id) {
        this.id = id;
        this.locationArr = [];
    }

    addLocation(fromDate, toDate, CityName, location) {
        this.locationArr.push(new Location(fromDate, toDate, CityName, location));
    }

    deleteLocation(locationId) {
        let locIndex = this.locationArr.findIndex(loc => loc.id === locationId);
        if (locIndex > -1) {
            this.locationArr.splice(locIndex, 1);
        }

    }
}