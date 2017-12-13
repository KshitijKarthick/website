import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';
import Anchor from 'grommet/components/Anchor';
import Paragraph from 'grommet/components/Paragraph';
import Deployment from 'grommet/components/icons/base/Deployment';
import SocialGithub from 'grommet/components/icons/base/SocialGithub';

export default class Project extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      title: props.title,
      description: props.description,
      category: props.category,
      textAlign: props.textAlign,
      languageDistribution: props.languageDistribution,
      activeLangDistIndex: 0,
      commits: props.commits,
      github: props.github,
      demo: props.demo
    };
  }
  setActiveLanguageDistribution(index) {
    if(index !== null && index !== undefined) {
      this.setState({activeLangDistIndex: index});
    }
  }
  buildDescription() {
    return this.state.description.map((data, index) => {
      return (
        <Paragraph key={index} size="large">
          {data}
        </Paragraph>
      );
    });
  }
  render() {
    let demo=(
      <Box />
    );
    let github=(
      < Box />
    );
    if(this.state.demo !== null) {
      demo=(<Anchor align="end" target="_blank" icon={
        <Deployment/ >
      } href={this.state.demo} />);
    } 
    if(this.state.github !== null) {
      github=(<Anchor align="end" target="_blank" icon={
        <SocialGithub/ >
      } href={this.state.github} />);
    }
    if(this.state.languageDistribution.length > 0) {
      return (
        <Card size="xxlarge" textAlign={this.state.textAlign} label={this.state.category}
        heading={this.state.title}>
          {this.buildDescription()}
          <Box direction="row">
            {demo}
            {github}
          </Box>
          <Box direction="row">
            <Box flex={true} justify="between" align="center" pad={{"between": "medium"}} >
              <Box direction="row" align="center" pad={{"between": "small"}}>
                <Meter type="spiral"
                series={this.state.languageDistribution}
                label={false} max={100} threshold={90}
                size="small" onActive={this.setActiveLanguageDistribution.bind(this)}
                />
                <Value
                value={
                  this.state.languageDistribution[
                    this.state.activeLangDistIndex
                  ].value
                } 
                units="%"
                align="start"
                label={
                  this.state.languageDistribution[
                    this.state.activeLangDistIndex
                  ].label
                }
                size="small"/>
              </Box>
            </Box>
            {this.state.commits?<Box flex={true} justify="between" align="center">
              <Meter type="circle"
              max={this.state.commits.total}
              value={this.state.commits.mine}
              label={<Value size="small"
                value={this.state.commits.mine}
                units="Commits"/>
              }
              />
              <Value align="center" label={"Total Commits: " + this.state.commits.total} />
            </Box>:<Box flex={true} justify="between" align="center"></Box>
            }
          </Box>
        </Card>
      );
    } else {
      return (
        <Card />
      );
    }
  }
}
