import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newRest: any;
	Errors = [];
	duplicate: any;
  constructor(private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this.newRest = {name: "New Restaurant Name", cuisine: "New Cuisines Name"}
  }


onSubmit(){
	console.log("adding this new restaurant", this.newRest)
	let Observable = this._httpService.addRest(this.newRest);
		Observable.subscribe( data => {
			if(data['errors']){
				this.Errors = data['errors']
				console.log("there are errors", this.Errors)
				if(this.Errors['code']){
					console.log("DUPE")
					this.duplicate =  "Errror: Duplicate Restaurant Name"
				}
			}
		if(data['data']){
			console.log("you have sent the new pet")
			this._router.navigate(['/'])
		}
		})
}

}
