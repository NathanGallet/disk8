defmodule Disk8Web.Router do
  use Disk8Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug(ProperCase.Plug.SnakeCaseParams)
    plug(
      Guardian.Plug.Pipeline,
      error_handler: Disk8Web.SessionController,
      module: Disk8Web.Guardian
    )
    plug(Guardian.Plug.VerifyHeader, realm: "Token")
    plug(Guardian.Plug.LoadResource, allow_blank: true)
  end

  # Serve bundle file
  scope "/", Disk8Web do
    get("/", PageController, :index)
  end

  # Webservices
  scope "/api", Disk8Web do
    pipe_through :api

    resources("/user", UserController, except: [:new, :edit]) # User management
    post("/user/login", SessionController, :create) # Generate token

  end
end
