import React, { Component } from 'react';
import Card from 'grommet/components/Card';
import Layer from 'grommet/components/Layer';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Scorecard from 'grommet/components/icons/base/Scorecard';
import ArticleIcon from 'grommet/components/icons/base/Article';

export default class BlogSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      blogData: [
        {
          tag: '',
          title: 'Measuring Semantic Relatedness Across Languages',
          content: [
            'Provide capability to find semantically related words across languages in a agnostic way.',
            'Given a word in language 1, you can find semantically related words in language 2.',
            'The model can be used to obtain a semantic distance measure for words across languages.'
          ],
          description: [
            'Provide capability to find semantically related words across languages in a agnostic way.',
            'Given a word in language 1, you can find semantically related words in language 2.',
            'The model can be used to obtain a semantic distance measure for words across languages.'
          ],
          creationDate: '27th Jan 2016',
          hidden: true
        },
        {
          tag: '',
          title: 'Measuring Semantic Relatedness Across Languages',
          content: [
            'Provide capability to find semantically related words across languages in a agnostic way.',
            'Given a word in language 1, you can find semantically related words in language 2.',
            'The model can be used to obtain a semantic distance measure for words across languages.'
          ],
          description: [
            'Provide capability to find semantically related words across languages in a agnostic way.',
            'Given a word in language 1, you can find semantically related words in language 2.',
            'The model can be used to obtain a semantic distance measure for words across languages.'
          ],
          creationDate: '28th Jan 2015',
          hidden: true
        }
      ]
    };
  }
  showArticle(event) {
    debugger;
    var that = this.this;
    that.state.blogData[this.index].hidden = !that.state.blogData[this.index].hidden;
    that.setState({blogData: that.state.blogData});
  }
  getParagraphs(data, size) {
    return data.map((article, index) => {
      return (
        <Paragraph key={index} size={size}>{article}</Paragraph>
      );
    });
  }
  getBlogHTML() {
    return this.state.blogData.map((article, index) => {
      return (
        <Card size='xxlarge'
        label={article.tag}
        key={index}
        heading={article.title}>
          <Paragraph size='small'>{article.creationDate}</Paragraph>
          {this.getParagraphs(article.description, 'medium')}
          <Anchor
            label='Read full article here.' icon={<ArticleIcon/ >}
            onClick={this.showArticle.bind({index: index, this: this})}
          />
          <Layer closer={true} hidden={article.hidden} align='left'
            onClose={this.showArticle.bind({index: index, this: this})}>
            <Article>
              <Section>
                <Header tag='h3'>{article.title}</Header>
                {this.getParagraphs(article.content, 'small')}
              </Section>
            </Article>
          </Layer>
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
