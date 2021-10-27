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
      <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js" />
      <style type="text/css">
        {`body {
          margin: 0;
        }
        .fb-customerchat { 
          position: absolute;
          left: 0;
          bottom: 0;
        }`}
      </style>
    </Helmet>
  );
};

export default SEO;
