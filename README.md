# Percy exec GitHub Action

A GitHub action to run `percy exec` CLI commands. [Full API docs for this action
can be found here](https://docs.percy.io/docs/github-actions#section-exec-action)

## Quick start

To use the Percy exec GitHub action you will need to add a new step to your
actions config using the `percy/exec-action` action. `exec-action` has one
required input: the command to run your tests. You will also need to set your
`PERCY_TOKEN` in your GitHub projects settings.

Below is a sample config that runs Cypress with Percy:

``` yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master
      - name: Install
        run: yarn
      - name: Percy Test
        uses: percy/exec-action@0.1.0
        with:
          command: "cypress run"
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```
