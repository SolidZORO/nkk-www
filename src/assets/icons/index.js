const path = require('path');

module.exports = {
  icons: [
    {
      id: 'li',
      name: 'LocalIcon',
      contents: [
        {
          files: path.resolve(__dirname, './li/*.svg'),
          formatter: (name) => `Li${name}`,
        },
      ],
      license: 'MIT',
      projectUrl: 'https://li.local',
      licenseUrl: 'https://li.local',
    },
  ],
};
