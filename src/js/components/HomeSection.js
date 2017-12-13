import React, { Component } from 'react';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Distribution from 'grommet/components/Distribution';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';
import interests from '../data/interests';

export default class HomeSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }
  interestDistributionData() {
    return interests.interestDistributionData;  
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
              <Paragraph size="large">A Geek who loves tinkering and learning new things by implementation.</Paragraph>
              <Paragraph size="large">Enthusiastic about building things which make a difference.</Paragraph>
              <Paragraph size="large">Constantly learning & trying out new things be it new languages, libraries or frameworks.</Paragraph>
              <Paragraph size="large">Always loved Physics and Computer Science with a new found interest in Machine Learning and Data Science.</Paragraph>
            </Box>
          </Card>
        </Section>
        <Section pad='large'
          justify='center'
          full='vertical'>
            <Heading strong={false}
              uppercase={false}
              truncate={false}
              align='center'
              margin='none'>
              My Interests
            </Heading>
            <Box pad={{'horizontal': 'small', 'vertical': 'medium'}}>
              <Distribution
                series={this.interestDistributionData()}
                full={false}
                size='medium' />
            </Box>
        </Section>
      </Article>
    );
  }
}
