import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
Idee: Number;
editThisRest = [];
Errors = [];

  constructor(private _httpService: HttpService,
  			  	private _route: ActivatedRoute,
    			private _router: Router) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => 
  		this.Idee = params['id']);
  	this.getRests()

  	
  }

getRests(){
	let observable = this._httpService.findRest(this.Idee)
  	observable.subscribe( data => {
  	this.editThisRest = data['data'][0];
  	console.log("found this REst", this.editThisRest)	
  
  })
}


onSubmitEdit(idee){
	console.log("edit Submitted", this.editThisRest)
	let observable = this._httpService.updateRest(this.editThisRest, idee)
	observable.subscribe( data => {
		if(data['errors']){
				this.Errors = data['errors']
				console.log("there are errors", this.Errors)
				
			}
		else{
			console.log("you have sent the edited rest")
			this._router.navigate(['/'])
		}
		})
}



}
