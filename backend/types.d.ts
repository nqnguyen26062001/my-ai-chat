interface SessionData {
  user?: { id: string; username: string };
}

interface loginDTo {
  userNameOrEmail: string;
  password: string;
  expires30day: boolean;
}