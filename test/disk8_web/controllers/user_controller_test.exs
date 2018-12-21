defmodule Disk8Web.UserControllerTest do
  use Disk8Web.ConnCase

  alias Disk8.Accounts

  @create_attrs %{name: "some name"}

  @create_attrs %{
    name: "Name",
    password: "iopiop",
    public_key: "AAAAB3NzaC1yc2EAAAADAQABAAABAQDb0kO0jaJB1f0",
    private_key: "bRg0TgdfeIB9dKoclkiV7ZgLIVO2JDCf7+UsPDav6ak="
  }

  @update_attrs %{name: "some updated name"}

  @missing_fields_attrs %{name: "Name"}

  @invalid_attrs %{name: nil}

  def fixture(:user) do
    {:ok, user} = Accounts.create_user(@create_attrs)
    user
  end

  def secure_conn(conn) do
    user = fixture(:user)
    {:ok, jwt, _} = user |> Disk8Web.Guardian.encode_and_sign(%{}, token_type: :token)

    secured_conn =
      conn
      |> put_req_header("accept", "application/json")
      |> put_req_header("authorization", "Token " <> jwt)

    {:ok, conn: secured_conn, user: user}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post(conn, user_path(conn, :create), user: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["user"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, user_path(conn, :create), user: @missing_fields_attrs)
      assert json_response(conn, 400)["errors"] == %{
        "public_key"  => ["can't be blank"],
        "private_key" => ["can't be blank"],
        "password"    => ["can't be blank"]
      }
    end

    test "user already exist", %{conn: conn} do
      conn = post(conn, user_path(conn, :create), user: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["user"]

      conn = post(conn, user_path(conn, :create), user: @create_attrs)
      assert response(conn, 400) =~ "has already been taken"
    end
  end

  describe "index" do
    test "lists all users", %{conn: conn} do
      # Secure connection
      {:ok, [conn: conn, user: user]} = secure_conn(conn)

      # The only user should the one created by secure_conn
      conn = get(conn, user_path(conn, :index))
      assert json_response(conn, 200)["users"] == [%{"id" => user.id, "name" => user.name}]
    end

    test "renders error connection without jwt", %{conn: conn} do
      # Try to get users without authentication
      conn = get(conn, user_path(conn, :index))
      assert json_response(conn, 403)["error"] == "Not Authenticated"
    end
  end

  describe "update user" do
    test "renders user when data is valid", %{conn: conn} do

      # Secure connection
      {:ok, [conn: conn, user: user]} = secure_conn(conn)

      # Update User
      conn_responded = put(conn, user_path(conn, :update, user), user: @update_attrs)
      assert json_response(conn_responded, 200)

      # Check if the update has been done
      conn_responded = get(conn, user_path(conn, :show, user))
      assert json_response(conn_responded, 200)["user"] == %{
        "id" => user.id,
        "name" => "some updated name"
      }
    end

    test "renders errors when no authentication", %{conn: conn} do
      # No authentication
      user = fixture(:user)
      conn_responded = put(conn, user_path(conn, :update, user), user: @invalid_attrs)
      assert json_response(conn_responded, 403)["error"] == "Not Authenticated"
    end
  end

  describe "delete user" do
    test "deletes chosen user", %{conn: conn} do
      # Secure connection
      {:ok, [conn: conn, user: user]} = secure_conn(conn)

      conn_responded = delete(conn, user_path(conn, :delete, user))
      assert response(conn_responded, 204)
      assert_error_sent 404, fn ->
        get(conn, user_path(conn, :show, user))
      end
    end

    test "renders errors when no authentication", %{conn: conn} do
      # No authentication
      user = fixture(:user)
      conn_responded = delete(conn, user_path(conn, :delete, user))
      assert json_response(conn_responded, 403)["error"] == "Not Authenticated"
    end
  end
end
