from plone import api
from Products.CMFPlone.interfaces import INonInstallable
from public_domain_library import logger
from public_domain_library.setuphandlers import content
from public_domain_library.setuphandlers import users
from zope.interface import implementer


@implementer(INonInstallable)
class HiddenProfiles(object):
    def getNonInstallableProfiles(self):
        """Hide uninstall profile from site-creation and quickinstaller."""
        return [
            "public_domain_library:uninstall",
        ]


def populate_portal(context):
    """Post install script"""
    portal = api.portal.get()
    # Delete content
    content.delete_content(portal)
    logger.info("Deleted default portal content")
    user = users.create_default_user()
    creators = [user.id]
    logger.info("Created default user")
    # Create other users
    users.create_team_accounts()
    logger.info("Created team accounts")
    # Create Initial content
    content.populate_portal(portal, creators)
    logger.info("Created initial content")
    # Update cover content
    content.update_home(portal, creators)
