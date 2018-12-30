defmodule Disk8.Accounts.Authentification do

  @moduledoc """
  Authentification module
  This module check and hash password for authentification purpose

  """

  import Ecto.{Query, Changeset}, warn: false
  alias Disk8.Repo
  alias Disk8.Accounts.User
  alias Disk8.Accounts.Encryption

  @doc """
  Check if the user is in the databases.

  ## Return Values

    {:ok, user} if the user is in the database
    {:error, "Could not login"} otherwise

  """
  def find_user_and_check_password(%{"user" => %{"name" => name, "password" => password}}) do
    user = Repo.get_by(User, name: name)

    case check_password(user, password) do
      true -> {:ok, user}
      _    -> {:error, "Could not login"}
    end
  end

  @doc """
  Hash password and add it to the changeset

  valid? - Stores if the changeset is valid
  changes - The changes from parameters that were approved in casting

  """
  def hash_password(changeset) do
    case changeset do
      %Ecto.Changeset{
        valid?: true,
        changes: %{password: pass}
      } ->
        put_change(changeset, :password, Encryption.password_hashing(pass))

      _ ->
        changeset
    end
  end

  # Check the password by comparing it with the stored hash.
  defp check_password(user, password) do
    case user do
      nil -> false
      _   -> Encryption.validate_password(password, user.password)
    end
  end
end
