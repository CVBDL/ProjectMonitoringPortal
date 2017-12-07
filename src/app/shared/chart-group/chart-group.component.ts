import { Component, Input } from '@angular/core';

import { Chart } from '../../core/chart.model';
import { ChartGroup } from '../../core/chart-group.model';


@Component({
  selector: 'pmp-chart-group',
  templateUrl: './chart-group.component.html',
  styleUrls: ['./chart-group.component.scss']
})
export class ChartGroupComponent {
  @Input() group: ChartGroup;

  /**
   * Open a new browser window with given URL.
   * @param chart 
   */
  showChart(chart: Chart): void {
    window.open(chart.url, chart.title);
  }
}
