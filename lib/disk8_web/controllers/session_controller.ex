defmodule Disk8Web.SessionController do
  use Disk8Web, :controller

  alias Disk8.Accounts.Authentification

  action_fallback(Disk8Web.FallbackController)

  def create(conn, params) do
    case Authentification.find_user_and_check_password(params) do
      {:ok, user} ->
        {:ok, jwt, _full_claims} =
          user |> Disk8Web.Guardian.encode_and_sign(%{}, token_type: :token)
        conn
        |> put_status(:created)
        |> render(Disk8Web.UserView, "login.json", jwt: jwt, user: user)

      {:error, message} ->
        conn
        |> put_status(401)
        |> render(Disk8Web.UserView, "error.json", message: message)
    end
  end

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> put_status(:forbidden)
    |> render(Disk8Web.UserView, "error.json", message: "Not Authenticated")
  end
end
