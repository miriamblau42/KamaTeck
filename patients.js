import {Patient} from "./models/pationt.js"
let pationts = []
const init = () => {
    pationts.push(new Patient("123456789"));
    pationts.push(new Patient("213087224"));
    pationts.push(new Patient("038342051"));

    pationts[0].addLocation(new Date('2022-3-14'), new Date('2022-3-15'), "yerushalaim", "library");
    pationts[0].addLocation(new Date('2022-4-27'), new Date('2022-4-29'), "modiin", "mall");
    pationts[2].addLocation(new Date('2010-8-12'), new Date('2010-8-12'), "netivot", "restraunt");
    pationts[1].addLocation(new Date('2021-7-18'), new Date('2021-7-19'), "yerushalaim", "kosell");
    return pationts;
}
pationts = init()
export default pationts;