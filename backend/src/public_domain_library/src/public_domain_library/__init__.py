"""Init and utils."""
from zope.i18nmessageid import MessageFactory

import logging


PACKAGE_NAME = "public_domain_library"

_ = MessageFactory("public_domain_library")

logger = logging.getLogger("public_domain_library")
