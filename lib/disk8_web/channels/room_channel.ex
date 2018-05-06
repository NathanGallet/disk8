defmodule Disk8Web.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  # Callback function
  def handle_in("newMessage", message, socket) do
    broadcast!(socket, "newMessage", %{content: message} )
    {:noreply, socket}
  end

end
