export interface User {
  _id:      ID;
  name:     string;
  username: string;
  email:    string;
  password: string;
  posts:    any[];
  role:     string;
  status:   string;
  picture:  string;
  comments: any[];
}

export interface ID {
  $oid: string;
}
