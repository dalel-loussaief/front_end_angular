import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { VetementService } from '../services/vetement.service';
import { Vetement } from '../model/vetement.model';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-vetement',
  templateUrl: './update-vetement.component.html',
  styleUrls: ['./update-vetement.component.css']
})
export class UpdateVetementComponent implements OnInit{
  currentVetement = new Vetement();
  genre! : Genre[];
  updatedgeId! : number;


constructor(private activatedRoute :ActivatedRoute,
  private router :Router,
private vetementService : VetementService){}

  ngOnInit(){
    //this.genre=this.vetementService.listeGenre();
   // this.vetementService.consulterGenre(this.activatedRoute.snapshot.params['id']);
    //this.updatedgeId=this.currentVetement.genre.idG;//pour afficher les attribues de la modifications 
    /*console.log(this.activatedRoute.snapshot.params['id']);
   this.currentVetement = this.vetementService.consulterVetement(this.activatedRoute.snapshot. params['id']);
    console.log(this.currentVetement);*/
    this.vetementService.listeGenre().
    subscribe(ges => {this.genre = ges._embedded.genres;
    console.log(ges);
    });
    

    this.vetementService.consulterVetement(this.activatedRoute.snapshot.params['id']).subscribe( v =>{ this.currentVetement = v;
      this.updatedgeId = this.currentVetement.genre.idG;
       } ) ;
  }
  updateVetement(){
    //this.currentVetement.genre=this.vetementService.consulterGenre(this.updatedgeId);
  // this.vetementService.updateVetement(this.currentVetement);
   //this.router.navigate(['vetements']);
   this.currentVetement.genre = this.genre.find(g => g.idG == this.updatedgeId)!;
   this.vetementService.updateVetement(this.currentVetement).subscribe(v => {
    this.router.navigate(['vetements']); }
    );
  }

}

