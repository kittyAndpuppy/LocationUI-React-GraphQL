export interface ILocation {
  id: string;
  name: string;
  type: string;
  phone: string;
  address: string;
  createdAt: string;
  status: string;
  npi: string;
  taxid: string;
  alias:string

}

export interface ILocations {
  getLocations: ILocation[];
  
}

export type ILocationMutation = {
  addLocation: ILocation;
};

export type PageForm = {
  page: number;
  perPage: number;
};

export type DetailType = {
  name: string;
  address: string;
  taxid: string;
  npi: string;
};
