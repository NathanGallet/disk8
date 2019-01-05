defmodule Disk8.Chat.Channel do
  @moduledoc """
  The Channel Model.

  This table contain all informations about the channels
  """

  use Ecto.Schema
  import Ecto.Changeset
  alias Disk8.Chat.JoinedChannel

  schema "channels" do
    field(:name, :string)

    has_many(:channel, JoinedChannel)
    timestamps()
  end

  @doc false
  def changeset(channel, attrs) do
    channel
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
