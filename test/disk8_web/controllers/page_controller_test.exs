defmodule Disk8Web.PageControllerTest do
  use Disk8Web.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200)
  end
end
