import {Component, Input} from '@angular/core';
import {ResultModel} from '../../model/result-model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent  {
  private searchResult: ResultModel;
  @Input() set searchData(data: ResultModel) {
    this.searchResult = data;
  }
}
