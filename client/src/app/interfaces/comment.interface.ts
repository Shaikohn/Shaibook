export interface Comment {
  _id:      string;
  text:     string;
  username:     string;
  userPicture:     string;
  postId:   string;
  userId:   string;
  likes:    number;
  dislikes: number;
}

export interface ID {
  $oid: string;
}
