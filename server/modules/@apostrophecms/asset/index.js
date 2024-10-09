module.exports = {
  options: {
    refreshOnRestart: false,
    breakpointPreviewMode: {
      enable: true,
      debug: process.env.NODE_ENV === 'development',
      screens: {
        desktop: {
          label: 'Large Desktop - 1920px (to be used if testing on a larger screen)',
          width: '1920px',
          height: '1200px',
          icon: 'desktop-icon',
        },
        desktop1: {
          label: 'Standard Desktop - 1440px',
          width: '1440px',
          height: '900px',
          icon: 'monitor-icon',
        },
        laptop: {
          label: 'Laptop - 1220px',
          width: '1220px',
          height: '896px',
          icon: 'laptop-icon',
        },
        tablet: {
          label: 'Horizontal Tablet - 1024px',
          width: '1024px',
          height: '768px',
          icon: 'tablet-icon',
        },
        tablet1: {
          label: 'Vertical Tablet - 768px',
          width: '768px',
          height: '1024px',
          icon: 'tablet-rotate-icon',
        },
        mobile: {
          label: 'Mobile - 415px',
          width: '415px',
          height: '896px',
          icon: 'cellphone-icon',
        },
      },
    },
  },
  icons: {
    'desktop-icon': 'DesktopMac',
    'laptop-icon': 'Laptop',
    'tablet-rotate-icon': 'PhoneRotateLandscape',
  },
}
