# Nexus Simple App Example

#### This Vite + React App is a simple example of how to use Fluree Nexus with Frontend Application Clients.

## Getting Started

By default, this application is configured to run with read-only permissions against a Sandbox Nexus dataset. You will be able to view data in the UI, but you will not be able to add or edit the entities on-screen. If you update the `.env` file with configuration to work with your own dataset, you can easily enable not only **read** behavior but **write** behavior through this app as well.

If you've created a [Nexus account](https://data.flur.ee/) and any initial dataset, this app can be easily configured to run against that dataset with an API key generated through the [Nexus Settings UI](https://developers.flur.ee/docs/nexus/datasets/settings/). You can find your `ledger-id` as the value associated with the `ledger` key in the Quick Start Guide notebook automatically generated when you create a dataset.

> **Note**: You'll want to first try working with your dataset's Quick Start Notebook to add some initial data that this application can leverage!

Simply update the `.env` file in the root of this project with the following values:

```
VITE_API_KEY=<your-api-key>
VITE_LEDGER=<your-ledger-id>
```

> If you have not yet created a Nexus account, you can do so [here](https://data.flur.ee/). For more information about Fluree's JSON-LD Database or our Cloud-Hosted Nexus platform, [browse our documentation here](https://developers.flur.ee/).

## Running the App

You can run the app simply by running the following commands:

```bash
npm i && npm run dev
```

The app is able to directly structure queries & transactions in JSON to be issued to the dataset directly.

Because all data in Fluree is JSON, both in Fluree's Query Language and in its data shape, applications can directly query data and consume data results without any additional parsing or transformation.

Because policy & permissions can be enforced by the dataset itself, applications can be written to allow users to directly issue transactions to the dataset without any additional middleware or API layer.

> Note: By default this app is configured to use an API Key with _read-only permissions_. Those permissions are managed by the dataset directly. You can experiment with your own dataset, for example, by adding a ` Policy Group` that is only able to read `Yeti` data but not `Person` data. Then generate an API Key for that Policy Group and try using it in the app!
