defmodule Disk8Web.Router do
  use Disk8Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug(ProperCase.Plug.SnakeCaseParams)
  end

  # Serve bundle file
  scope "/", Disk8Web do
    get "/", PageController, :index
  end

  # Webservices
  scope "/api", Disk8Web do
    pipe_through :api
  end
end
