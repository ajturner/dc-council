import { Component, Host, h, Prop, State } from '@stencil/core';
import { ICommittee } from '../../utils/types';

@Component({
  tag: 'dc-council-evaluation',
  styleUrl: 'dc-council-evaluation.css',
  shadow: true,
})
export class DcCouncilEvaluation {
  @Prop() committees: ICommittee[] = [];

  @State() score: number = 0;

  componentWillRender() {
    this.calculateCompleteness()    
  }
  calculateCompleteness() {
    // debugger;
    const completenessScore = this.committees.reduce((score, committee) => {
      score += committee.members.chair.length >= 1 ? 50 : 0;
      score += committee.agencies.length >= 1 ? 50 : 0;
      return score;
    }, 0);

    this.score = completenessScore / this.committees.length;
  }
  render() {
    return (
      <Host>
        <slot></slot>
        {this.score} / 100
      </Host>
    );
  }

}
