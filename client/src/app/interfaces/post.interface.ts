export interface Post {
  _id:      string;
  text:     string;
  username:     string;
  likes:    number;
  dislikes: number;
  comments: any[];
  photos:   string[];
  userId:   string;
}

export interface ID {
  $oid: string;
}
