# Disk8

#### Requirements
  * A postgresql database with user 
  * Browser extensions [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) and [React DevTools](https://reactjs.org/blog/2015/09/02/new-react-developer-tools.html#installation)


#### Server

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * You can test the application with `mix test`
  * You can generate the api documentation using `mix docs`
  * Code analysis using `mix credo`

#### Client

Go to the directory priv/client and install all dependencies: `yarn`

  * Build production : `yarn build`
  * Build development : `yarn start`

Then start Phoenix endpoint with `mix phx.server`

* In production visit [`localhost:4000`](http://localhost:4000).
* In development visit [`localhost:8081`](http://localhost:8081).
