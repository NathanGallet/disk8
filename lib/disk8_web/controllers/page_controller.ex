defmodule Disk8Web.PageController do
  use Disk8Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
