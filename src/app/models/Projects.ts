import { Photo } from "./Photo";

export class Projects{

    id:number;
    title:string;
    description:string;
    location:string;
    finishDate:Date;
    measure:string;
    projectNevi:string;
    Photos:Photo[];
}