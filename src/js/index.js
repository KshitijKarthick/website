import '../scss/index.scss';

import { render } from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';
import Box from 'grommet/components/Box';
import App from 'grommet/components/App';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Anchor from 'grommet/components/Anchor';
import HomeSection from './components/HomeSection';
import BlogSection from './components/BlogSection';
import Paragraph from 'grommet/components/Paragraph';
import AboutSection from './components/AboutSection';
import ProjectSection from './components/ProjectSection';
import SocialGithub from 'grommet/components/icons/base/SocialGithub';
import SocialTwitter from 'grommet/components/icons/base/SocialTwitter';
import SocialLinkedin from 'grommet/components/icons/base/SocialLinkedin';

class Main extends Component {
  render () {
    return (
      <App centered={false}>
        <Header direction="row" justify="between" size="small" fixed={true}
          pad={{horizontal: 'medium'}} colorIndex="light-2">
          <Title>Kshitij Karthick</Title>
          <Menu direction="row" align="center" responsive={true}>
            <Link to="/">Home</Link>
            <Link to="/project">Project</Link>
            <Link to="/about">About Me</Link>
            <Link to="/blog">Blog</Link>
          </Menu>
        </Header>
        <Box pad={{vertical: 'large', horizontal: 'medium', between: 'small'}}>
          {this.props.children || <HomeSection />}
        </Box>
        <Footer primary={true} appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <Paragraph align='center'>
            Built by Kshitij Karthick, Copyright 2016
          </Paragraph>
          <Menu direction="row" responsive={false}>
            <Anchor align="end" target="_blank" icon={
              <SocialGithub/ >
            } href="https://github.com/kshitijkarthick" />
            <Anchor align="end" target="_blank" icon={
              <SocialLinkedin/ >
            } href="https://in.linkedin.com/in/kshitijkarthick" />
            <Anchor align="end" target="_blank" icon={
              <SocialTwitter/ >
            } href="https://twitter.com/kshitijkarthick" />
          </Menu>
        </Footer>
      </App>
    );
  }
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="about" component={AboutSection}/>
      <Route path="project" component={ProjectSection}/>
      <Route path="blog" component={BlogSection}/>
    </Route>
    <Route path="*" component={Main}/>
  </Router>
), document.getElementById('content'));

document.body.classList.remove('loading');
