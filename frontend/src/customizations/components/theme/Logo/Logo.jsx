/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import { LogoSVG } from '@package/components/theme/Logo/LogoSVG';
import { SmallLogoSVG } from '@package/components/theme/SmallLogo/SmallLogoSVG';
import { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  site: {
    id: 'Site',
    defaultMessage: 'Site',
  },
  plonesite: {
    id: 'Plone Site',
    defaultMessage: 'Plone Site',
  },
});

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = (props) => {
  const { style = {} } = props;
  const intl = useIntl();

  const [smallLogo, setSmallLogo] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(min-width: 530px)');
      const handler = (e) => setSmallLogo(!e.matches);

      setSmallLogo(!mediaQuery.matches);
      mediaQuery.addEventListener('change', handler);

      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  return smallLogo ? (
    <SmallLogoSVG title={intl.formatMessage(messages.plonesite)} {...style} />
  ) : (
    <LogoSVG title={intl.formatMessage(messages.plonesite)} {...style} />
  );
};

export default Logo;
