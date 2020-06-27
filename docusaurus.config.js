const { name, email, statusEmoji, urls, config, recommended } = require('./personal.config.json');

module.exports = {
  title: name,
  tagline: 'The perfect place to find out more about me',
  //url: `https://${config.gitHub.user}.github.io`,
  url: urls.home,
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: config.gitHub.user, // Usually your GitHub org/user name.
  projectName: `${config.gitHub.user}.github.io`, // Usually your repo name.
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-59474078-1',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
    navbar: {
      title: `${name} ${statusEmoji}`,
      logo: {
        alt: `${name}\'s Logo`,
        src: 'img/deepakgiri.svg',
      },
      links: [
        { label: 'Blog', position: 'left', to: 'blog' },
        { label: 'Contact', position: 'left', href: `mailto:${email}?subject=Mail from ${name}'s homepage`, className: 'contact-link' },
        { label: 'GitHub', position: 'right', href: `https://github.com/${config.gitHub.user}/${config.gitHub.user}.github.io/tree/develop`},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Professional',
          items: [
            {
              label: 'LinkedIn',
              href: urls.linkedIn,
            },
            {
              label: 'GitHub',
              href: urls.gitHubUser
            },
            {
              label: 'Blog',
              to: 'blog',
            }
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/users/1384048/dpkg',
            // }
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Twitter',
              href: urls.twitter,
            },
            {
              label: 'Instagram',
              href: urls.instagram,
            },
            // {
            //   label: 'YouTube',
            //   href: urls.YouTube
            // }
          ],
        },
        {
          title: 'Recommended',
          items: recommended || [],
        },
      ],
      copyright: `<span class="personal-footer">Copyright © ${new Date().getFullYear()} ${name}</span><br/><span class="docusaurus-footer">Powered by Docusaurus</span>`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: urls.gitHubPagesDocusaurusBlogEditBase,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // Will be passed to @docusaurus/plugin-content-sitemap
        sitemap: {
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'weekly',
          priority: 0.5,
        }
      }
    ]
  ]
};
