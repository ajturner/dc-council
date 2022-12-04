import { createStore } from "@stencil/store";
import LZString from "lz-string";
import { getCouncil, saveCouncil, serializeCommittees } from "./council";
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
export function getTemplate(
    defaultTemplate: string
  ):CouncilTemplate 
{
  const templateParam:string = getTemplateParam();

  if(!!templateParam) {
    return CouncilTemplate[templateParam];
  } else {
    return CouncilTemplate[defaultTemplate];
  }
  
}

export async function getVersion(
    members:Array<IMember>, 
    agencies:Array<IAgency>, 
    committees:Array<ICommittee>
  ): Promise<Array<ICommittee>> 
{
  var url = window?.location?.search;
  
  let searchParams = new URLSearchParams(url);

  // console.debug("getFilterBookmark", {url, value: searchParams.get(filterName), searchParams})
  
  if(searchParams.has(templateStateParameter) 
      && searchParams.get(templateStateParameter) === CouncilTemplate.saved
      && searchParams.has(committeesStateParameter)) 
  {
    const committeesString = searchParams.get(committeesStateParameter);

    // TODO: finish this function
    const council = await getCouncil(committeesString, members, agencies, committees);
    state.committees = council.committees;
  }
  return state.committees;

  // window.location.search = searchParams;
}

export async function setVersion(
    committees: Array<ICommittee>, 
    store:string = "db"
  ): Promise<string> 
{
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
