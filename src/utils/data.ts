import * as Papa from 'papaparse';
import { IAgency, ICommittee, IMember } from './types';

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
// When Loading Committees, we have member names and agency codes. We need to join to objects
export async function loadCommittees(filename:string, members:Array<IMember>, agencies: Array<IAgency>):Promise<Array<ICommittee>> {
  let committeesData = await loadFile(filename, simpleParse)

  // Build a complete committee
  const committees = committeesData.map((row) => {
    const committee:ICommittee = {
      id: row.id,
      name: row.name,
      description: row.description,
      link: row.link,
      members: {}
    }

    const loadedMembers = row.members.split(",")
    committee.members.chair = members.filter(m => m.name === row.chair)
    committee.members.members = members.filter(m => {
      return loadedMembers.includes(m.name);
    });

    committee.agencies = agencies.filter((agency) => {
      return agency.committee === committee.name;
    });

    // Old Code when table had agencies in committees
    // const loadedAgencies = row.agencies.split(",")
    // committee.agencies = agencies.filter(a => {
    //   return loadedAgencies.includes(a.name)
    // })
    
    return committee;
  })

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

export function createCommittee(values = {}): ICommittee {
  const defaultCommittee:ICommittee = {
    id: String(Math.floor(Math.random() * 1000)),
    name: toTitleCase(generateName() + " Committee"),
    members: {}
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