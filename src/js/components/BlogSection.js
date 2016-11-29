import React, { Component } from 'react';
import Card from 'grommet/components/Card';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Scorecard from 'grommet/components/icons/base/Scorecard';

export default class BlogSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      blogData: [
        {
          tag: '',
          title: 'Measuring Semantic Relatedness Across Languages',
          content: '',
          description: 'Provide capability to find semantically related words across languages in a agnostic way. Given a word in language 1, you can find semantically related words in language 2. The model can be used to obtain a semantic distance measure for words across languages.',
          creationDate: ''
        },
        {
          tag: '',
          title: 'Measuring Semantic Relatedness Across Languages',
          content: '',
          description: 'Provide capability to find semantically related words across languages in a agnostic way. Given a word in language 1, you can find semantically related words in language 2. The model can be used to obtain a semantic distance measure for words across languages.',
          creationDate: ''
        }
      ]
    };
  }
  getBlogHTML() {
    return this.state.blogData.map((article, index) => {
      return (
        <Card size="xxlarge"
        label={article.tag}
        key={index}
        heading={article.title}>
          <Paragraph size="large">{article.description}</Paragraph>
        </Card>
      );
    });
  }
  render() {
    return (
      <Section id="Blog" pad={{between: 'medium', vertical: 'small'}}>
        <Header justify="between">
          <Heading tag="h2">
            < Scorecard /> Blog
          </Heading>
        </Header>
        {this.getBlogHTML()}
      </Section>
    );
  }
}
