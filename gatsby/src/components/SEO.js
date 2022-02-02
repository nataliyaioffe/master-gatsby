import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO({ children, location, description, title, image }) {
  // Since we are not querying at a page level, we must use static query
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);

  return (
    //   Automatically append "Slick's Slices" at the end of all titles
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      {/* Browser knows which language your site is in */}
      <html lang="en" />

      <title>{title}</title>

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* fallback favicon */}
      <link rel="alternate icon" href="/favicon.ico" />

      {/* Metatags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />

      {/* Open Graph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || 'logo/svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />

      {/* In case we add additional tags for a page, or overwrite a title tag... etc */}
      {children}
    </Helmet>
  );
}
