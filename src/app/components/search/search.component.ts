import { Component, OnInit } from '@angular/core';
import {ResultModel} from '../../model/result-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private appTitle = 'Search Latitude and Longitude';
  private processedResult: ResultModel;
  private cityForm: FormGroup;
  private loading = false;
  private formError = false;
  constructor(private appService: AppService) {}
  public ngOnInit(): void {
    this.cityForm = new FormGroup({
      cityName: new FormControl('', Validators.required)
    });
  }
  public onSubmit(): void {
    this.resetValues();
    const cityName = this.cityForm.get('cityName').value || '';
    if (cityName.trim() !== '' && cityName !== undefined) {
      this.loading = true;
      this.appService.getLatitudeAndLongitudes(cityName).subscribe((data) => {
        this.processedResult = data;
        this.loading = false;
      });
      this.formError = false;
    } else {
      this.formError = true;
    }
  }
  private resetValues(): void {
    this.processedResult = null;
  }
}
