import Project from './Project';
import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Scorecard from 'grommet/components/icons/base/Scorecard';

export default class ProjectSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      projectData: [
        {
          title: 'Measuring Semantic Relatedness Across Languages',
          description: [
            'Provide capability to find semantically related words across languages in a agnostic way.',
            'Given a word in language 1, you can find semantically related words in language 2.',
            'The model can be used to obtain a semantic distance measure for words across languages.'
          ],            
          textAlign: 'left',
          category: 'Machine Learning',
          languageDistribution: [
            {"label": "Python", "value": 70, "colorIndex": "graph-1"},
            {"label": "Javascript", "value": 10, "colorIndex": "graph-2"},
            {"label": "CSS", "value": 5, "colorIndex": "graph-3"},
            {"label": "HTML", "value": 15, "colorIndex": "graph-4"}
          ],
          commits: {
            'mine': 294,
            'total': 420
          },
          github: 'http://github.com/kshitijkarthick/tvecs/',
          demo: 'http://kshitijkarthick.github.io/tvecs/'
        },
        {
          title: 'Urban Data Visualization',
          description: [
            'Provide capability to obtain insights on the Wards of Bengaluru based on factors like number of parks, toilets, lakes, population density.',
            ' Visualize and interact with the data on the Map of Bengaluru'
          ],
          textAlign: 'left',
          category: 'Machine Learning',
          languageDistribution: [
            {"label": "Python", "value": 40, "colorIndex": "graph-1"},
            {"label": "Javascript", "value": 30, "colorIndex": "graph-2"},
            {"label": "CSS", "value": 5, "colorIndex": "graph-3"},
            {"label": "HTML", "value": 25, "colorIndex": "graph-4"}
          ],
          commits: {
            'mine': 100,
            'total': 150
          },
          github: null,
          demo: 'http://udvhack.herokuapp.com/'
        }
      ]
    };
  }
  getProjectHTML() {
    return this.state.projectData.map((project, index) => {
      return (
        <Project
          key={index}
          title={project.title}
          description={project.description}
          textAlign={project.textAlign}
          category={project.category}
          languageDistribution={project.languageDistribution}
          commits={project.commits}
          github={project.github}
          demo={project.demo}
        />
      );
    });
  }
  render() {    
    return (
      <Section id="Projects" pad={{between: 'medium', vertical: 'small'}}>
        <Header justify="between">
          <Heading tag="h2">
            < Scorecard /> Projects
          </Heading>
        </Header>
        {this.getProjectHTML()}
      </Section>
    );
  }
}

