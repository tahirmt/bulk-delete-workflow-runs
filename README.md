# Bulk delete workflow runs

## Why?

The GitHub Actions UI leaves old workflows lying around even after they've been deleted or renamed. The only way to get rid of them is to delete the associated runs which can be a pain if they are numerous. This tool automates that process!

## Usage

- Run `yarn` to install dependencies
- Run `yarn start <owner> <repo> <workflow_name> <github_pat>`

## Arguments

- **owner** is the name of the organisation or user of the github repo
- **repo** is the name of the repo
- **workflow_name** is the name of the repo and can be found either in the GitHub Actions UI or at the top of your workflow file
- **github_pat** can be generated by following [these instructions](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). You must give the PAT the `workflow` scope.