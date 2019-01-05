defmodule Disk8.Chat do
  @moduledoc """
  The Chat context.
  Can handle channels table and user_channels table (user by table)

  """

  import Ecto.Query, warn: false

  alias Disk8.Repo
  alias Disk8.Chat.Channel
  alias Disk8.Chat.JoinedChannel


  @doc """
  Create a channel.
  """
  def create_channel(attrs \\ %{}) do
    %Channel{}
    |> Channel.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Update channel informations
  """
  def update_channel(%Channel{} = channel, attrs) do
    channel
    |> Channel.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Get channel by id
  """
  def get_channel!(id), do: Repo.get!(Channel, id)

  @doc """
  Delete channel
  """
  def delete_channel(%Channel{} = channel) do
    Repo.delete(channel)
  end

  @doc """
  Insert user that joined a channel
  """
  def user_join_channel(attrs \\ %{}) do
    %JoinedChannel{}
    |> JoinedChannel.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Insert user that joined a channel
  """
  def user_left_channel(%JoinedChannel{} = joined_channel) do
    Repo.delete(joined_channel)
  end


  @doc """
  Get channels by user
  """
  def get_channel_by_user(id) do
    Repo.get_by!(JoinedChannel, id_user: id)
  end
end
