defmodule Disk8Web.SessionControllerTest do
  use Disk8Web.ConnCase

  alias Disk8.Accounts

  @fixture_create_user %{
    name: "Name",
    password: "iopiop",
    public_key: "AAAAB3NzaC1yc2EAAAADAQABAAABAQDb0kO0jaJB1f0",
    private_key: "bRg0TgdfeIB9dKoclkiV7ZgLIVO2JDCf7+UsPDav6ak="
  }

  @params %{
    name: "Name",
    password: "iopiop"
  }

  @wrong_params %{
    name: "Yolo",
    password: "123123"
  }

  def fixture(:user) do
    {:ok, user} = Accounts.create_user(@fixture_create_user)
    user
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "get token", %{conn: conn} do
    fixture(:user)

    conn = post(conn, session_path(conn, :create), user: @params)
    assert json_response(conn, 201)["user"]["jwt"] != ""
  end

  test "wrong parameters when get token", %{conn: conn} do
    fixture(:user)

    conn = post(conn, session_path(conn, :create), user: @wrong_params)
    assert json_response(conn, 401)
  end

  test "delete token", %{conn: conn} do
    fixture(:user)

  end
end
