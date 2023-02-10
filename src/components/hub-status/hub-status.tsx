import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'hub-status',
  styleUrl: 'hub-status.css',
  shadow: true,
})
export class HubStatus {

  @Prop() statusUrl:string = 'https://arcgis.github.io/hub-status/status.json';
  
  /**
   * 
  "overview": {
    "status": "normal",
    "message": "Hub sites operating normally."
  },
  "services": [
    {
      "Service Name": "Hub Sites",
      "Status": "normal"
    },
    {
      "Service Name": "Search API",
      "Status": "normal"
    },
    {
      "Service Name": "Content Indexer",
      "Status": "normal"
    },
    {
      "Service Name": "Downloads",
      "Status": "normal"
    },
    {
      "Service Name": "Discussions",
      "Status": "normal"
    }
  ],
   */
  @State() status:any = {};

  componentDidLoad() {
    this.fetchStatus()
  }

  async fetchStatus() {
    let data = await fetch(this.statusUrl);
    let statusData = await data.json();
    this.status = statusData;
  }

  render() {
    return (
      <Host>
        <h2><slot>Hub Service status</slot></h2>
        <ul>
          <li>Overall: {this.status?.overview?.status}</li>
          {this.status?.services?.map((s) => {
            return <li>{s['Service Name']}: {s['Status']}</li>
          })}
          
        </ul>
      </Host>
    );
  }

}
