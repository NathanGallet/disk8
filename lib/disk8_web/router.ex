defmodule Disk8Web.Router do
  use Disk8Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug(ProperCase.Plug.SnakeCaseParams)
  end

  # Serve bundle file
  scope "/", Disk8Web do
    get("/", PageController, :index)
  end

  # Webservices
  scope "/api", Disk8Web do
    pipe_through :api

    # Users routes
    post("/users", UserController, :create) # Create user
    get("/user/:id", UserController, :show) # Display one user
    put("/user/:id", UserController, :update) # Update one user
    delete("/user/:id", UserController, :delete) # Delete one user
    get("/users", UserController, :index) # Get all users
  end
end
