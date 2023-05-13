import { Genre } from "./genre.model";

export class Vetement {
    idvetement! : number;
    nomvetement! : string;
    prixvetement! : number;
    dateprod! : Date ;
    genre!:Genre;
    }