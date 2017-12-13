import React, { Component } from 'react';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Project from './Project';
import R from 'ramda';
import Section from 'grommet/components/Section';
import projects from '../data/projects';

export default class ProjectSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      projectData: projects.projectList
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
        <Box key={index}>
          <Anchor key={index}>
              {category}
          </Anchor>
        </Box>
      );
    });
    return (
      <Box direction="row" size="large" pad={{'between': 'small'}}>
        <Box>
          <Heading tag="h4" align="start" strong={true}>
            Categories:
          </Heading>
        </Box>
        {getAnchorForCategories}
      </Box>);
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
      <Article>
        <Section>
          <Box
            margin='small'
            align='start'>
            {this.getCategorySidebar()}
          </Box>
          <Box
            justify='center'>
              {this.getProjects()}
          </Box>
        </Section>
      </Article>
    );
  }
}
