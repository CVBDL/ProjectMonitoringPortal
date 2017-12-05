import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw as rxThrow } from "rxjs/observable/throw";
import { switchMap } from 'rxjs/operators';

import { Bucket } from "./bucket.model";
import { Program } from "./program.model";
import { Element } from "@angular/compiler";
import { Product } from "./product.model";
import { Charts } from "./charts.model";
import { ChartGroup } from "./chart-group.model";
import { Chart } from "./chart.model";

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  getConfig(): Observable<Program> {
    return this.http.get('./assets/config.xml', { responseType: 'text' })
      .pipe(
        switchMap(xml => this.parseConfigXml(xml))
      )
      // .subscribe(xml => {
      //   try {
      //     const parser = new DOMParser();
      //     const doc = parser.parseFromString(xml, "application/xml");
      //   } catch (e) {
      //     return rxThrow('Error parsing config XML file.');
      //   }
      // });

    // var config = {
    //   id: 'program',
    //   title: 'Program',
    //   items: [{
    //     id: 'programmingparadigms',
    //     title: 'Programming Paradigms',
    //     items: [{
    //       id: 'overview',
    //       title: 'Overview'
    //     }, {
    //       id: 'imperative',
    //       title: 'Imperative'
    //     }]
    //   }, {
    //     id: 'programminglanguages',
    //     title: 'Programming Languages',
    //     items: [{
    //       id: 'overview',
    //       title: 'Overview'
    //     }, {
    //       id: 'java',
    //       title: 'Java'
    //     }]
    //   }]
    // };

    //return of(config);
  }

  getConfigById(program: string, product: string) {
    if (!program) {
      return rxThrow('Invalid program.');
    }

    return this.getConfig().pipe(
      switchMap(config => {
        return of(5);
      })
    )
  }

  private parseConfigXml(xml: string): Observable<Program> {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "application/xml");

      let config = new Program();

      const bucketNodeList = doc.getElementsByTagName('Bucket');
      const bucketLength = bucketNodeList.length;
      for(let i: number = 0; i < bucketLength; i++) {
        let bucket = new Bucket();
        bucket.id = bucketNodeList[i].getAttribute('id');
        bucket.title = bucketNodeList[i].getAttribute('title');

        const productNodeList = bucketNodeList[i].getElementsByTagName('Product');
        const productLength = productNodeList.length;
        for (let j: number = 0; j < productLength; j++) {
          let product = new Product();
          product.id = productNodeList[j].getAttribute('id');
          product.title = productNodeList[j].getAttribute('title');

          const chartsNodeList = productNodeList[j].getElementsByTagName('Charts');
          const chartsLength = chartsNodeList.length;
          for (let k: number = 0; k < chartsLength; k++) {
            let charts = new Charts();
            charts.title = chartsNodeList[k].getAttribute('title');

            const chartGroupNodeList = chartsNodeList[k].getElementsByTagName('ChartGroup');
            const chartGroupLength = chartGroupNodeList.length;
            for (let m: number = 0; m < chartGroupLength; m++) {
              let chartGroup = new ChartGroup();
              chartGroup.title = chartGroupNodeList[m].getAttribute('title');

              const chartNodeList = chartGroupNodeList[m].getElementsByTagName('Chart');
              const chartLength = chartNodeList.length;
              for (let n: number = 0; n < chartLength; n++) {
                let chart = new Chart();
                chart.title = chartNodeList[n].getAttribute('title');
                chart.time = chartNodeList[n].getAttribute('time');
                chart.url = chartNodeList[n].getAttribute('url');

                chartGroup.charts.push(chart);
              }

              charts.groups.push(chartGroup);
            }

            product.charts.push(charts);
          }

          bucket.products.push(product);
        }

        config.buckets.push(bucket);
      }

      return of(config);

    } catch (e) {
      return rxThrow('Errro parsing config XML file.');
    }
  }
}
