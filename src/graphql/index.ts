import { ILocation, DetailType } from "../global/types";

// --- get all --- //
export const allLocations = (page: number, perPage: number) => `
allLocations(page:${page}, perPage:${perPage}){
  id
  name
  address
  type
  phone
  createdAt
  status
}
`;

// --- get one --- //
export const getCurrent = (id: string) => `
Location(id:${id}){
  id
  name
  address
  npi
  taxid
  alias
}
`;

// --- filter --- //
export const filterHome = (index: string) => `
allLocations(filter:{q:"${index}"}) {
  id
  name
  type
  address
  phone
  createdAt
  status
}
`;
export const filterOffice = (index: string) => `
allLocations(filter:{q:"${index}"}) {
  id
  name
  type
  address
  phone
  createdAt
  status
}
`;
export const filterActive = (index: string) => `
allLocations(filter:{q:"${index}"}) {
  id
  name
  type
  address
  phone
  createdAt
  status
}
`;
export const filterOff = (index: string) => `
allLocations(filter:{q:"${index}"}) {
  id
  name
  type
  address
  phone
  createdAt
  status
}
`;

// --- create --- //
export const createLocation = (data: ILocation) => `
  createLocation(
    name:"${data.name}",
    type:"${data.type}",
    phone:"${data.phone}",
    address:"${data.address}",
    createdAt:"${data.createdAt}",
    status:"${data.status}",
    npi:"${data.npi}",
    taxid:"${data.taxid}",
    alias:"${data.alias}",
    ){
    id
    name
    address
    type
    phone
    createdAt
    status
    npi
    taxid
    alias
  }
`;

// --- Delete --- //
export const deleteLocation = (id: string) => `
removeLocation(id:${id}){
  id
}
`;

// --- Update --- //
export const updateLocation = (id: string, datailForm: DetailType) => `
updateLocation(id:${id},name:"${datailForm.name}",address:"${datailForm.address}",taxid:"${datailForm.taxid}",npi:"${datailForm.npi}"){
  id
  name
  address
}

`;
