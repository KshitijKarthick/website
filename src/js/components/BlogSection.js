import React, { Component } from 'react';
import Card from 'grommet/components/Card';
import Layer from 'grommet/components/Layer';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import ArticleIcon from 'grommet/components/icons/base/Article';
import blogs from '../data/blogs';

export default class BlogSection extends Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      blogData: blogs.blogList
    };
  }
  showArticle(event) {
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
        <Section>
          <Card size='xxlarge'
          label={article.tag}
          key={index}
          heading={article.title}>
            <Paragraph size='small'>{article.creationDate}</Paragraph>
            {this.getParagraphs(article.description, 'large')}
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
        </Section>
      );
    });
  }
  render() {
    return (
        <Article pad={{between: 'none'}}>
          {this.getBlogHTML()}
        </Article>
    );
  }
}
