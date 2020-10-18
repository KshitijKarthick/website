import React, { Component } from 'react';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Project from './Project';
import R from 'ramda';
import Section from 'grommet/components/Section';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import projects from '../data/projects';

export default class ProjectSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      projectData: projects.projectList,
      filterCategories: new Set(R.pluck('category', projects.projectList))
    };
  }
  getSortedCategories() {
    var sortCategories = R.sortWith([R.ascend(R.prop('sortedId'))]);
    var sortedCategories = R.uniq(
      R.pluck('category')(sortCategories(this.state.projectData))
    );
    return sortedCategories;
  }
  filterCategory(category) {
    console.log('Filtering Category', category);
    if(category === 'All') {
      this.setState({
        'filterCategories': new Set(this.getSortedCategories())
      });
    } else {
      this.setState({
        'filterCategories': new Set([category])
      });
    }
  }
  getCategorySidebar() {
    let categories = ["All"].concat(this.getSortedCategories());
    let getAnchorForCategories = categories.map((category, index) => {
      let filterCategory = this.filterCategory.bind(this, category);
      return (
        <Tile key={index}>
          <Anchor key={index} onClick={filterCategory}>
              {category}
          </Anchor>
        </Tile>
      );
    });
    return (
      <Tiles fill={true}>
        <Tile>
          <Heading tag="h4" align="start" strong={true}>
            Categories:
          </Heading>
        </Tile>
        {getAnchorForCategories}
      </Tiles>);
  }
  getProjects() {
    let groupByCategories = R.groupBy(R.prop('category'));
    let sortedCategories = this.getSortedCategories();
    let filteredCategories = sortedCategories.filter((data) => {
      return this.state.filterCategories.has(data);
    });
    let categoryBasedProjects = groupByCategories(this.state.projectData);
    let getProject = ((project, index) => {
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
    let getCategoryBasedProjectList = ((category, index) => {
      return (
        <Section key={category}>
          {categoryBasedProjects[category].map(getProject)}
        </Section>
      );
    });
    return filteredCategories.map(getCategoryBasedProjectList);
  }
  render() {
    return (
      <Article>
        <Section>
          {/*<Box*/}
          {/*  margin='small'*/}
          {/*  align='start'>*/}
          {/*  {this.getCategorySidebar()}*/}
          {/*</Box>*/}
          <Box
            justify='center'>
              {this.getProjects()}
          </Box>
        </Section>
      </Article>
    );
  }
}
