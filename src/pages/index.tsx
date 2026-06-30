import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import IntegrationSteps from '../components/IntegrationSteps';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrb}></div>
        <div className={styles.gradientOrb}></div>
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            <Translate id="homepage.title" description="The homepage title">
              Home Credit Developer Documentation
            </Translate>
          </Heading>
          <p className={styles.heroSubtitle}>
            <Translate id="homepage.tagline" description="The homepage tagline">
              Simple integration in four steps—your e-shop, your choices. REST API, widget, or link we guide you through.
            </Translate>
          </p>
          <div className={styles.heroButtons}>
            <Link
              className={styles.heroButton}
              to="/docs/documentation">
              <Translate id="homepage.button" description="The button to proceed to docs">
                Get Started
              </Translate>
              <svg
                className={styles.buttonIcon}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'homepage.metaTitle',
        message: 'Welcome to Home Credit Developer Documentation',
        description: 'The homepage meta title'
      })}
      description="Integrate your ecommerce system with Home Credit easily and provide your customers with a seamless payment experience.">
      <HomepageHeader />
      <main>
        <section className={styles.integrationSection}>
          <div className="container">
            <Heading as="h2" className={styles.integrationHeading}>
              <Translate id="homepage.integration.heading" description="Integration is simple heading">
                Integration is simple
              </Translate>
            </Heading>
            <p className={styles.integrationSubheading}>
              <Translate id="homepage.integration.subheading" description="Integration steps subheading">
                Four steps, your choices—from full API control to minimal integration.
              </Translate>
            </p>
            <IntegrationSteps showCta docPath="/docs/documentation" />
          </div>
        </section>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
