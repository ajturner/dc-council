import { Component, Host, h, Prop } from '@stencil/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import { ICommittee } from '../../utils/types';

@Component({
  tag: 'dc-council-visualization',
  styleUrl: 'dc-council-visualization.css',
  shadow: true,
})
export class DcCouncilVisualization {

  @Prop() committees: ICommittee[] = [];

  chartEl: HTMLDivElement;
  root = null;

  componentDidLoad() {
    this.createVisualization();
  }
  componentWillRender() {
    this.createTreemap()
  }
  createVisualization() {
    // debugger;
    this.root = am5.Root.new( this.chartEl );
    this.createTreemap();
  }
  private createTreemap() {
    if(!this.root) {
      return;
    }
    var container = this.root.container.children.push(
      am5.Container.new(this.root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: this.root.verticalLayout
      })
    );
    var series = container.children.push(
      am5hierarchy.Treemap.new(this.root, {
        downDepth: 1,
        upDepth: 0,
        initialDepth: 1,
        valueField: "budget",
        categoryField: "name",
        childDataField: "agencies",
        // layoutAlgorithm: "sliceDice",
        nodePaddingOuter: 20,
        nodePaddingInner: 10
      })
    );
    const data = this.compileCommitteeData(this.committees);

    // This doesn't work (yet) for arrays
    // series.data.processor = am5.DataProcessor.new(root, {
    //   numericFields: ["agencies.budget"]
    // });
    series.data.setAll(data);
    // Add breadcrumbs
    container.children.unshift(
      am5hierarchy.BreadcrumbBar.new(this.root, {
        series: series
      })
    );
  }

  // Need to convert deeply nested budgets to numbers
  compileCommitteeData(committees: ICommittee[]) {
    const c = committees.reduce((arr, committee) => {
      const agencies = committee.agencies.reduce((aarr, agency) => {
        aarr.push({
          ...agency,
          budget: Number(agency.budget)
        })
        return aarr;
      }, [])

      arr.push({
        ...committee,
        name: `${committee.name}\n${committee.members?.chair[0]?.name || "No Chair"}`,
        agencies
      })
      return arr;
    }, []);
    return [{
      name: "Committees",
      agencies: c
    }]
  }

  render() {
    // const root = am5.Root.new("chartdiv");

    return (
      <Host>
        <dc-council-info-panel scale="l">
        <span slot="title">
          View Budget
        </span>
        <div slot="header">Budget Visualization</div>
        <div slot="content">
        <div id="chart" ref={el => this.chartEl = el}>

        </div>
        </div>
      </dc-council-info-panel>
      </Host>
    );
  } 
}