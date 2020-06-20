module.exports = {
  title: 'Deepak Giri',
  tagline: 'Find out more about me below',
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
        src: 'img/logo.svg',
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
              href: 'https://linkedin.com/in/deepakgiri/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/dpkg'
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
              href: 'https://twitter.com/dpkg0',
            },
            {
              label: 'Instagram',
              href: 'https://instagr.am/dpkg',
            },
            // {
            //   label: 'YouTube',
            //   href: 'https://youtube.com/+DeepakGiri'
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
      copyright: `Copyright © ${new Date().getFullYear()} Deepak Giri. Built with Docusaurus v2.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/dpkg/dpkg.github.io.source/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
