import LZString from "lz-string";
import state from "./state";
import { IAgency, ICommittee, ICouncil, IMember } from "./types";

const councilAPI = "https://9hd7czxsbb.execute-api.us-east-1.amazonaws.com/dev";
// const councilAPI = "http://localhost:3000/dev";
const LEGACY_SERIALIZATION_LENGTH = 40;

// Create a Council with Committees
export async function saveCouncil(
        council: ICouncil
    ) 
{
    // store a string
    const committeesString = serializeCommittees(council.committees);

    // Create or Update
    let url:string = `${councilAPI}/councils`;
    let method = 'POST';
    if(!!council.id) {
        url += `/${council.id}`;
        method = 'PUT';
    }
    const respJson = await fetch(url, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            ...council,
            committees: committeesString // override to a string
        } )
    });
    // TODO: add error handling if response is error
    const councilData = await respJson.json();

    // If save was successful, we have an ID
    if(!!councilData.id) {
        state.council = councilData;
    }
    
    console.log("saveCouncil", { councilData });

    return councilData;
}

// Get a Council with Committees
export async function getCouncil(
        id: string, 
        members:Array<IMember>, 
        agencies:Array<IAgency>, 
        committees:Array<ICommittee>
    ): Promise<ICouncil> 
{
    let council:ICouncil;

    // TODO: remove Old serialization
    if(id.length > LEGACY_SERIALIZATION_LENGTH) {
        const committeesState = LZString.decompressFromEncodedURIComponent( id );
    
        council = {
            id: null,
            name: "Custom Council",
            committees: deserializeCommittees(committeesState, members, agencies, committees)
        }
    } else {
        const respJson = await fetch(`${councilAPI}/councils/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const councilData = await respJson.json();

        // Committees is stored as a string, then merge in rest of response
        council = {
            ...councilData,
            committees: deserializeCommittees( String(councilData.committees), members, agencies, committees )
        }
    }
    
    console.log("getCouncil", { council });

    return council;
}


const SERIALIZATION_SEPARATOR = ',';

// Creates a minimum-viable Committee string (id, name) that can be used to recreate full object
export function serializeCommittees(
        committees:Array<ICommittee>
    ): string 
{
  const object = committees.reduce((array, committee) => {
    const members = {
      chair: committee.members.chair.map(c => c.name).join(SERIALIZATION_SEPARATOR),
      members: committee.members.members.map(c => c.name).join(SERIALIZATION_SEPARATOR)
    }

    const agencies = committee.agencies.map(a => a.code).join(SERIALIZATION_SEPARATOR)

    array.push(
      {
        ...committee,
        members: members,
        agencies: agencies
      }
    )

    return array;
  }, [])

  return JSON.stringify(object);
}

export function deserializeCommittees(
        serialization:string, 
        members:Array<IMember>, 
        agencies:Array<IAgency>, 
        _committees:Array<ICommittee>
    ): Array<ICommittee> 
{
  const object = JSON.parse(serialization);

  const loadedCommittees = object.reduce((array, c) => {
    const chairsArray = c.members.chair.split(SERIALIZATION_SEPARATOR);
    const membersArray = c.members.members.split(SERIALIZATION_SEPARATOR);
    const agenciesArray = c.agencies.split(SERIALIZATION_SEPARATOR);

    const loadedMembers = {
      chair: members.filter(m => chairsArray.includes(m.name) ),
      members: members.filter(m => membersArray.includes(m.name) )
    }
    const loadedAgencies =  agencies.filter(a => agenciesArray.includes(a.code) )

    // TODO: consider removing - we can just store full info now.
    // const loadedCommittee = committees.find(a => a.id === c.id)

    const committee = {
      ...c,
      members: loadedMembers,
      agencies: loadedAgencies,
      //  if there was a Committee from the CSV add additional metadata
    //   description: loadedCommittee?.description,
    //   link: loadedCommittee?.link,
    };

    

    array.push(committee);
    return array;
  }, []);
  

  return loadedCommittees;
}