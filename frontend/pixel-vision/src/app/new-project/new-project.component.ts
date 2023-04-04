import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataset, ChartOptions } from 'chart.js';
import io from 'socket.io-client';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit, OnDestroy {
  logs: string = '';
  metrics: any[] = [];
  trainingStarted: boolean = false;
  public changeTrigger = 0;

  private socket: any;

  public lineChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Training Loss',
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = { responsive: true};
  public lineChartLegend = true;
  public lineChartType: 'line' = 'line';
  public lineChartPlugins = [];

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:5000');
  }

  ngOnInit(): void {
    this.socket.on('log', (log: string) => {
      this.changeTrigger++;
    });

    this.socket.on('metric', (metric: any) => {
      this.metrics.push(metric);
      this.updateChartData(metric);
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

  startTraining() {
    this.trainingStarted = true;
    this.http.get('http://localhost:5000/api/start_training').subscribe((data: any) => {
      //console.log(data.message);
    });
  }

  updateChartData(metric: any) {
    // Assuming your metric object has a property called "loss" and another called "epoch"
    (this.lineChartData[0].data as number[]).push(metric.loss);
    this.lineChartLabels.push(metric.epoch.toString());
    //console.log(metric);
  }
}
