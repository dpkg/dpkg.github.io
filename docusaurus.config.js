const { urls } = require('./personal.config.json');

module.exports = {
  title: 'Deepak Giri',
  tagline: 'The perfect place to find out more about me',
  url: 'https://dpkg.in',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'dpkg', // Usually your GitHub org/user name.
  projectName: 'dpkg.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Deepak Giri',
      logo: {
        alt: 'Deepak Giri\'s Logo',
        src: 'img/deepakgiri.svg',
      },
      links: [
        { label: 'Blog', position: 'left', to: 'blog' },
        { label: 'GitHub', position: 'right', href: 'https://github.com/dpkg/dpkg.github.io'},
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
              href: urls.LinkedIn,
            },
            {
              label: 'GitHub',
              href: urls.GitHub
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
              href: urls.Twitter,
            },
            {
              label: 'Instagram',
              href: urls.Instagram,
            },
            // {
            //   label: 'YouTube',
            //   href: urls.YouTube
            // }
          ],
        },
        {
          title: 'Recommended',
          items: [
            {
              label: 'MKBHD @ YouTube',
              to: 'https://www.youtube.com/user/marquesbrownlee/videos',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Deepak Giri &nbsp;&nbsp;|&nbsp;&nbsp; Built with Docusaurus.v2`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: urls.GitHubBlogEditBase,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ]
};
