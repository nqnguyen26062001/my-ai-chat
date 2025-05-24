interface SessionData {
  user?: { id: string; username: string };
}

 export interface loginDTo {
  userNameOrEmail: string;
  password: string;
  expires30day: boolean;
}