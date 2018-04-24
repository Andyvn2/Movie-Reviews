import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	restaurants: any;

  constructor(private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  	this.getRests();
  }

  getRests(){
  	let Observable = this._httpService.getRests()
  	Observable.subscribe(
  		data => {
  		this.restaurants = data['data']
  		console.log(this.restaurants)
  	}
  		)
  }


  deleteButtonClicked(idee){


  	let Observable = this._httpService.deleteRests(idee)
  	Observable.subscribe(
  		data =>{
  		console.log("delete Success")
  		this._router.navigate(['/'])
  		})
  }
}
