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
  @wrong_token "wrongtoken"

  setup do
    user_connection(@first_user)
  end

  test "new user connection to room:lobby", %{socket: socket, user: _first_user} do
    push(socket, "new_user")
    assert_broadcast("new_user", %{user: "Mr Putput"})
  end

  test "message is broadcasted to client", %{socket: first_socket, user: _first_user} do
    {:ok, socket: second_socket, user: _user} = user_connection(@second_user)

    push(first_socket, "message", %{message: @first_message})
    push(second_socket, "message", %{message: @second_message})

    assert_broadcast("message", %{user: "Mr Putput", message: @first_message})
    assert_broadcast("message", %{user: "Zios", message: @second_message})
  end

  test "test connection with wrong jwt in socket", %{socket: _socket, user: _first_user} do
    # Try to connect using wrong jwt
    :error =
      UserSocket
      |> connect(%{token: @wrong_token})
  end


  defp user_connection(user_params) do
    # Create account
    {:ok, user} = Accounts.create_user(user_params)

    # Generate jwt token
    {:ok, jwt, _full_claims} =
      user |> Disk8Web.Guardian.encode_and_sign(%{}, token_type: :token)

    # Try to connect using jwt
    {:ok, socket} = connect(UserSocket, %{token: jwt})

    # Join lobby room
    {:ok, _empty_suff, socket} = subscribe_and_join(socket, RoomChannel, "room:lobby")

    # Return socket and first user
    {:ok, socket: socket, user: user}
  end
end
