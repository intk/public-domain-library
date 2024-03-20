/* eslint-disable no-unused-vars */
/**
 * Header component.
 * @module components/theme/Header/Header
 */

import {
  LanguageSelector,
  Logo,
  Navigation,
  UniversalLink,
} from '@plone/volto/components';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

const headertranslations = {
  ebooks: {
    en: 'Ebooks',
    nl: 'Eboeken',
  },
  ebooks_link: {
    en: '/en/ebooks',
    nl: '/nl/ebooks',
  },
  authors: {
    en: 'Authors',
    nl: 'Auteurs',
  },
  authors_link: {
    en: '/en/authors',
    nl: '/nl/authors',
  },
};

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
 * Header component class.
 * @class Header
 * @extends Component
 */
class Header extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    content: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      preview_image: PropTypes.any,
      youtube_id: PropTypes.any,
      preview_caption: PropTypes.any,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    content: null,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Segment basic className={`header-wrapper`}>
        <Menu inverted borderless className="fixed-navigation">
          <Menu.Item header>
            <UniversalLink
              // normally the link is /${props.lang}
              href={`/${this.props.lang}`}
              target="_self"
              key="homelinklogo"
              id="menu-logo-link"
            >
              <Logo
                style={{
                  id: 'menu-logo-svg',
                }}
              />
            </UniversalLink>
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>
              <NavLink
                to={headertranslations['ebooks_link'][this.props.lang]}
                key={headertranslations['ebooks_link'][this.props.lang]}
              >
                {headertranslations['ebooks'][this.props.lang]}
              </NavLink>
              <NavLink
                to={headertranslations['authors_link'][this.props.lang]}
                key={headertranslations['authors_link'][this.props.lang]}
              >
                {headertranslations['authors'][this.props.lang]}
              </NavLink>
            </Menu.Item>
            <Menu.Item className="item-language-selector">
              <LanguageSelector />
            </Menu.Item>
            <Menu.Item className="item-hamburger no-padding-right no-padding-left">
              <Navigation pathname={this.props.pathname} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
  content: state.content.data,
  lang: state.intl.locale,
  navItems: state.navigation.items,
  items: state.breadcrumbs.items,
  root: state.breadcrumbs.root,
  itemsN: state.navigation.items,
}))(Header);
