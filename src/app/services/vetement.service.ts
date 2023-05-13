import { Injectable } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { gerneWrapper } from '../model/genreWrapped.model';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class VetementService {

  apiURL: string = "http://localhost:8060/vetements/api";
  apiURLge: string = "http://localhost:8060/vetements/ge";




 vetements!: Vetement[];
//genre!:Genre[];
  constructor(private http : HttpClient) {
/* this.genre=[{idG:1,description:"en stock",nom:"F",taille:"S"},{idG:2,description:"en stock",nom:"M",taille:"L"
},{idG:3,description:"en stock",nom:"M",taille:"XL"} */



   /* this.vetements=[
      {idvetement : 1, nomvetement : "robe", prixvetement : 3000.600, dateprod: new Date("01/14/2011"),genre:{idG:1,description:"en stock",nom:"F",taille:"S"}},
    {idvetement : 2, nomvetement : "pull", prixvetement : 450, dateprod : new Date("12/17/2010"),genre:{idG:2,description:"en stock",nom:"M",taille:"S"}},
    {idvetement : 3, nomvetement :"jupe", prixvetement : 900.123, dateprod : new Date("02/20/2020"),genre:{idG:3,description:"en stock",nom:"M",taille:"XL"}
  }];*/

   }

 
  listVetement(): Observable<Vetement[]>{
    return this.http.get<Vetement[]>(this.apiURL);
    }
    

/*ajouterVetement(vet:Vetement){
  this.vetements.push(vet);
}*/

ajouterVetement( vet: Vetement):Observable<Vetement>{
  return this.http.post<Vetement>(this.apiURL, vet, httpOptions);
  }


supprimerVetement(id:number){
 /* const index=this.vetements.indexOf(vet,0);
  if(index> -1){
    this.vetements.splice(index,1);
  }*/
  const url = `${this.apiURL}/${id}`;
  return this.http.delete(url, httpOptions);
}

  consulterVetement(id: number): Observable<Vetement> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Vetement>(url);
    }
 
  updateVetement(v:Vetement) : Observable<Vetement>{
  return this.http.put<Vetement>(this.apiURL, v, httpOptions);
}

  trierVetements(){
    this.vetements = this.vetements.sort((n1,n2) => {
    if(n1 .idvetement > n2.idvetement) {
    return 1;
    }
    if (n1.idvetement < n2.idvetement) {
    return -1;
    }
    return 0;
    });
    }
 
    listeGenre():Observable<gerneWrapper>{
      return this.http.get<gerneWrapper>(this.apiURLge);
      }
     
        
      /*consulterGenre(id:number): Genre{
      return this.genre.find(ge => ge.idG == id)!;
      } */
      rechercherParGenre(idG: number):Observable< Vetement[]> {
        const url = `${this.apiURL}/vetGen/${idG}`;
        return this.http.get<Vetement[]>(url);
        }
        rechercherParNom(nom: string):Observable< Vetement[]> {
          const url = `${this.apiURL}/vetByName/${nom}`;
          return this.http.get<Vetement[]>(url);
          } 

          ajouterGenre(ge: Genre):Observable<Genre>{
            return this.http.post<Genre>(this.apiURLge, ge, httpOptions);
            }


}
