import { ApiService } from './../api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { FormControl, Validators } from '@angular/forms';
import { Color, Label, BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public selectMonthTH;
  public selectMonthNA;
  public monthTransform = []
  monthsTH: string[] = this.monthTransform;
  monthsNA: string[] = this.monthTransform;
  public th_in;
  public th_out;
  public na_in;
  public na_out;

  public labelTH = []
  public dataTHIN = [];
  public dataTHOut = [];

  public labelNA = []
  public dataNAIN = [];
  public dataNAOut = [];

  public selectYearTH;
  public selectYearNA;
  years = [
    { value: 2019, viewValue: 2019 },
    { value: 2020, viewValue: 2020 },
    { value: 2021, viewValue: 2021 },
    { value: 2022, viewValue: 2022 },
    { value: 2023, viewValue: 2023 },
    { value: 2024, viewValue: 2024 }
  ];

  public lineChartDataTH: ChartDataSets[] = [
    { data: this.dataTHIN, label: 'Thai Person Arrival' },
    { data: this.dataTHOut, label: 'Thai Person Departure' },
  ];
  public lineChartLabelsTH: Label[] = this.labelTH;

  public lineChartDataNA: ChartDataSets[] = [
    { data: this.dataNAIN, label: 'National Person Arrival' },
    { data: this.dataNAOut, label: 'National Person Departure' },
  ];
  public lineChartLabelsNA: Label[] = this.labelNA;
  public lineChartOptionsTH: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };


  public lineChartTypeTH = 'line';

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;
  constructor(public api: ApiService) { }

  async ngOnInit() {
    await this.getMonth();
    this.selectYearTH = 2019;
    this.selectYearNA = 2019;
    await this.getYearTH(this.selectYearTH);
    await this.getYearNA(this.selectYearNA);
  }

  async getMonth() {
    this.api.getMonth().subscribe(async res => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.data.length; i++) {
        const dateloop = new Date(res.data[i].dateTransform).toISOString();
        const dateslice = dateloop.slice(0, 7);
        const changeDate = {
          value: res.data[i].dateTransform,
          viewValue: dateslice
        }
        this.monthTransform.push(changeDate);
      }
      this.selectMonthTH = this.monthTransform[0].value;
      this.selectMonthNA = this.monthTransform[0].value;
      await this.getDataTH(this.selectMonthTH);
      await this.getDataNA(this.selectMonthNA);
    });
  }

  getDataTH(iso) {
    this.api.getDataTH(iso).subscribe(res => {
      if (res.data.arrival >= 1000) {
        this.th_in = Math.round(res.data.arrival / 1000) + 'k';
      }

      if (res.data.departure >= 1000) {
        this.th_out = Math.round(res.data.departure / 1000) + 'k';
      }
    }, err => {
      this.th_in = 0;
      this.th_out = 0;
    });
  }

  getDataNA(iso) {
    this.api.getDataNA(iso).subscribe(res => {
      if (res.data.arrival >= 1000) {
        this.na_in = Math.round(res.data.arrival / 1000) + 'k';
      }

      if (res.data.departure >= 1000) {
        this.na_out = Math.round(res.data.departure / 1000) + 'k';
      }
    }, err => {
      this.na_in = 0;
      this.na_out = 0;
    });
  }

  getYearTH(year) {
    this.api.getYearTH(year).subscribe(async res => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.data.arrival.length; i++) {
        const dateloop = new Date(parseInt(res.data.arrival[i].date)).toISOString();
        const dateslice = dateloop.slice(0, 7);
        await this.labelTH.push(dateslice)
        await this.dataTHIN.push(res.data.arrival[i].value);
        await this.dataTHOut.push(res.data.departure[i].value);
      }
    })
  }

  getYearNA(year) {
    this.api.getYearNA(year).subscribe(async res => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.data.arrival.length; i++) {
        const dateloop = new Date(parseInt(res.data.arrival[i].date)).toISOString();
        const dateslice = dateloop.slice(0, 7);
        await this.labelNA.push(dateslice)
        await this.dataNAIN.push(res.data.arrival[i].value);
        await this.dataNAOut.push(res.data.departure[i].value);
      }
    })
  }

  async changeMonthTH(month) {
    await this.getDataTH(month);
  }

  async changeMonthNA(month) {
    await this.getDataNA(month);
  }

  async changeYearTH(year) {
    await this.getYearTH(year);
    await this.labelTH.splice(0, this.labelTH.length)
    await this.dataTHIN.splice(0, this.dataTHIN.length)
    await this.dataTHOut.splice(0, this.dataTHOut.length)
  }

  async changeYearNA(year) {
    await this.getYearNA(year);
    await this.labelNA.splice(0, this.labelNA.length)
    await this.dataNAIN.splice(0, this.dataNAIN.length)
    await this.dataNAOut.splice(0, this.dataNAOut.length)
  }

}
