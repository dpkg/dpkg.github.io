import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
// import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { urls } from '../../personal.config.json';

const features = [
  {
    title: <>Twitter</>,
    imageUrl: 'img/twitter.svg',
    url: urls.Twitter,
    description: (
      <>
        Not a regular tweeter, but if you want to follow my occasional updates.
      </>
    )
  },
  {
    title: <>LinkedIn</>,
    imageUrl: 'img/linkedin.svg',
    url: urls.LinkedIn,
    description: (
      <>
        Check me out on here to find out more about my professional background
        and the kind of work I have been doing.
      </>
    )
  },
  {
    title: <>GitHub</>,
    imageUrl: 'img/github.svg',
    url: urls.GitHub,
    description: (
      <>
        You'll not find too many contributions on my public profile,
        I mostly commit behind my corporate organizational accounts.
      </>
    )
  },
  {
    title: <>Telegram</>,
    imageUrl: 'img/telegram.svg',
    url: urls.Telegram,
    description: (
      <>
        If you want to reach me instantly.
      </>
    )
  }
];

function Feature({imageUrl, title, description, url}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--3', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
            <a href={url || '#'} target={url ? '_blank' : '_self'}>
                <img className={styles.featureImage} src={imgUrl} alt={title} />
            </a>
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Deepak Giri's Personal Website">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          {/*<div className={styles.buttons}>*/}
          {/*  <Link*/}
          {/*    className={classnames(*/}
          {/*      'button button--outline button--secondary button--lg',*/}
          {/*      styles.getStarted,*/}
          {/*    )}*/}
          {/*    to={useBaseUrl('blog/')}>*/}
          {/*    Read my blog*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
