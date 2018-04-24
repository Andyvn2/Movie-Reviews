import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http:HttpClient) { }

getRests(){
	console.log("getting Rests")
	return this._http.get('/rests')
}

deleteRests(idee){
	return this._http.delete('/rests/'+idee)
}

addRest(newrest){
	console.log("adding new rest", newrest)
	return this._http.post('/rests', newrest)
}

findRest(restID){
	console.log("finding REst", restID)
	return this._http.get('/rests/' + restID)
}

updateRest(Rest, idee){
	console.log("updating", Rest)
	return this._http.put('/rests/'+idee, Rest)
}

addReview(newreview){
	console.log('adding review', newreview)
	return this._http.post('/reviews', newreview)
}

getReviews(restID){
	console.log("getting REviews")
	return this._http.get('/reviews/'+restID)
}

}
