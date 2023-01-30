import { graphql, useStaticQuery } from "gatsby";

interface SEOProps {
  title: string;
}

const SEO = (props: SEOProps) => {
  const { title } = props;
  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          description
          lang
          keywords
          author
        }
      }
    }
  `);

  const { description, lang, keywords, author } = site.siteMetadata;

  return (
    <>
      <title lang={lang}>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={author} />
      <script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      />
      <style type="text/css">
        {`body {
          margin: 0;
        }`}
      </style>
    </>
  );
};

export default SEO;
