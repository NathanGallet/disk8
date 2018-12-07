defmodule Disk8Web.UserView do
  use Disk8Web, :view
  alias Disk8Web.UserView

  def render("index.json", %{users: users}) do
    %{users: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user, jwt: jwt}) do
    %{user: Map.merge(render_one(user, UserView, "user.json"), %{token: jwt})}
  end

  def render("show.json", %{user: user}) do
    %{user: render_one(user, UserView, "user.json")}
  end

  def render("error.json", %{message: message}) do
    %{error: message}
  end

  def render("user.json", %{user: user}) do
    user
    |> Map.from_struct()
    |> Map.take([:id, :name, :token])
  end
end
