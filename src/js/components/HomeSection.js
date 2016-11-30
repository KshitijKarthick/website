import React, { Component } from 'react';
import Hero from 'grommet/components/Hero';

export default class HomeSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
  }
  render() {
    return (
      <div>
      <Hero size="small" colorIndex="light-2" backgroundImage="/img/science_white.jpg"/>
      </div>
    );
  }
}
