export class Location{

    static counter = 10;

    constructor(fromDate, toDate, CityName, location)
    {
        this.id = Location.counter++;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.city = CityName;
        this.location = location;
    }
    

}