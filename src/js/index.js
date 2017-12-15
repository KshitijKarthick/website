import '../scss/index.scss';

import { Link, Route, Router, browserHistory } from 'react-router';
import React, { Component } from 'react';

import AboutSection from './components/AboutSection';
import Anchor from 'grommet/components/Anchor';
import App from 'grommet/components/App';
import BlogSection from './components/BlogSection';
import Footer from 'grommet/components/Footer';
import Header from 'grommet/components/Header';
import HomeSection from './components/HomeSection';
import Menu from 'grommet/components/Menu';
import ProjectSection from './components/ProjectSection';
import SocialGithub from 'grommet/components/icons/base/SocialGithub';
import SocialLinkedin from 'grommet/components/icons/base/SocialLinkedin';
import SocialTwitter from 'grommet/components/icons/base/SocialTwitter';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Title from 'grommet/components/Title';
import { render } from 'react-dom';

class Main extends Component {
  render () {
    return (
      <App centered={false}>
        <Header direction="row" justify="between" size="medium"
          pad={{horizontal: 'medium'}} colorIndex="light-2">
          <Title>Kshitij Karthick</Title>
          <Menu direction="row" align="center" responsive={true}>
            <Link to="/">Home</Link>
            <Link to="/project">Projects</Link>
            <Link to="/about">About Me</Link>
            <Link to="/blog">Blog Articles</Link>
          </Menu>
        </Header>
        {this.props.children || <HomeSection />}
        <Footer justify='center'
          size='medium' colorIndex="light-2" fixed={true}>
            <Tiles fill={true} flush={true}>
              <Tile size="small">
                <Anchor target="_blank" icon={
                  <SocialGithub/ >
                } href="https://github.com/kshitijkarthick" />
              </Tile>
              <Tile size="small">
                <Anchor target="_blank" icon={
                  <SocialLinkedin/ >
                } href="https://in.linkedin.com/in/kshitijkarthick" />
              </Tile>
              <Tile size="small">
                <Anchor target="_blank" icon={
                  <SocialTwitter/ >
                } href="https://twitter.com/kshitijkarthick" />
              </Tile>
            </Tiles>
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
