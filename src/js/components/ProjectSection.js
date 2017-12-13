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
