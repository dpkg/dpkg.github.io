const { name, email, statusEmoji, urls, config, recommended } = require('./persona.config.json');

module.exports = {
  title: name,
  tagline: 'The perfect place to find out more about me',
  //url: `https://${config.gitHub.user}.github.io`,
  url: urls.home,
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: config.gitHub.user, // Usually your GitHub org/user name.
  projectName: `${config.gitHub.user}.github.io`, // Usually your repo name.
  deploymentBranch: 'master',
  themeConfig: {
    navbar: {
      title: `${name} ${statusEmoji}`,
      logo: {
        alt: `${name}\'s Logo`,
        src: 'img/deepakgiri.svg',
      },
      items: [
        { label: 'Blog', position: 'left', to: 'blog' },
        { label: 'Contact', position: 'right', href: `mailto:${email}?subject=Mail from ${name}'s homepage`, className: 'contact-link' },
        { label: 'GitHub', position: 'right', href: `https://github.com/${config.gitHub.user}/${config.gitHub.user}.github.io/tree/develop`, className: 'contact-link'},
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
              label: 'Tech Blog',
              to: 'blog',
              // to: 'blog/tags/technology',
            },
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
              label: 'Strava',
              href: urls.strava,
            },{
              label: 'Instagram',
              href: urls.instagram,
            },
            {
              label: 'Twitter',
              href: urls.twitter,
            },
            {
              label: 'Not Tech',
              to: 'blog/tags/general',
            },
            // {
            //   label: 'YouTube',
            //   href: urls.YouTube
            // }
          ],
        },
        {
          title: 'Tools',
          items: [
            {
              label: 'QR Code Gen',
              to: 'qrcode',
            },
            {
              label: 'Markdown to HTML Preview',
              to: 'markdown-preview',
            },
//            {
//              label: 'Plain QR Code',
//              to: 'qrcode-plain',
//            },
          ],
        },
        {
          title: 'Recommended',
          items: recommended || [],
        },
      ],
      copyright: `<span class="personal-footer">Copyright © ${new Date().getFullYear()} ${name}</span><br/><span class="docusaurus-footer">Powered by GitHub & Docusaurus</span>`,
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-WVR5MF23DZ',
        anonymizeIP: true,
      },
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: urls.gitHubPagesDocusaurusBlogEditBase,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} ${name}`
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        // Will be passed to @docusaurus/plugin-content-sitemap
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        }
      }
    ]
  ]
};
