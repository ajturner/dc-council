import * as Papa from 'papaparse';
import { IMember } from './types';

async function loadFile(filename:string, parser) {

  if(filename === null) {
    return [];
  }
  const parseConfig = {
    header: true
  }

  const file = await fetch(filename);
  const text = await file.text();
  try {
    const parseFile = Papa.parse(text, parseConfig);
    const parseData = parseFile.data;

    const data = parser(parseData);
    return data;  
  } catch (error) {
    console.error("Error parsing file: ", {filename, error})
    console.error("test", text)
  }

}

// Placeholder transformer - may need future transformers
function simpleParse(data) {
  return data;
}
export async function loadAgencies(filename:string) {
  const agencies = loadFile(filename, simpleParse)
  return agencies;
}
export async function loadCommittees(filename:string) {
  const committees = loadFile(filename, simpleParse)
  return committees; 
}
export async function loadMembers(filename:string):Promise<Array<IMember>> {
  const members:Array<IMember> = await loadFile(filename, simpleParse)
  return members;   
}