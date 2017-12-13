import React, { Component } from 'react';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import Project from './Project';
import R from 'ramda';
import Section from 'grommet/components/Section';
import Sidebar from 'grommet/components/Sidebar';
import Split from 'grommet/components/Split';
import Title from 'grommet/components/Title';

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
          category: 'Data Mining',
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
  getSortedCategories() {
    var sortCategories = R.sortWith([R.ascend(R.prop('category'))]);
    var sortedCategories = R.uniq(
      R.pluck('category')(sortCategories(this.state.projectData))
    );
    return sortedCategories;
  }
  getCategorySidebar() {
    var categories = this.getSortedCategories();
    var getAnchorForCategories = categories.map((category, index) => {
      return (
        <Anchor key={index}>
            {category}
        </Anchor>
      );
    });
    return (<Sidebar
      full={true}>
      <Header pad='medium'
        justify='between'>
        <Title>
          Categories
        </Title>
      </Header>
      <Box flex='grow'
        justify='start'>
        <Menu primary={true}>
          {getAnchorForCategories}
        </Menu>
      </Box>
    </Sidebar>);
  }
  getProjects() {
    var groupByCategories = R.groupBy(R.prop('category'));
    var sortedCategories = this.getSortedCategories();
    var categoryBasedProjects = groupByCategories(this.state.projectData);
    var getProject = ((project, index) => {
      return (
        <Project
          id={project.category}
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
    var getCategoryBasedProjectList = ((category, index) => {
      return (
        <Section key={category}>
          {categoryBasedProjects[category].map(getProject)}
        </Section>
      );
    });
    return sortedCategories.map(getCategoryBasedProjectList);
  }
  render() {
    return (
      <Article pad={{between: 'small'}}>
        <Split priority='left' fixed={false} flex='left'>
          <Box
            justify='center'
            size='large'
            align='center'>
              {this.getProjects()}
          </Box>
          <Box
            justify='center'
            align='center'>
              <Box>{this.getCategorySidebar()}</Box>
          </Box>
        </Split>
      </Article>
    );
  }
}
