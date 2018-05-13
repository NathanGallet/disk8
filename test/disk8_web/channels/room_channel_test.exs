defmodule Disk8Web.RoomChannelTest do
  use Disk8Web.ChannelCase

  alias Disk8Web.RoomChannel

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(RoomChannel, "room:lobby")

    {:ok, socket: socket}
  end

  test "new user connectio to room:lobby", %{socket: socket} do
    push(socket, "new_user", %{"hello" => "all"})
    assert_broadcast("new_user", %{"hello" => "all"})
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from!(socket, "broadcast", %{"some" => "data"})
    assert_push("broadcast", %{"some" => "data"})
  end
end
