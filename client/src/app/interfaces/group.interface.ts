export interface Group {
  _id:      string;
  description:     string;
  admin: string;
  photo: string;
  privacity: string;
  joinRequests: string[];
  members: any[];
  posts:    any[];
}

export interface ID {
  $oid: string;
}
