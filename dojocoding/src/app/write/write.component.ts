import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
	Idee: Number;
	newReview: any;
	Errors = [];
  constructor(private _httpService: HttpService,
	private _route: ActivatedRoute,
	private _router: Router) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => 
  		this.Idee = params['id']);
  	console.log(this.Idee)
  	this.newReview = {restID: `${this.Idee}`, name: "Your Name", stars: 0, review: "Your Review"}
  }


onSubmitReview(){
	console.log("this is the new Review", this.newReview)
	let Observable = this._httpService.addReview(this.newReview);
  	Observable.subscribe(data => {
      if(data['errors']){
        this.Errors = data['errors']
        console.log("there are errors", this.Errors)
        console.log("error 1", this.Errors['message'])
      }
      if(data['data']){
        console.log('you have sent the new Pet')
        this._router.navigate(['/review/'+ this.Idee]);
      }
      
      

    })
}
}
