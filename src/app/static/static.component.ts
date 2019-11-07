import { ApiService } from './../api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { FormControl, Validators } from '@angular/forms';
import { Color, Label, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnInit {

  public labelTH = []
  public dataTHIN = [];
  public dataTHOut = [];

  public labelNA = []
  public dataNAIN = [];
  public dataNAOut = [];

  public selectYearTH;
  public selectYearNA;

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
  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;


  public lineChartTypeTH = 'line';


  constructor(public api: ApiService) { }

  async ngOnInit() {
     await this.getStaticTH();
     await this.getStaticNA();
  }

  getStaticTH() {
    this.api.getStaticTH().subscribe(async res => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.data.arrival.length; i++) {
        await this.labelTH.push(res.data.arrival[i].date)
        await this.dataTHIN.push(res.data.arrival[i].value);
        await this.dataTHOut.push(res.data.departure[i].value);
      }
    })
  }

  getStaticNA() {
    this.api.getStaticNA().subscribe(async res => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.data.arrival.length; i++) {
        await this.labelNA.push(res.data.arrival[i].date)
        await this.dataNAIN.push(res.data.arrival[i].value);
        await this.dataNAOut.push(res.data.departure[i].value);
      }
    })
  }

}
