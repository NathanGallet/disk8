defmodule Disk8Web.UserSocketTest do
  use Disk8Web.ChannelCase, async: true

  alias Disk8Web.UserSocket
  alias Disk8.Accounts

  @first_user %{
    name: "Mr Putput",
    password: "iopiop",
    public_key: "AAAAB3NzaC1yc2EAAAADAQABAAABAQDb0kO0jaJB1f0",
    private_key: "bRg0TgdfeIB9dKoclkiV7ZgLIVO2JDCf7+UsPDav6ak="
  }

  test "authenticate with valid and wrong token" do
    {:ok, user} = Accounts.create_user(@first_user)
    {:ok, token, _full_claims} = user |> Disk8Web.Guardian.encode_and_sign(%{}, token_type: :token)

    wrong_token = String.downcase(token)

    assert {:ok, socket} = connect(UserSocket, %{"token" => token})
    assert :error = connect(UserSocket, %{"token" => wrong_token})
  end
end
