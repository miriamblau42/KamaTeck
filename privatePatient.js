import allPatients from "./patients.js"
import { Patient } from "./models/pationt.js";
import { Location } from "./models/location.js";
const inputPatientId = document.getElementById('patientId');
const addLocation = document.getElementById('addLocation');
let currentPatient;

//return the actual patient
const getPatientfromId = (patientId) => {

 fetch(`https://localhost:44326/api/Location/GetPatient/${patientId}`,
 {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
    .then(response =>
        response.json())
   .then(data => {
       console.log(data);
       currentPatient = data;
   })
   .catch(error => console.error('Unable to get Locations.', error));

}

const displayLocations = (locations) => {

    const tBody = document.querySelector('.locations');
    document.getElementById('trLocations').style.display="table-row";

    tBody.innerHTML = '';
    locations.forEach(location => {

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.addEventListener("click", ()=>{
            ereaseLocation(location.id);
        })

        let tr = tBody.insertRow();
        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(location.fromDate.toLocaleString());
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNode1 = document.createTextNode(location.toDate.toLocaleString());
        td2.appendChild(textNode1);

        let td3 = tr.insertCell(2);
        let textNode2 = document.createTextNode(location.city);
        td3.appendChild(textNode2);

        let td4 = tr.insertCell(3);
        let textNode3 = document.createTextNode(location.place);
        td4.appendChild(textNode3);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

}
const postLocation = (fromDate, toDate, CityName, location) => {

    let locationy = new Location(fromDate, toDate, CityName, location);
    
    fetch('https://localhost:44326/api/Location/'+currentPatient.id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(locationy)
    })
        .then(console.log("succsess to post location"))
        .catch(error => console.error('Unable to post location.', error));
}
const ereaseLocation = (locationId) => {
    currentPatient.deleteLocation(locationId);
    displayLocations(currentPatient.locationArr);
}

const getLocationsById = (patientId) => {
    
    let locations = [];
    fetch(`https://localhost:44326/api/Location/GetLocations/${patientId}`, {
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

            displayLocations(locations)
        })
        .catch(error => console.error('Unable to get Locations.', error));
    // currentPatient = getPatientfromId(patientId);
    // if(currentPatient.locationArr.length>=1)
    // {
    //      displayLocations(currentPatient.locationArr);
    // }
    document.getElementById('addForm').style.display ="block";
}

inputPatientId.onkeyup = ()=>{  
    if(inputPatientId.value.length == 9)
    {
        let patientId = inputPatientId.value;
        getPatientfromId(patientId)
        getLocationsById(patientId);
    }
    
} 
addLocation.onclick = () =>{
    let from = document.getElementById('fromDate');
    let to = document.getElementById('toDate');
    let city = document.getElementById('city-name');
    let loc= document.getElementById('location-name');
    postLocation(from.value, to.value,city.value,loc.value);
    // from.value = to.value = city.value = loc.value =' ';

};