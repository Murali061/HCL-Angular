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
  private showResult = false;
  private inputClearedFirstTime = false;
  constructor(private appService: AppService) {}
  public ngOnInit(): void {
    this.cityForm = new FormGroup({
      cityName: new FormControl('', Validators.required)
    });
  }
  public onSearchChange() {
    this.cityForm.get('cityName').valueChanges.subscribe((value) => {
      if (!value && !this.inputClearedFirstTime && this.showResult) {
        this.showResult = false;
        this.inputClearedFirstTime = true;
      }
    });
     }
  public onSubmit(): void {
    this.resetValues();
    const cityName = this.cityForm.get('cityName').value || '';
    if (cityName.trim() !== '' && cityName !== undefined) {
      this.loading = true;
      this.inputClearedFirstTime = false;
      this.appService.getLatitudeAndLongitudes(cityName).subscribe((data) => {
        this.processedResult = data;
        this.loading = false;
        this.showResult = true;
      });
      this.formError = false;
    } else {
      this.formError = true;
      this.showResult = false;
    }
  }
  private resetValues(): void {
    this.processedResult = null;
    this.showResult = false;
  }
}
