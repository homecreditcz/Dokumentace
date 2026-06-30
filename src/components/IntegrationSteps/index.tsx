import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

const STEP_ICONS = ['📊', '🛒', '🔔', '📦'];

function Step({
  step,
  titleId,
  titleDefault,
  descId,
  descDefault,
  compact = false,
}: {
  step: number;
  titleId: string;
  titleDefault: string;
  descId: string;
  descDefault: string;
  compact?: boolean;
}) {
  return (
    <div className={styles.stepCard} data-step={step}>
      <div className={styles.stepNumber}>{step}</div>
      <div className={styles.stepIcon}>{STEP_ICONS[step - 1]}</div>
      <h3 className={styles.stepTitle}>
        <Translate id={titleId} description={titleId}>
          {titleDefault}
        </Translate>
      </h3>
      {!compact && (
        <p className={styles.stepDesc}>
          <Translate id={descId} description={descId}>
            {descDefault}
          </Translate>
        </p>
      )}
    </div>
  );
}

type IntegrationStepsProps = {
  compact?: boolean;
  showCta?: boolean;
  docPath?: string;
};

export default function IntegrationSteps({
  compact = false,
  showCta = false,
  docPath = '/docs/documentation',
}: IntegrationStepsProps): ReactNode {
  return (
    <div className={styles.root} data-compact={compact ? 'true' : undefined}>
      <div className={styles.stepsFlow}>
        <Step
          step={1}
          titleId="integration.steps.calculator.title"
          titleDefault="Calculator"
          descId="integration.steps.calculator.desc"
          descDefault="Show installments on product page — API, Widget, or link"
          compact={compact}
        />
        <div className={styles.connector} aria-hidden="true" />
        <Step
          step={2}
          titleId="integration.steps.create.title"
          titleDefault="Create application"
          descId="integration.steps.create.desc"
          descDefault="Create via API, redirect customer to complete"
          compact={compact}
        />
        <div className={styles.connector} aria-hidden="true" />
        <Step
          step={3}
          titleId="integration.steps.notifications.title"
          titleDefault="Notifications"
          descId="integration.steps.notifications.desc"
          descDefault="Get status updates — endpoint, API, or webclient"
          compact={compact}
        />
        <div className={styles.connector} aria-hidden="true" />
        <Step
          step={4}
          titleId="integration.steps.fulfillment.title"
          titleDefault="Fulfillment"
          descId="integration.steps.fulfillment.desc"
          descDefault="Confirm shipped/delivered via API or webclient"
          compact={compact}
        />
      </div>
      {showCta && (
        <div className={styles.cta}>
          <Link className={styles.ctaLink} to={docPath}>
            <Translate id="integration.cta" description="CTA to docs">
              See integration guide
            </Translate>
            <span className={styles.ctaArrow}>→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
