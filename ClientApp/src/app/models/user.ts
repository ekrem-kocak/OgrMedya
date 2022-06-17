import { Image } from "./image";

export class User {
  id?: number;
  userName?: string;
  name?: string;
  age?: number;
  universityName:string;
  department:string;
  class:string;
  gender?: string;
  created?: Date;
  lastActive?: Date;
  introduction?: string;
  profileImageUrl?: string;
  emailConfirmed:boolean;
}
