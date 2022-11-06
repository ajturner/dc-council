import { createStore } from "@stencil/store";
import { ICommittee } from "./types";

const { state, onChange } = createStore({
  committees: []
});

onChange('committees', value => {
  state.committees = value;
});

export default state;

const committeesStateParameter = "council";

export function getBookmark():Array<ICommittee> {
  var url = window?.location?.search;
  
  let searchParams = new URLSearchParams(url);

  // console.debug("getFilterBookmark", {url, value: searchParams.get(filterName), searchParams})
  
  if(searchParams.has(committeesStateParameter)) {
    const committeesState = searchParams.get(committeesStateParameter)
    const committeesString = atob(committeesState)
    state.committees = JSON.parse(committeesString);
  }
  return state.committees;

  // window.location.search = searchParams;
}

export function setBookmark(committees: Array<ICommittee>) {
  //@ts-ignore
  const url = new URL(window.location);

  const string = JSON.stringify(committees);
  const binary = btoa(string);
    
  url.searchParams.set(committeesStateParameter, binary);
  window.history.pushState({}, '', url);  
}