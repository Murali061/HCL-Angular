import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResultModel} from '../model/result-model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public responseCache =  new Map();

  constructor(private http: HttpClient) {

  }


  public getLatitudeAndLongitudes(cityName: string): Observable<any> {
    const url = `${environment.baseUrl}/json?sensor=false&address=${cityName}`;
    const responseFromCache = this.responseCache.get(url);

    if (responseFromCache) {
      return of(responseFromCache);
    }
    return this.http.jsonp(url, 'callback')
      .pipe(map(data => {
        const data1 = this.processData(data, cityName);
        this.responseCache.set(url, data1);
        return data1;
      }));
  }

  private processData(data: any, city: string): ResultModel {
    let searchResult: ResultModel ;
    if (data.status === 'ZERO_RESULTS') {
      searchResult = {
        error: true,
        cityName: city,
        latitude: 0,
        longitude: 0
      };
      return searchResult;
    } else if (data.status === 'OK') {
      const location = data.results[0].geometry.location || {};
      searchResult = {
        cityName: city,
        longitude: location.lng,
        latitude: location.lat,
        error: false
      };
      return searchResult;
    }
  }

}
