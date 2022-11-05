import * as Papa from 'papaparse';
import { IMember } from './types';

// https://github.com/andreasonny83/unique-names-generator
import { uniqueNamesGenerator, animals } from 'unique-names-generator';

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

// TODO: move to utils
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export function createCommittee(values = {}) {
  const defaultCommittee = {
    id: Math.floor(Math.random() * 1000),
    name: toTitleCase(generateName() + " Committee")
  };
  const committee = {
    ...values,
    ...defaultCommittee
  }
  return committee;
}

export function generateName() {
  const randomName: string = uniqueNamesGenerator({
    dictionaries: [ animals ], 
    separator: ' ',
    style: 'capital',
    length: 1
  });
  return randomName;
}