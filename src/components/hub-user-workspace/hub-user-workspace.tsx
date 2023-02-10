import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'hub-user-workspace',
  styleUrl: 'hub-user-workspace.css',
  shadow: true,
})
export class HubUserWorkspace {

  render() {
    return (
      <Host>
        <slot name="header"></slot>

        <div class="space">
          <workspace-card>
            <hub-text>
              <h2>About this Workspace</h2>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt ab cum, fugiat quae quia assumenda! Assumenda ducimus cupiditate maxime quae corrupti quaerat error, voluptatem nulla officia repudiandae? Magnam, aliquam dolorem?
            </hub-text>
          </workspace-card>

          <workspace-card>
            <h2>Recent Updates</h2>
          <arcgis-hub-gallery
              gallery-type="item"
              query="Escondido"
              layout="list"
            />
          </workspace-card>

          <workspace-card>
            <h2 slot="title">Hub Guides</h2>
            <hub-feed></hub-feed>
          </workspace-card>

          <workspace-card>
            <hub-changelog></hub-changelog>
          </workspace-card>
          <workspace-card>
            <hub-status></hub-status>
          </workspace-card>      
        </div>
        {/* <arcgis-hub-workspace
          type="project" 
        ></arcgis-hub-workspace> */}
      </Host>
    );
  }

}
