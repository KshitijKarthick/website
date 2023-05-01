import React, { Component } from 'react';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Distribution from 'grommet/components/Distribution';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';
import achievements from '../data/achievements';
import interests from '../data/interests';

export default class HomeSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }
  render() {
    return (
      <Article scrollStep={false}>
        <Section pad='large'
          justify='center'
          align='center'
          full='vertical'>
          <Card size="xlarge"
            label="About Me"
            heading="Curiosity kills the cat, well everything seems fine so far.">
            <Box pad={{between: 'small'}}>
              <Paragraph size="large">6+ years experience as an ML Engineer across companies in India and Germany, focusing</Paragraph>
              <Paragraph size="large">on delivering large-scale data-centric applications and productionizing Machine learning</Paragraph>
              <Paragraph size="large">applications at scale, be it building data pipelines, data versioning, automation of model</Paragraph>
              <Paragraph size="large">training, monitoring, alerting systems, and model development.</Paragraph>
            </Box>
          </Card>
        </Section>
        {/*<Section pad='large'*/}
        {/*  justify='center'*/}
        {/*  full='vertical' colorIndex='light-2'>*/}
        {/*    <Heading strong={false}*/}
        {/*      uppercase={false}*/}
        {/*      truncate={false}*/}
        {/*      align='center'*/}
        {/*      margin='none'>*/}
        {/*      My Interests*/}
        {/*    </Heading>*/}
        {/*    <Box pad={{'horizontal': 'small', 'vertical': 'medium'}}>*/}
        {/*      <Distribution*/}
        {/*        series={interests.interestDistributionData}*/}
        {/*        full={false}*/}
        {/*        size='medium' />*/}
        {/*    </Box>*/}
        {/*</Section>*/}
        <Section pad='large'
          justify='center'
          full='vertical' colorIndex='light-2'>
            <Heading strong={false}
              uppercase={false}
              truncate={false}
              align='center'
              margin='none'>
              My Skills
            </Heading>
            <Box pad={{'horizontal': 'small', 'vertical': 'medium'}}>
              <Distribution
                series={interests.skillsDistributionData}
                full={false}
                size='medium' />
            </Box>
        </Section>
        <Section pad='large'
          justify='center'
          full='vertical' >
            <Heading strong={false}
              uppercase={false}
              truncate={false}
              align='center'
              margin='none'>
              My Achievements
            </Heading>
            <Box pad={{'horizontal': 'small', 'vertical': 'medium'}}>
              <List selectable={false}>
                {achievements.acheivementsList.map((data) => {
                  return(
                    <ListItem justify='between' separator='bottom'>
                      {data}
                    </ListItem>
                  );
                })}
              </List>
            </Box>
        </Section>
      </Article>
    );
  }
}
