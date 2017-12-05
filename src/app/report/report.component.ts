import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";

import { of } from "rxjs/observable/of";
import { switchMap } from 'rxjs/operators/switchMap';
import { _throw as rxThrow } from "rxjs/observable/throw";

import { ConfigService } from '../core/config.service';
import { Bucket } from '../core/bucket.model';
import { Product } from '../core/product.model';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  bucket: Bucket;
  product: Product;

  constructor(private activatedRoute: ActivatedRoute,
              private config: ConfigService) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(switchMap((params: ParamMap): Observable<Bucket | Product> => {
        const bucket: string = params.get('bucket');
        const product: string = params.get('product');

        if (bucket && product) {
          // specify a product
          return this.config.getProductConfig(bucket, product);

        } else if (bucket && !product) {
          return  this.config.getBucketConfig(bucket);

        } else {
          return rxThrow('Invalid report route.');
        }
      }))
      .subscribe((data: Bucket | Product) => {
        if (data instanceof Bucket) {
          this.bucket = data;

        } else {
          this.product = data;
        }
      });
  }

}
