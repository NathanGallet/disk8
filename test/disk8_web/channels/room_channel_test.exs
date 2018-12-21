defmodule Disk8Web.RoomChannelTest do
  use Disk8Web.ChannelCase

  alias Disk8Web.RoomChannel
  alias Disk8Web.UserSocket
  alias Disk8.Accounts

  @first_user %{
    name: "Mr Putput",
    password: "iopiop",
    public_key: "AAAAB3NzaC1yc2EAAAADAQABAAABAQDb0kO0jaJB1f0",
    private_key: "bRg0TgdfeIB9dKoclkiV7ZgLIVO2JDCf7+UsPDav6ak="
  }

  @second_user %{
    name: "Zios",
    password: "iopiop",
    public_key: "AAAAB3NzaC1yc2EAAAADAQABAAABAQDb0kO0jaJB1f0",
    private_key: "bRg0TgdfeIB9dKoclkiV7ZgLIVO2JDCf7+UsPDav6ak="
  }

  @first_message "Yo"
  @second_message "Plait"

  setup do
    {:ok, first_user} = Accounts.create_user(@first_user)

    {:ok, _empty_suff, socket} =
      UserSocket
      |> socket("user_id", %{user_id: first_user.id})
      |> subscribe_and_join(RoomChannel, "room:lobby")

      {:ok, socket: socket, user: first_user}
  end

  test "new user connection to room:lobby", %{socket: socket, user: first_user} do
    push(socket, "new_user", %{id: first_user.id})
    assert_broadcast("new_user", %{user: "Mr Putput"})
  end

  test "message is broadcasted to client", %{socket: socket, user: first_user} do
    {:ok, second_user} = Accounts.create_user(@second_user)

    push(socket, "message", %{id: first_user.id, message: @first_message})
    push(socket, "message", %{id: second_user.id, message: @second_message})

    assert_broadcast("message", %{user: "Mr Putput", message: @first_message})
    assert_broadcast("message", %{user: "Zios", message: @second_message})
  end
end
