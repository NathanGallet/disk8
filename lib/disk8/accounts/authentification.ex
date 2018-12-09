defmodule Disk8.Accounts.Authentification do

  import Ecto.{Query, Changeset}, warn: false

  alias Disk8.Repo
  alias Disk8.Accounts.User
  alias Disk8.Accounts.Encryption

  def find_user_and_check_password(%{"user" => %{"name" => name, "password" => password}}) do
    # Get user
    user = Repo.get_by(User, name: name)

    case check_password(user, password) do
      true -> {:ok, user}
      _ -> {:error, "Could not login"}
    end
  end

  def register(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> hash_password
    |> Repo.insert()
  end

  def hash_password(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password, Encryption.password_hashing(pass))

      _ ->
        changeset
    end
  end

  defp check_password(user, password) do
    case user do
      nil -> false
      _ -> Encryption.validate_password(password, user.password)
    end
  end
end
