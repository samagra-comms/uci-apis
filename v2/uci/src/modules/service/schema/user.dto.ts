// Prepared from https://transform.tools/json-to-typescript

export interface Root {
  id: string;
  externalIds: string[];
  rootOrgId: string;
  firstName: string;
  lastName: string;
  userLocation: UserLocation;
  roles: string;
  userType: UserType;
  customData: any;
}

export interface UserLocation {
  id: string;
  state: string;
  district: string;
  block: string;
  cluster: string;
  school: string;
}

export interface UserType {
  subType: any;
  type: string;
}
