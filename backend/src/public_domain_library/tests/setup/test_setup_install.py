from public_domain_library import PACKAGE_NAME


class TestSetupInstall:
    def test_addon_installed(self, installer):
        """Test if public_domain_library is installed."""
        assert installer.is_product_installed(PACKAGE_NAME) is True

    def test_browserlayer(self, browser_layers):
        """Test that IPublicDomainLibraryLayer is registered."""
        from public_domain_library.interfaces import IPublicDomainLibraryLayer

        assert IPublicDomainLibraryLayer in browser_layers

    def test_latest_version(self, profile_last_version):
        """Test latest version of default profile."""
        assert profile_last_version(f"{PACKAGE_NAME}:default") == "20240312001"
