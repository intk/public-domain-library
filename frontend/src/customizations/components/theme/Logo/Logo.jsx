/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import { LogoSVG } from '@package/components/theme/Logo/LogoSVG';
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

  return <LogoSVG title={intl.formatMessage(messages.plonesite)} {...style} />;
};

export default Logo;
