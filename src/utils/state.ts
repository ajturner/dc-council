import { createStore } from "@stencil/store";
import LZString from "lz-string";
import { getCouncil, saveCouncil, serializeCommittees } from "./council";
import { CouncilTemplate, IAgency, ICommittee, IMember } from "./types";

const { state, onChange } = createStore({
  council: null,
  committees: [], // current committees
  action: "", // which entites are being dragged: agency, member
  agencies: [], // agencies available to be places
  draggable: null,
  saved: false, // current save state
  editable: false // is this just a view or can it be edited?
});

onChange('saved', value => {
  state.saved = value;
});

onChange('council', value => {
  state.council = value;
  state.saved = false;
});

onChange('committees', value => {
  state.committees = value;
  state.saved = false;
});

onChange('action', value => {
  state.action = value;
});

onChange('agencies', value => {
  state.agencies = value;
  state.saved = false
});

onChange('draggable', value => {
  state.draggable = value;
});

export function resetState() {
  history.pushState("", document.title, window.location.pathname);
}

export default state;

const committeesStateParameter = "council";
const templateStateParameter = "template";
const editStateParameter = "secret";

export function getTemplateParam():string {
  var url = window?.location?.search;
  
  let searchParams = new URLSearchParams(url);

  // console.debug("getFilterBookmark", {url, value: searchParams.get(filterName), searchParams})

  if(searchParams.has(templateStateParameter)) {
    return searchParams.get(templateStateParameter);
  } else if(searchParams.has(committeesStateParameter)) {
    return CouncilTemplate.saved;
  } else {
    return CouncilTemplate.current;
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
  
  if(searchParams.has(committeesStateParameter)) 
  {
    const committeesString = searchParams.get(committeesStateParameter);

    // TODO: finish this function
    const council = await getCouncil(committeesString, members, agencies, committees);
    state.council = council;
    state.committees = council.committees;
  }
  return state.committees;

  // window.location.search = searchParams;
}

export async function setVersion(
    committees: Array<ICommittee>, 
    store:string = "db"
  ): Promise<{}> 
{
  //@ts-ignore
  const url = new URL(window.location);

  let councilSave = null;

  if(store === "url") {
    // TODO: DEPRECATED - remove this when verify save to DB is working
    // Store to URL
    const committeeString = serializeCommittees(committees);
    // const binary = btoa(string);
    const binary = LZString.compressToEncodedURIComponent( committeeString );
    url.searchParams.set(committeesStateParameter, binary);
  } else {
    // Get Secret that write protects this council
    const secret = url.searchParams.get(editStateParameter);

    // TODO: Refactor to use Council interface throughout
    let council = {
      ...state.council,
      secret: !!secret ? secret : undefined,
      committees: committees
    }
    
    councilSave = await saveCouncil( council );
    const savedId = councilSave.id;
    state.saved = true;
    url.searchParams.set(committeesStateParameter, savedId);
  }
  
  let editUrl = null;

  // Update the Url with the unique secret
  if(councilSave && councilSave.secret) {
    url.searchParams.set(editStateParameter, councilSave.secret);
    editUrl = url.href;
    window.history.pushState({}, '', editUrl);    
  }
  
  // We want a clean share URL
  url.searchParams.delete(editStateParameter);
  const shareUrl = url;

  return {share: shareUrl, edit: editUrl};
}

// Checks of the current council is editable
// Either has parameter for editing, or is a new council
export async function checkEditable():Promise<boolean> {
  var url = window?.location?.search;
  
  let searchParams = new URLSearchParams(url);

  if(searchParams.has(editStateParameter)
    || !state.council
    || !state.council?.id
  ) {
    state.editable = true;
  }
  return state.editable;
}