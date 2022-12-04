import { createStore } from "@stencil/store";
import LZString from "lz-string";
import { saveCouncil } from "./council";
import { CouncilTemplate, IAgency, ICommittee, IMember } from "./types";

const { state, onChange } = createStore({
  committees: [], // current committees
  action: "", // which entites are being dragged: agency, member
  agencies: [], // agencies available to be places
  draggable: null 
});

onChange('committees', value => {
  state.committees = value;
});

onChange('action', value => {
  state.action = value;
});

onChange('agencies', value => {
  state.agencies = value;
});

onChange('draggable', value => {
  state.draggable = value;
});

export default state;

const committeesStateParameter = "council";
const templateStateParameter = "template";

export function getTemplateParam():string {
  var url = window?.location?.search;
  
  let searchParams = new URLSearchParams(url);

  // console.debug("getFilterBookmark", {url, value: searchParams.get(filterName), searchParams})

  if(searchParams.has(templateStateParameter)) {
    return searchParams.get(templateStateParameter);
  } else {
    return null;
  }
  
}
export function getTemplate(defaultTemplate: string):CouncilTemplate {
  const templateParam:string = getTemplateParam();

  if(!!templateParam) {
    return CouncilTemplate[templateParam];
  } else {
    return CouncilTemplate[defaultTemplate];
  }
  
}

export function getVersion(members:Array<IMember>, agencies:Array<IAgency>, committees:Array<ICommittee>):Array<ICommittee> {
  var url = window?.location?.search;
  
  let searchParams = new URLSearchParams(url);

  // console.debug("getFilterBookmark", {url, value: searchParams.get(filterName), searchParams})
  
  if(searchParams.has(templateStateParameter) 
      && searchParams.get(templateStateParameter) === CouncilTemplate.saved
      && searchParams.has(committeesStateParameter)) {
    const committeesString = searchParams.get(committeesStateParameter);

    // change to use Buffer
    // const committeesString = atob(committeesState);
    const committeesState = LZString.decompressFromEncodedURIComponent(committeesString);

    state.committees = deserializeCommittees(committeesState, members, agencies, committees);
  }
  return state.committees;

  // window.location.search = searchParams;
}

export async function setVersion(committees: Array<ICommittee>, store:string = "db"): Promise<string> {
  //@ts-ignore
  const url = new URL(window.location);

  
  if(store === "url") {
    // Store to URL
    const committeeString = serializeCommittees(committees);
    // const binary = btoa(string);
    const binary = LZString.compressToEncodedURIComponent( committeeString );
    url.searchParams.set(committeesStateParameter, binary);
  } else {
    const council = {
      title: "test",
      committees: committees
    }
    const councilSave = await saveCouncil( council );
    const savedId = councilSave.id;
    url.searchParams.set(committeesStateParameter, savedId);
  }
  
  url.searchParams.set(templateStateParameter, 'saved');
  window.history.pushState({}, '', url);  

  return url.href;
} 

const SERIALIZATION_SEPARATOR = ',';

// Creates a minimum-viable Committee string (id, name) that can be used to recreate full object
export function serializeCommittees(committees:Array<ICommittee>): string {
  const object = committees.reduce((array, committee) => {
    const members = {
      chair: committee.members.chair.map(c => c.name).join(SERIALIZATION_SEPARATOR),
      members: committee.members.members.map(c => c.name).join(SERIALIZATION_SEPARATOR)
    }

    const agencies = committee.agencies.map(a => a.code).join(SERIALIZATION_SEPARATOR)

    array.push(
      {
        id: committee.id,
        name: committee.name,
        members: members,
        agencies: agencies
      }
    )

    return array;
  }, [])

  return JSON.stringify(object);
}

export function deserializeCommittees(serialization:string, members:Array<IMember>, agencies:Array<IAgency>, committees:Array<ICommittee>): Array<ICommittee> {
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
    const loadedCommittee = committees.find(a => a.id === c.id)

    const committee = {
      id: c.id,
      name: c.name,
      members: loadedMembers,
      agencies: loadedAgencies,
      //  if there was a Committee from the CSV add additional metadata
      description: loadedCommittee?.description,
      link: loadedCommittee?.link,
      editable: !!loadedCommittee ? loadedCommittee?.editable : true,
    };

    

    array.push(committee);
    return array;
  }, []);
  

  return loadedCommittees;
}