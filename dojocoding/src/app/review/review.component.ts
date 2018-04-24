import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
	Idee: Number;
	reviews: any;
	
  constructor(private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this._route.params.subscribe((params: Params) => 
  		this.Idee = params['id']);
  	console.log(this.Idee)
  	this.getReviews()
  }

getReviews(){
	console.log("grabbing Reviews")
	let observable = this._httpService.getReviews(this.Idee)
	observable.subscribe(
		data => {
			this.reviews = data['data'];
			console.log("this is the reviews", this.reviews)
		})
}

}
