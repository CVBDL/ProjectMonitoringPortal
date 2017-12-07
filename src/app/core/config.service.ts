import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw as rxThrow } from "rxjs/observable/throw";
import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from "rxjs/operators/tap";

import { Bucket } from "./bucket.model";
import { Config } from "./config.model";
import { Chart } from "./chart.model";
import { Charts } from "./charts.model";
import { ChartGroup } from "./chart-group.model";
import { Product } from "./product.model";
import { Program } from "./program.model";

@Injectable()
export class ConfigService {
  /**
   * Parsed configuration cache.
   */
  private cache: Config;

  constructor(private http: HttpClient) { }

  /**
   * Get full config.
   * @param force Force to fetch config from server.
   */
  getConfig(force: boolean = false): Observable<Config> {
    if (!force && this.cache) {
      return of(this.cache);
    } else {
      return this.http.get('./assets/config.xml', { responseType: 'text' })
      .pipe(
        switchMap(xml => this.parseFromXml(xml)),
        tap(config => {
          this.cache = config;
        })
      )
    }
  }

  /**
   * Get bucket config from full config.
   * @param bucket Bucket name like services.
   */
  getBucketConfig(bucket: string): Observable<Bucket> {
    return this.getConfig()
      .pipe(
        switchMap<Config, Bucket>(config => {
          let result: Bucket | undefined = config.program.buckets.find(b => b.id === bucket);

          if (result) {
            return of(result);

          } else {
            return rxThrow(`Not found: bucket with '${bucket}'`);
          }
        })
      );
  }

  /**
   * Get product config from full config.
   * @param bucket Bucket name like: services.
   * @param product Product name.
   */
  getProductConfig(bucket: string, product: string): Observable<Product> {
    return this.getBucketConfig(bucket)
      .pipe(
        switchMap<Bucket, Product>(b => {
          let result: Product | undefined = b.products.find(p => p.id === product);

          if (result) {
            return of(result);

          } else {
            return rxThrow(`Not found: bucket with '${bucket}', product with ${product}`);
          }
        })
      );
  }

  /**
   * Generate config object from XML string.
   * @param xml Config XML string format.
   */
  private parseFromXml(xml: string): Observable<Config> {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, "application/xml");

      let config = new Config();
      let program = new Program();

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

        program.buckets.push(bucket);

        config.program = program;
      }

      return of(config);

    } catch (e) {
      return rxThrow('Errro parsing config XML file.');
    }
  }
}
