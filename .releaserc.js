'use strict';

const config = {
  preset: 'angular',
  branches: [
    {
      name: 'main',
    },
    {
      name: 'next',
      channel: 'next',
      prerelease: 'rc',
    },
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'build', release: false },
          { type: 'ci', release: false },
          { type: 'chore', release: false },
          { type: 'chore', scope: 'dependencies', release: 'patch' },
          { type: 'docs', release: false },
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: false },
          { type: 'test', release: false },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'build', section: 'CI/CD Pipelines', hidden: false },
            { type: 'ci', section: 'CI/CD Pipelines', hidden: false },
            { type: 'chore', section: 'Miscellaneous Chores', hidden: true },
            { type: 'chore', scope: 'dependencies', section: 'Dependency Updates', hidden: false },
            { type: 'docs', section: 'Documentation', hidden: false },
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'perf', section: 'Performance Improvements' },
            { type: 'refactor', section: 'Code Refactoring', hidden: false },
            { type: 'style', section: 'Styles', hidden: false },
            { type: 'test', section: 'Tests', hidden: false },
          ],
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    //[
    //  '@semantic-release/exec',
    //  {
    //    verifyReleaseCmd: 'echo ${nextRelease.version} > VERSION',
    //  },
    //],
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
      },
    ],
    [
      'semantic-release-npm-deprecate-old-versions',
      {
        rules: [
          {
            rule: 'supportLatest',
            options: {
              numberOfMajorReleases: 1,
              numberofMinorReleases: 3,
              numberofPatchReleases: 3,
            },
          },
          {
            rule: 'supportPreReleaseIfNotReleased',
            options: {
              numberOfPreReleases: 1,
            },
          },
          {
            rule: 'deprecateAll',
            options: {},
          },
        ],
      },
    ],
    ['@semantic-release/gitlab', {}],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore(release): Release v${nextRelease.version}\n\n${nextRelease.notes}',
      },
    ],
    [
      '@saithodev/semantic-release-backmerge',
      {
        branches: [{ from: 'main', to: 'next' }],
      },
    ],
  ],
};

module.exports = { ...config };
