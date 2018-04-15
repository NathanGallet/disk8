defmodule Disk8Web.PageController do
  use Disk8Web, :controller

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html")
  end
end
