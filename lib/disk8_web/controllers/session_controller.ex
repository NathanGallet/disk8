defmodule Disk8Web.SessionController do
  use Disk8Web, :controller

  alias Disk8.Accounts.Authentification

  action_fallback(Disk8Web.FallbackController)

  def create(conn, param) do
    case Authentification.find_user_and_check_password(param) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} =
          user |> Disk8Web.Guardian.encode_and_sign(%{}, token_type: :token)

        conn
        |> put_status(:created)
        |> put_view(Disk8Web.UserView)
        |> render("show.json", jwt: jwt, user: user)

      {:error, message} ->
        conn
        |> put_status(:unauthorized)
        |> put_view(Disk8Web.UserView)
        |> render("error.json", message: message)
    end
  end

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> put_status(:forbidden)
    |> put_view(Disk8Web.UserView)
    |> render("error.json", message: "Not Authenticated")
  end
end
