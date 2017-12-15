import React, { Component } from 'react';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Meter from 'grommet/components/Meter';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Value from 'grommet/components/Value';
import experience from '../data/experience';

export default class AboutSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      workExperience: experience.totalExperience,
      activeWorkExperience: 0,
      experienceDescription: experience.experienceDescription
    };
  }
  setActiveWorkExperience(index) {
    if(index !== null && index !== undefined) {
      this.setState({activeWorkExperience: index});
    }
  }
  getParagraphs(data) {
    return data.map((article, index) => {
      return (
        <Paragraph key={index} size="large">{article}</Paragraph>
      );
    });
  }
  buildCompanyExperience(workDetails, index) {
    return (
      <Card size="xlarge" label={workDetails.title}
        colorIndex={index % 2 != 0 ? 'light-1' : 'light-2'}
        heading={workDetails.role}
        description={workDetails.started_at + " - " + workDetails.ended_at}>
        {this.getParagraphs(workDetails.description)}
      </Card>
    );
  }
  buildWorkExperience() {
    return this.state.experienceDescription.map((work, index) => {
      return <Box key={index} full='horizontal'>{this.buildCompanyExperience(work, index)}</Box>;
    });
  }
  render() {
    return (
      <Article id="About Me">
        <Section>
          <Tiles fill={true} flush={true}>
            <Tile size="large" align="start">
              <Card size="xlarge"
              label="My Work Experience"
              heading="Time spent in Class vs Server Room at University?">
                <Box pad={{between: 'small'}}>
                  <Paragraph size="large">I had over a year of experience by the time I was done with my Bachelors of Engineering working at Two Startups and a Research Institute.</Paragraph>
                  <Paragraph size="large">The learning I had was tremendous both in terms of technical & non technical aspects in the Industry.</Paragraph>
                  <Paragraph size="large">Toiled the rest of the hours either in the server room at my Univeristy or interning at Startups.</Paragraph>
                </Box>
              </Card>
            </Tile>
            <Tile pad={{'vertical': 'large'}}>
                <Meter type="circle"
                stacked={true}
                series={this.state.workExperience}
                label={<Value value={this.state.workExperience[
                  this.state.activeWorkExperience
                ].value}
                units="Months"
                label="Total: 29" />}
                max={29}
                onActive={this.setActiveWorkExperience.bind(this)} />
                <Value size="small" value={this.state.workExperience[
                  this.state.activeWorkExperience
                ].label} />
            </Tile>
          </Tiles>
        </Section>
        <Section>
          {this.buildWorkExperience()}
        </Section>
      </Article>
    );
  }
}
