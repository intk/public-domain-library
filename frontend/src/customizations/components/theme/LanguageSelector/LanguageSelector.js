/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accordion } from 'semantic-ui-react';

import cx from 'classnames';
import { find, map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import {
  Helmet,
  flattenToAppURL,
  langmap,
  normalizeLanguageName,
} from '@plone/volto/helpers';

import config from '@plone/volto/registry';

import { changeLanguage } from '@plone/volto/actions';

import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  switchLanguageTo: {
    id: 'Switch to',
    defaultMessage: 'Switch to',
  },
});

const LanguageSelector = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.intl.locale);
  const translations = useSelector(
    (state) => state.content.data?.['@components']?.translations?.items,
  );
  const { settings } = config;

  const AvailableLanguages = ({ elements }) => (
    <>
      {map(elements, (lang) => {
        const translation = find(translations, { language: lang });
        return (
          <Link
            aria-label={`${intl.formatMessage(
              messages.switchLanguageTo,
            )} ${langmap[lang].nativeName.toLowerCase()}`}
            className={cx({ selected: lang === currentLang })}
            to={translation ? flattenToAppURL(translation['@id']) : `/${lang}`}
            title={langmap[lang].nativeName}
            onClick={() => {
              props.onClickAction();
              if (config.settings.supportedLanguages.includes(lang)) {
                const langFileName = normalizeLanguageName(lang);
                import('~/../locales/' + langFileName + '.json').then(
                  (locale) => {
                    dispatch(changeLanguage(lang, locale.default));
                  },
                );
              }
            }}
            key={`language-selector-${lang}`}
          >
            {lang}
          </Link>
        );
      })}
    </>
  );

  const languageSelectorAccordion = [
    {
      key: currentLang,
      title: {
        content: currentLang,
      },
      content: {
        content: <AvailableLanguages elements={settings.supportedLanguages} />,
      },
    },
  ];

  return settings.isMultilingual ? (
    <div className="language-selector">
      <Accordion panels={languageSelectorAccordion} />
    </div>
  ) : (
    <Helmet>
      <html lang={settings.defaultLanguage} />
    </Helmet>
  );
};

LanguageSelector.propTypes = {
  onClickAction: PropTypes.func,
};

LanguageSelector.defaultProps = {
  onClickAction: () => {},
};

export default LanguageSelector;
