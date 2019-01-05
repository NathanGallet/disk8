defmodule Disk8.Accounts.User do
  @moduledoc """
  User model

  """
  use Ecto.Schema
  alias Disk8.Chat.JoinedChannel
  import Ecto.Changeset

  @required_fields ~w(name password public_key private_key)a

  schema "users" do
    field(:name, :string)
    field(:password, :string)
    field(:public_key, :string)
    field(:private_key, :string)

    has_many(:user, JoinedChannel)
    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:name)
  end
end
