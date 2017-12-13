import React, { Component } from 'react';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Animate from 'grommet/components/Animate';
import Article from 'grommet/components/Article';
import Book from 'grommet/components/icons/base/Book';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import CaretDown from 'grommet/components/icons/base/CaretDown';
import Headline from 'grommet/components/Headline';
import Map from 'grommet/components/Map';
import Meter from 'grommet/components/Meter';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';
import ShopCart from 'grommet/components/icons/base/ShopCart';
import Steps from 'grommet/components/icons/base/Steps';
import Title from 'grommet/components/Title';
import UserWorker from 'grommet/components/icons/base/UserWorker';
import Value from 'grommet/components/Value';
import experience from '../data/experience';

export default class AboutSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      workExperience: experience.totalExperience,
      activeWorkExperience: 0
    };
  }
  setActiveWorkExperience(index) {
    if(index !== null && index !== undefined) {
      this.setState({activeWorkExperience: index});
    }
  }
  render() {
    return (
      <Article id="About Me">
        <Section>
          <Card size="xlarge"
          label="My Work Experience"
          heading="Time spent in Class vs Server Room at University?">
            <Box pad={{between: 'small'}}>
              <Paragraph size="large">I had over a year of experience by the time I was done with my Bachelors of Engineering working at Two Startups and a Research Institute.</Paragraph>
              <Paragraph size="large">The learning I had was tremendous both in terms of technical & non technical aspects in the Industry.</Paragraph>
              <Paragraph size="large">Toiled the rest of the hours either in the server room at my Univeristy or interning at Startups.</Paragraph>
            </Box>
            <Box align="center">
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
            </Box>
            <Box pad={{vertical: 'medium', between: 'medium'}}>
              <Headline size="small">More Details <CaretDown /></Headline>
              <Accordion>
                <AccordionPanel heading={<Title>Timeline <Steps /></Title>}>
                  <Animate enter={{"animation": "fade", "duration": 1000}} leave={{"animation": "fade", "duration": 1000}} visible={true}>
                    <Box align="center">
                      <Map data={{
                        "categories": [
                          {
                            "id": "category-1",
                            "label": "Timeline",
                            "items": [
                              {"id": "item-1-1", "node": "Engineering 3rd Year"},
                              {"id": "item-1-2", "node": "Engineering 4th Year"},
                              {"id": "item-1-3", "node": "Work"}
                            ]
                          },
                          {
                            "id": "category-2",
                            "label": "Startup",
                            "items": [
                              {"id": "item-2-1", "node": "Jnaapti"},
                              {"id": "item-2-2", "node": "Studeyo"}
                            ]
                          },
                          {
                            "id": "category-3",
                            "label": "Research Institute",
                            "items": [
                              {"id": "item-3-1", "node": "Indian Institute of Science"}
                            ]
                          }
                        ],
                        "links": [
                          {"parentId": "item-1-1", "childId": "item-2-1"},
                          {"parentId": "item-1-2", "childId": "item-3-1"},
                          {"parentId": "item-1-2", "childId": "item-2-1"},
                          {"parentId": "item-1-2", "childId": "item-2-2"},
                          {"parentId": "item-1-3", "childId": "item-2-1"}
                        ]
                      }} vertical={false} />
                    </Box>
                  </Animate>
                </AccordionPanel>
                <AccordionPanel heading={<Title>Jnaapti <UserWorker /></Title>}>
                  <Animate enter={{"animation": "fade", "duration": 1000}} leave={{"animation": "fade", "duration": 1000}} visible={true}>
                    <Paragraph>Working on Generating usable Metrics/Insights for Learners utilising the Training/Assessment Platform VirtualCoach</Paragraph>
                    <Paragraph>To Bring Zim Wiki (a Desktop Wiki Application) over to the Web.</Paragraph>
                  </Animate>
                </AccordionPanel>
                <AccordionPanel heading={<Title>Indian Institute of Science <Book /></Title>}>
                  <Animate enter={{"animation": "fade", "duration": 1000}} leave={{"animation": "fade", "duration": 1000}} visible={true}>
                    <Paragraph>Implementing a Trsl (tree based statistical language) model in Python for supporting the acoustic model by prediction of the next word.</Paragraph>
                    <Paragraph>Under the guidance of Dr. Thippur V. Sreenivas, ECE department, mentored by Kiran Subbaraman.</Paragraph>
                  </Animate>
                </AccordionPanel>
                <AccordionPanel heading={<Title>Studeyo <ShopCart /></Title>}>
                  <Animate enter={{"animation": "fade", "duration": 1000}} leave={{"animation": "fade", "duration": 1000}} visible={true}>
                    <Paragraph>Working on a contextual advertising and product discovery platform.</Paragraph>
                    <Paragraph>Currently focused on working out product relatedness and semantic context of the content being monetized.</Paragraph>
                  </Animate>
                </AccordionPanel>
              </Accordion>
            </Box>
          </Card>
        </Section>
      </Article>
    );
  }
}
