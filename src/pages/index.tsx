/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import '../components/App.css';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import queryString from 'query-string';

import SignupForm from '../components/SignupForm';
import Banner from '../components/Banner';
import { InstaLogo } from '../components/icons/InstaLogo';
import { TwitterLogo } from '../components/icons/TwitterLogo';
import { FacebookLogo } from '../components/icons/FacebookLogo';
import { EmailLogo } from '../components/icons/EmailLogo';

const baseClass = 'App';

const App: React.FC = (location: any) => {
  // console.log(
  //   'env vars',
  //   process.env.GATSBY_CONTEXT,
  //   process.env.GATSBY_DEPLOY_URL,
  //   process.env.GATSBY_NETLIFY,
  // );

  const data = useStaticQuery(graphql`
    query MyQuery {
      mario: file(relativePath: { eq: "mario-noir.jpg" }) {
        childImageSharp {
          fixed(height: 400) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      josh: file(relativePath: { eq: "josh-noir.jpg" }) {
        childImageSharp {
          fixed(height: 400) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      dan: file(relativePath: { eq: "dan-noir.jpg" }) {
        childImageSharp {
          fixed(height: 400) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      mike: file(relativePath: { eq: "mike-noir.jpg" }) {
        childImageSharp {
          fixed(height: 400) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      logo: file(relativePath: { eq: "electric-neil-logo2.png" }) {
        childImageSharp {
          fixed(width: 350) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      fb: file(relativePath: { eq: "fb.png" }) {
        childImageSharp {
          fixed(height: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      twit: file(relativePath: { eq: "twit.png" }) {
        childImageSharp {
          fixed(height: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      email: file(relativePath: { eq: "email.png" }) {
        childImageSharp {
          fixed(height: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const {
    unsubscribe: unsubscriberId,
    subscribe: subscriberId,
  } = queryString.parse(location.location.search);

  const [isClient, setClient] = useState(false);
  const key = isClient ? 'client' : 'server';

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className="App">
      {isClient && subscriberId && (
        <Banner
          key={key}
          subscriberId={subscriberId as string}
          type="subscribe"
        />
      )}
      {isClient && unsubscriberId && (
        <Banner
          key={key}
          subscriberId={subscriberId as string}
          type="unsubscribe"
        />
      )}
      <a href="https://www.instagram.com/electric.neil/" target="_blank">
        <Img
          className={`${baseClass}__logo`}
          fixed={data.logo.childImageSharp.fixed}
        />
      </a>
      {/* <hr
        style={{
          borderTop: '1px solid grey',
          maxWidth: '75%',
          margin: '0 auto',
        }}
      /> */}
      <div className={`${baseClass}__band-pics`}>
        <div className={`${baseClass}__band-pics-closeup--landscape`}>
          <Img fixed={data.mario.childImageSharp.fixed} alt="The Homie" />
        </div>

        <div className={`${baseClass}__band-pics-closeup`}>
          <Img fixed={data.josh.childImageSharp.fixed} alt="The Homie" />
        </div>

        <div className={`${baseClass}__band-pics-closeup`}>
          <Img fixed={data.dan.childImageSharp.fixed} alt="The Homie" />
        </div>

        <div className={`${baseClass}__band-pics-closeup`}>
          <Img fixed={data.mike.childImageSharp.fixed} alt="The Homie" />
        </div>
      </div>

      <SignupForm />

      <div className={`${baseClass}__links`}>
        <div
          className={`${baseClass}__link-item, ${baseClass}__link-item--middle`}
        >
          <iframe
            title="soundcloud"
            // style={{ maxWidth: '450px', minWidth: '300px' }}
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/327074774&color=%23ff5500&auto_play=false&sharing=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=false&buying=false&liking=false&download=false&show_comments=false&show_playcount=false&show_user=false"
          />
        </div>
      </div>

      <div className={`${baseClass}__links`}>
        <div className={`${baseClass}__link-item`}>
          <a href="https://instagram.com/electric.neil" target="_blank">
            <InstaLogo />
          </a>
        </div>

        <div className={`${baseClass}__link-item`}>
          <a href="https://www.facebook.com/ElectricNeil/" target="_blank">
            <FacebookLogo />
          </a>
        </div>

        <div className={`${baseClass}__link-item`}>
          <a href="https://twitter.com/electric_neils" target="_blank">
            <TwitterLogo />
          </a>
        </div>

        <div className={`${baseClass}__link-item`}>
          <a href="mailto:neil@electricneil.com">
            <EmailLogo />
          </a>
        </div>
      </div>

      <div className={`${baseClass}__footer`}>
        <div className={`${baseClass}__footer-item`}>
          <span>
            Logo by{' '}
            <a href="https://benjaminstillman.com/" target="_blank">
              Benjamin&nbsp;Stillman
            </a>
          </span>
        </div>

        <div className={`${baseClass}__footer-item`}>
          <span>
            Photos by{' '}
            <a href="http://topolino500.com/" target="_blank">
              Bernard&nbsp;Bluhm
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
