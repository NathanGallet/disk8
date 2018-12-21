defmodule Disk8Web.UserController do
  use Disk8Web, :controller

  alias Disk8.Accounts
  alias Disk8.Accounts.User

  action_fallback Disk8Web.FallbackController

  plug(Guardian.Plug.EnsureAuthenticated when action in [:show, :update, :delete, :index])

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    case Accounts.create_user(user_params) do
      {:ok, user} ->
        # Generate jwt informations
        {:ok, jwt, _jwt_informations} =
          user
          |> Disk8Web.Guardian.encode_and_sign(%{}, token_type: :token)

        # Return status and informations
        conn
        |> put_status(:created)
        |> render("show.json", user: user, jwt: jwt)

      {:error, changeset} ->
        conn
        |> put_status(:bad_request)
        |> put_view(Disk8Web.ChangesetView)
        |> render("error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
