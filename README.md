# [SL] Solventum Viax

- [About](#about)
- [Repository Structure](#repository-structure)
- [Development proces](#development-process)
- [Prerequisites](#prerequisites)
- [Project commands](#project-commands)

## About
A repository for the Solventum project.
This project was made following this foundation guide https://techmatesgroup.atlassian.net/wiki/spaces/Solventum/pages/3049422860/Project+Repository+and+CI+CD+Pipelines#%F0%9F%9A%A7--Project-Foundation-Guide

## Repository structure
This section contains an overview of how the repository structured.

The project uses yarn workspaces to organize and share the code within the project:
- `packages` - contains sharable common logic that can be used in other modules, each package is a yarn workspace
- `lambdas` - contains all viax lambdas, each lambda is a yarn workspace

Some of the shared configs is defined on the root level:
- `package.json` - defines dependencies available for all workspaces and scripts to operate on a project level
- `eslint.config.mjs` - [eslint](https://eslint.org/docs/latest/use/configure/configuration-files) base configuration, can be extended by creating configuration files in sub-folders
- `jest.config.js` - [jest](https://jestjs.io/) base configuration, must be extended in every package that needs unit testing
- `turbo.json` - [turborepo](https://turbo.build/repo/docs) configuration that defines and runs workflows for the whole project
- `bitbucket-pipelines.yml` - [Bitbucket Pipelines](https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/) YAML file with CI/CD pipelines definitions

## Development process
All the information about the development process can be found on this page: https://techmatesgroup.atlassian.net/wiki/spaces/Solventum/pages/3049422860/Project+Repository+and+CI+CD+Pipelines#%F0%9F%8C%B1--Branching-Strategy

It includes:
- Branching Strategy
- Commit messages
- Pull Requests

## Prerequisites
* [NodeJS 16.X installed](https://github.com/nvm-sh/nvm) \
  Use nvm to manage versions between projects
* [Yarn installed](https://yarnpkg.com/getting-started/install) 

## Project commands
* Run `yarn install` to install all dependencies listed in the root package.json and all workspaces

### Other commands
- `yarn run build` - To build all packages and lambdas
- `yarn run lint` - To validate code quality
- `yarn run test` - To run unit tests

To run a command for a specific workspace use the next pattern: `yarn workspace {workspace_name} {command}` \
Example: `yarn workspace @sl/some-workspace test`