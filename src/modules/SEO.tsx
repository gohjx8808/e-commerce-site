import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => {
  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          lang
          keywords
          author
        }
      }
    }`);

  const {
    title,
    titleTemplate,
    description,
    lang,
    keywords,
    author,
  } = site.siteMetadata;

  return (
    <Helmet
      title={title}
      titleTemplate={titleTemplate}
      htmlAttributes={{ lang }}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: author || '',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ]}
    >
      <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js" />
      <style type="text/css">
        {`body {
          margin: 0;
        }`}
      </style>
    </Helmet>
  );
};

export default SEO;
