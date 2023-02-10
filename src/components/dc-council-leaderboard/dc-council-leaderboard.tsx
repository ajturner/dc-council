import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'dc-council-leaderboard',
  styleUrl: 'dc-council-leaderboard.css',
  shadow: true,
})
export class DcCouncilLeaderboard {

  render() {
    return (
      <Host>
        <dc-council-info-panel>
        <span slot="title">
          Leaderboard
        </span>
        <div slot="header">Leaderboard</div>
        <div slot="content">
        <div id="chart">

        </div>
        </div>
      </dc-council-info-panel>        
      </Host>
    );
  }

}
