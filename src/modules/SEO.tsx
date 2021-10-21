import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl: url
          image
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
    siteUrl,
    image,
    lang,
    keywords,
    author,
  } = site.siteMetadata;

  const seo = {
    title,
    description,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet
      title={seo.title}
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
      <style type="text/css">
        {`body {
          margin: 0;
        }`}
      </style>
    </Helmet>
  );
};

export default SEO;
