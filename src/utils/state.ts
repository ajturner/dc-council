import { createStore } from "@stencil/store";
import { CouncilTemplate, ICommittee } from "./types";

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

export function getVersion():Array<ICommittee> {
  var url = window?.location?.search;
  
  let searchParams = new URLSearchParams(url);

  // console.debug("getFilterBookmark", {url, value: searchParams.get(filterName), searchParams})
  
  if(searchParams.has(templateStateParameter) 
      && searchParams.get(templateStateParameter) === CouncilTemplate.saved
      && searchParams.has(committeesStateParameter)) {
    const committeesState = searchParams.get(committeesStateParameter);

    // change to use Buffer
    const committeesString = atob(committeesState);
    
    state.committees = JSON.parse(committeesString);
  }
  return state.committees;

  // window.location.search = searchParams;
}

export function setVersion(committees: Array<ICommittee>):string {
  //@ts-ignore
  const url = new URL(window.location);

  const string = JSON.stringify(committees);
  const binary = btoa(string);
    
  url.searchParams.set(committeesStateParameter, binary);
  url.searchParams.set(templateStateParameter, 'saved');
  window.history.pushState({}, '', url);  

  return url.href;
}