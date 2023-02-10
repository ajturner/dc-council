# DC Fantasy Council 

Visualization project for DC Council committees, starting in 2023-2024. 

Built by [Andrew Turner](https://highearthorbit.com) in collaboration with [Greater Greater Washington](https://ggwash.org/).

Read more about the project in [this blog post](https://highearthorbit.com/articles/civic-council-game/).

## Using Components

You can embed this project into any other website or application. It was built with [Web Components](https://www.webcomponents.org/introduction) using [StencilJS](https://stenciljs.com/). 

Add this HTML to your website:

```html
<dc-council-game
	agency-filename="https://ajturner.github.io/dc-council/assets/2022/agencies.csv"
	minoragency-filename="https://ajturner.github.io/dc-council/assets/2022/minoragencies.csv"
	committee-filename="https://ajturner.github.io/dc-council/assets/2022/committees.csv"
	member-filename="https://ajturner.github.io/dc-council/assets/2022/members.csv">
    <h3 slot="header">DC Fantasy Council 2022-2024</h3>
</dc-council-game>
<script type="module" src="https://ajturner.github.io/dc-council/build/dc-council.esm.js"></script>
<script nomodule src="https://ajturner.github.io/dc-council/build/dc-council.js"></script>
<script type="module" src="https://js.arcgis.com/calcite-components/1.0.0-beta.97/calcite.esm.js"></script>
<link rel="stylesheet" type="text/css" href="https://js.arcgis.com/calcite-components/1.0.0-beta.97/calcite.css" />
```

### Changing Data for other municipalities

You can load different Members, Agencies, and Committees from any organization. These are just spreadsheets, and should have these columns:

_agencies.csv_
`code,name,budget,description,link,committee,type`

- `code` is a unique string
- `name` is the Agency name to display
- `budget` is the amount of money in the Agency's budget
- `description` optional short description to display for more info
- `link` optional Web URL to the Agency webpage
- `committee` Name of the Committee in default assignment
- `type` _major_ or _minor_ for showing in the UI

_members.csv_
`name,role,elected,termstart,termend,affiliation,link,photo`

- `name` Member name to display
- `role` Council position (e.g. Chair, At-Large, Region 1)
- `elected` optional year elected
- `termstart` optional year term starts
- `termend` optional year term ends
- `affilition` optional politicial or other affiliation to display
- `link` optional Web URL to the Member's webpage
- `photo` Web URL to an image of the member

_committees.csv_

Used for the default committee.

Columns: `id,name,description,chair,members,link,permanent`

- `id` unique string code
- `name` Committee name to display
- `description` optional summary to display for more info
- `chair` Member name that is the default Committee Chair
- `members` comma-separated (and quoted) list of Members on the committee by default
- `link` optional Web URL to the existing Committee webpage
- `permanent` true if the Committee should not be editable and should always be present even with a "blank" council

## Developers

To work on the code for this project

```bash
git clone https://github.com/esridc/hub-user-workspace.git
cd dc-council
```

and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```
