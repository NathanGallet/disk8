defmodule Disk8.Chat.JoinedChannel do
  @moduledoc """
  The JoinedChannel Model.

  This table contain all user connected to their channels
  """

  use Ecto.Schema
  import Ecto.Changeset

  @required_fields ~w(id_user id_channel)a

  schema "joined_channels" do
    belongs_to(:channel, Channel, foreign_key: :id_channel)
    belongs_to(:user, User, foreign_key: :id_user)

    timestamps()
  end

  @doc false
  def changeset(user_channel, attrs) do
    user_channel
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
  end
end
