defmodule Disk8Web.RoomChannelTest do
  use Disk8Web.ChannelCase

  alias Disk8Web.RoomChannel
  alias Disk8.Accounts

  @first_user %{name: "Zios"}

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(RoomChannel, "room:lobby")

    {:ok, socket: socket}
  end

  test "new user connection to room:lobby", %{socket: socket} do
    {:ok, first_user} = Accounts.create_user(@first_user)
    push(socket, "new_user", %{id: first_user.id})
    assert_broadcast("new_user", %{user: "Zios"})
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from!(socket, "broadcast", %{"some" => "data"})
    assert_push("broadcast", %{"some" => "data"})
  end
end
