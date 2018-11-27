defmodule Disk8.Accounts.User do
  @moduledoc """
  Descriptions of the uers table

  """
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
