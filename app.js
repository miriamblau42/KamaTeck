import pationts from "./patients.js";
const sortByCity = document.getElementById('inputSortCity');

const displayLocationsbyCity = (locations) => {
    document.getElementById('tblLocations').style.display = "table-row"
    const tBody = document.querySelector('.locations');
    tBody.innerHTML = '';
    locations.forEach(locationy => {

        let tr = tBody.insertRow();
        let td1 = tr.insertCell(0);
        let from = locationy.fromDate.toLocaleString();
        let textNode = document.createTextNode(from);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let to = locationy.toDate.toLocaleString();
        let textNode1 = document.createTextNode(to);
        td2.appendChild(textNode1);

        let td3 = tr.insertCell(2);
        let textNode2 = document.createTextNode(locationy.city);
        td3.appendChild(textNode2);

        let td4 = tr.insertCell(3);
        let textNode3 = document.createTextNode(locationy.place);
        td4.appendChild(textNode3);
    });


}

const getLocations = () =>
{
    let locations = [];
    fetch("https://localhost:44326/api/Location", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response =>
             response.json())
        .then(data => {
            console.log(data);
            locations = data;

            locations.sort((a, b) => b.toDate - a.toDate);

            displayLocationsbyCity(locations)
        })
        .catch(error => console.error('Unable to get Locations.', error));

}
const sortCities = (cityName) => {

    let sortedLocations = [];

    sortedLocations.length = 0;
    fetch(`https://localhost:44326/api/Location/${cityName}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response =>
             response.json())
        .then(data => {
            console.log(data);
            sortedLocations = data;

            sortedLocations.sort((a, b) => b.toDate - a.toDate);

            displayLocationsbyCity(sortedLocations)
        })
        .catch(error => console.error('Unable to get Locations.', error));

}




// sortByCity.addEventListener('input',sortCities(sortByCity.value));


sortByCity.onkeyup = () => {
    sortCities(sortByCity.value);
} 
getLocations();