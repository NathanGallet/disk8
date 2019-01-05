defmodule Disk8.ChatTest do
  use Disk8.DataCase

  alias Disk8.Chat
  alias Disk8.Accounts

  # Customs attributes
  @user_creation %{
    name: "Mr PouPout",
    password: "rpz",
    public_key: "AAAAB3NzaC1yc2EAAAADAQABAAABAQDb0kO0jaJB1f0xqYZH4ifd2QUc54Q9KcvPHWxVf",
    private_key: "bRg0TgdfeIB9dKoclkiV7ZgLIVO2JDCf7+UsPDav6ak="}

  @channel_creation %{
    name: "room:new"
  }
  @channel_update %{
    name: "coucou"
  }

  def channel_fixture(attrs \\ %{}) do
    {:ok, channel} =
      attrs
      |> Enum.into(@channel_creation)
      |> Chat.create_channel()

    channel
  end

  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(@user_creation)
      |> Accounts.create_user()

    user
  end

  test "test create_channel/1" do
    channel = channel_fixture()
    assert(Map.get(channel, :name), Map.get(@channel_creation, :name))
  end

  test "test update_channel/1" do
    {:ok, channel} =
      channel_fixture()
      |> Chat.update_channel(@channel_update)

    assert(Map.get(channel, :name), Map.get(@channel_update, :name))
  end

  test "test get_channel!/1" do
    channel = channel_fixture()

    obtained_channel =
      channel
      |> Map.get(:id)
      |> Chat.get_channel!()

    assert(obtained_channel == channel)
  end

  test "test delete_channel!/1" do
    channel = channel_fixture()

    {:ok, _deleted_channel} =
      channel
      |> Chat.delete_channel()
  end

  test "test add_joined_channel then get it then delete it" do
    channel = channel_fixture()
    user = user_fixture()

    # Join the channel
    {:ok, joined_channel} =
      Chat.user_join_channel(%{
            id_channel: Map.get(channel, :id),
            id_user: Map.get(user, :id)})

    # Get the channel
    getted_channel = Chat.get_channel_by_user(Map.get(user, :id))

    assert joined_channel == getted_channel

    # Delete the channel
    {:ok, _deleted_channel} = Chat.user_left_channel(getted_channel)
  end
end
