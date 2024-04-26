# Public Domain Library

<a id="contents"></a>

# Table of contents

1. [Context](#1)<br>
2. [Architecture](#2)
3. [Installation](#3)<br>
   3.1 [First time process](#3-1)<br>
   3.2 [Usual process](#3-2)
4. [Commands](#4)<br>
5. [Backend Tools](#5)<br>
   5.1 [ApostropheCMS](#5-1)<br>
   &nbsp;&nbsp;&nbsp;&nbsp;5.1.1 [Data models](#5-1-1)<br>
   &nbsp;&nbsp;&nbsp;&nbsp;5.1.2 [Modules](#5-1-2)<br>
   &nbsp;&nbsp;&nbsp;&nbsp;5.1.3 [Templates, macros, fragments](#5-1-3)<br>
   &nbsp;&nbsp;&nbsp;&nbsp;5.1.4 [Distinction between back and front code](#5-1-4)<br>
   &nbsp;&nbsp;&nbsp;&nbsp;5.1.5 [Custom components](#5-1-5)<br>
   &nbsp;&nbsp;&nbsp;&nbsp;5.1.6 [Publication workflow, locales and translations](#5-1-6)<br>
   5.2 [Docker](#5-2)<br>
   5.3 [MongoDB](#5-3)<br>
6. [Default user](#6)<br>

<a id="1"></a>

## 1 Context [&#x2B06;](#contents)

This project contains backend and frontend for Public Domain Library.

The app enable creation of authors and their relative books, and download of files.

<a id="2"></a>

## 2 Architecture [&#x2B06;](#contents)

ApostropheCMS was chosen on the backend because it is an open-source CMS, enabling user management, models definition by
developers while content edited by non-technical users is displayed in rendered templates. It is using MongoDB as
database.

Every part of the application is dockerized, with a healtcheck status.

<a id="3"></a>

## 3 Installation [&#x2B06;](#contents)

First, you need to have docker and docker-compose installed and launched on your machine. Then, it is quite easy;

- run `git clone `
- copy the file `.env.sample` and name it `.env` (this file will contain passwords, and will be git-ignored, so don't
  try to commit it)
- in this `.env` file, create a password for `MONGO_INITDB_ROOT_PASSWORD` and another one
  for `MONGO_INITDB_USER_PASSWORD` (choose whatever you want but do not use `@` or `:` because it will mess the DB connection up otherwise) - do not modify `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_USER_USERNAME`
- still in this `.env` file, adjust APOS_MONGODB_URI the connection URI with the password added for `MONGO_INITDB_USER_USERNAME`
- run `npm run dev` or `docker-compose up`

<a id="3-1"></a>

### 3.1 First time process [&#x2B06;](#contents)

The first time you run `docker-compose up`, all Docker images will be downloaded and built.

There is a dependency between the containers `pdl-server` and `pdl-db`: the DB needs to be started to
enable the server to start (otherwise, Apostrophe does not have access to Mongo and is stuck). However, on the first
run, some time is spent to create database users. Apostrophe tries to connect to Mongo during a certain period of time,
but on the first run, this timeout expires before Mongo is ready to accept connections. So, read the logs and wait for
the user `app-admin` to be created. When it is done, the DB is ready. You can now kill the docker containers by
hitting `Ctrl + c` in your terminal or run `docker-compose stop` in another one. And run again `docker-compose up`. This time, the DB will start quickly, enabling the server to start correctly.

<a id="3-2"></a>

### 3.2 Usual process [&#x2B06;](#contents)

Run simply `npm run dev` to start on development mode. The CMS part is accessible on `http://localhost:3000`.

<a id="4"></a>

## 4 Commands [&#x2B06;](#contents)

Run:

- `docker-compose ps` for running instances
- `docker-compose stop` or `docker-compose kill` for stopping the containers
- `docker-compose build` to rebuild images
- `docker-compose exec container-name sh` to log into a container (i.e: `docker-compose exec pdl-server sh` to log
  into the server container)

Mongo outputs a lot of logs, and while this can be necessary to read them sometimes, most of the time it is too much
useless information. Displaying its logs is possible though through `docker logs pdl-db -f`.

<a id="5"></a>

## 5 Backend Tools [&#x2B06;](#contents)

<a id="5-1"></a>

### 5.1 ApostropheCMS [&#x2B06;](#contents)

As explained previously, Apostrophe is a framework with REST APIs. Therefore, no need to create CRUD routes, as it is
handled by the framework.

<a id="5-1-1"></a>

#### 5.1.1 Data model [&#x2B06;](#contents)

Data models are defined by schemas in Apostrophe, also called piece types. These piece types are necessary to create
pieces, or items in the database.

See https://v3.docs.apostrophecms.org/guide/pieces.html#pieces

<a id="5-1-2"></a>

#### 5.1.2 Modules [&#x2B06;](#contents)

Modules are the heart of a Apostrophe app. They handle REST routes:

- getAll -> `GET /api/v1/module-name/`
- getOne -> `GET /api/v1/module-name/:id`
- post -> `POST /api/v1/module-name/`
- patch -> `PATCH /api/v1/module-name/:id`
- put -> `PUT /api/v1/module-name/:id`
- delete -> `DELETE /api/v1/module-name/:id`

If you need a custom route, you could add 2 sorts of routes:

- through `apiRoutes`
  methods (https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#apiroutes-self): for
  example `GET /api/v1/module-name/custom-route` with a `req` object as parameter
- through `routes` (https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#routes-self): it creates
  an Express route such as `/api/v1/module-name/custom-route` but with a `req` and `res` objects

There is also a `renderRoutes` function to feed Nunjucks templates with data returned by custom
functions (https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#renderroutes-self).

You can also "extend" existing routes or even
functions(https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#the-extension-pattern).


A module is defined by its type, often it will be `piece-type` to hold documents, and a schema with fields will be defined.
<br>There are also options to configure.

Example of the "author" module:

```js
module.exports = {
  extend: '@apostrophecms/piece-type',

  options: {
    alias: 'author',
    label: 'Author',
    pluralLabel: 'Authors',
    localized: true,
  },

  fields: { /* definition of different fields to display for the editor user in the UI */ },

  methods() { /* methods and hooks */ }
}
```

To know more about the possible configurations of a module: https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#configuration-settings

<a id="5-1-3"></a>

#### 5.1.3 Templates, macros, fragments [&#x2B06;](#contents)

ApostropheCMS uses Nunjucks templates to render data by default.

`layout.html` (apos/modules/@apostrophecms/page/views/layout.html) is the default template.
<br>It is composed of several blocks that can be overridden. For example, the block `main` in `layout.html` is where pages will output their own content.

Simplified view of `layout.html`:

```html
{% block beforeMain %} {# the header is defined here, no need to override in most cases #} {% endblock %}
{% block main %}
{#
Usually, your page templates in the @apostrophecms/pages module will override
this block. It is safe to assume this is where your page-specific content
should go.
#}
{% endblock %}
{% block afterMain %} {# the footer is defined here, no need to override in most cases #} {% endblock %}
```

Then any page will extend `layout.html` and override the `main` block. Example:

```html
{% extends "@apostrophecms/page:layout.html" %}

{% set fileBackground = apos.attachment.url(data.global.backgroundImage) %}

{% block main %}
<div class="t-background" style="background-image: url('{{ fileBackground }}');"></div>

<div class="t-places-categories">
  {% component 'place:categories' %}
</div>

<div class="t-partnerships">
  <div class="t-partnership">Logo</div>
  <div class="t-partnership">Logo</div>
  <div class="t-partnership">Logo</div>
</div>
{% endblock %}
```

It is also possible to include simple templates. When parameters are needed, macros come into place. With Apostrophe3, a new way of including functions has come: fragments.
Examples can be found in the codebase. For more information, see https://v3.docs.apostrophecms.org/guide/templating.html

<a id="5-1-4"></a>

#### 5.1.4 Distinction between back and front code [&#x2B06;](#contents)

The backend code is always in `index.js` file at the root of a module. It can be `require`d from other files, but it will end up in this file.

The frontend code is always in the `index.js` file of the `src/ui/` folder of a module. It can be `import`ed but there has to be `index.js` at some point.
<br>This file is then bundled by the automatic Webpack configuration contained in Apostrophe and is available in the browser.

<a id="5-1-5"></a>

#### 5.1.5 Custom components [&#x2B06;](#contents)

Custom components can be found in `apos/modules/component`. Standard modules are traditionally declared in `apos/app.js` but these are defined in `apos/modules/component/modules.js`.

These components are meant to be reused in the project.

If a component has a `view` folder with a Nunjucks template, it means it can be included in another template.
<br>For example, the locale-switcher component is used in multiple pages. It is imported and used this way:
```html
{% import "component/locale-switcher:index.html" as localeSwitcher with context %}
...
{{ localeSwitcher.displayFlags(params) }}
```

It uses a [macro](https://mozilla.github.io/nunjucks/templating.html#macro) `displayFlags` and outputs a list of available languages for the app user.

Another type of component is not using templates. For example, snackbar and pop-up.
<br>As it is purely js, it will not be imported in a template, but rather in a front js file.
<br>For example, here is how to display a pop-up:

```js
import displayPopup from '@/popup'
...
displayPopup('message to display', {
  dismiss: { label: 'No' },
  confirm: {
    label: 'Yes',
    action: () => {
      // action when 'Yes' is clicked
      // it could be a redirection on a different page
      // or an HTTP request to the backend
    },
  },
})
```

It is possible to import the pop-up with `@/popup` thanks an addition to the default Webpack configuration contained in Apostrophe.
<br>It is done while declaring the component:

```js
// in apos/modules/component/modules.js
'component/popup': {
  webpack: {
    extensions: {
      popupAlias: {
        resolve: {
          alias: {
            '@/popup': path.join(__dirname, './popup/public'),
          },
        },
      },
    },
  },
},
```

<a id="5-1-6"></a>

#### 5.1.6 Publication workflow, locales and translations [&#x2B06;](#contents)

Apostrophe3 has a publication workflow at the core. It gives the possibility to create draft documents and publish them later, or even give permissions to specific users to edit documents, and other users to publish them.
About roles and permissions, see this documentation: https://v3.docs.apostrophecms.org/guide/users.html#user-roles

Languages are called "locales" in Apostrophe and they are defined in `apos/modules/@apostrophecms/i18n/index.js`:

```js
options: {
  defaultLocale: 'en',
    locales: {
    fr: {
      label: 'Français',
        prefix: '/fr',
    },
    en: {
      label: 'English',
        prefix: '/en',
    },
  },
},
```

To enable this draft/live workflow, a module has to be "localized". Example with the "author" module:

```js
options: {
  alias: 'author',
    label: 'Author',
    pluralLabel: 'Authors',
    localized: true,
},
```

This means there will be the same number of documents in every defined locale. When creating a document in a module or a page, it is possible to "localize" in other defined locales, meaning it will be published (giving the "live" status).
A localized document, when edited, is in draft. It has to be published to be public (when the user clicks on "Publish" in the document modal or programmatically). As a consequence, a document can be translated by a user who has the permission to edit.

However, labels in the UI or our frontend code cannot be translated through the Apostrophe "localization" feature. Therefore, there are translation files in `apos/modules/@apostrophecms/i18n/i18n`. These are JSON files.
<br>There are different ways to use translations coming from these JSON files:
- in Apostrophe labels, as in module definition for options or fields for example: `label: 'pdl:exampleTranslation',`
- in the `req` object in Apostrophe methods: `req.t('pdl:exampleTranslation')` (the `t` function is provided by the module `i18n`, the one managing translations in locales)
- in templates: `{{ __t('pdl:exampleTranslation') }}` (`__t` is the same function provided by `i18n` - Apostrophe injects it in templates through a [helper](https://v3.docs.apostrophecms.org/reference/module-api/module-overview.html#helpers-self) )

By default, these translations are not available in js frontend code. If needed in a specific page, they can be injected through a `getBrowserData` method.

Labels are defined in `data.labels` in the backend:

```js
getBrowserData(_super, req) {
  const data = _super(req)

  data.labels = {
    exampleLabel: req.t('pdl:exampleTranslation'),
  }

  return data
}
```

`getBrowserData` is an Apostrophe function that pushes JS objects to the frontend. Therefore, labels are accessible in `apos.register.labels` (for this example) in frontend js code.

```js
// in apos/modules/register-page/ui/src/index.js
const { exampleLabel } = apos.register.labels
```

<a id="5-2"></a>

### 5.2 Docker [&#x2B06;](#contents)

Docker containers have a `healthcheck` command to ensure they are running correctly. It is an ongoing process, checking
if the container replies on a regular basis.

You can check if a container is healthy by typing `docker-compose ps`

<a id="5-3"></a>

### 5.3 MongoDB [&#x2B06;](#contents)

The database process uses authentication. The image used for the dockerized Mongo accepts some environment variables:

- MONGO_INITDB_DATABASE
- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD

With these, a `root` user for all databases is created when the Mongo image for Docker is launched the first time. This
enables authentication.

The Docker image can run scripts at the first initialization.<br>
For example, the script `db/scripts/init/01.add-user.sh` is copied into the image through the Dockerfile in the
folder `db`. It creates a user specifically for the `library` database. That is why the `.env` file is important, and
MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_USER_USERNAME should not be changed.

```Dockerfile
FROM mongo:6.0

COPY scripts/init/01.add-user.sh /docker-entrypoint-initdb.d/
```

If other scripts during the first init step are needed in the future, they should be placed in `db/scripts/init/` and
copied the same way in the Dockerfile.

Outside of the Docker network, the port exposed is 27018 (in order not to mess with existing MongoDB in the local
machine). Therefore, you can connect to GUI tools such as MongoDB Compass or Robo3T through `mongodb://localhost:27018`
and indicate in the authentication settings the `root` credentials.

To log into the container, you can run `docker-compose exec pdl-db bash` and then `mongo -u root`. Insert
the `root` password when it is asked and you have access to the mongo shell.

<a id="6"></a>
## 6 Default user [&#x2B06;](#contents)

By default, no user is created in ApostropheCMS. To create one, when docker images are up, run `docker exec -it pdl-server sh` then inside the container, run `node app @apostrophecms/user:add admin admin`. A prompt will ask for the password, enter one and exit. Go to `http://localhost:3000/login and enter `admin` as user and the freshly created password to log in.


