defmodule Disk8Web.RoomChannel do
  use Disk8Web, :channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "wrong channel name"}}
  end

  # Callback function
  def handle_in("new_user", message, socket) do
    broadcast!(socket, "new_user", %{content: message})
    {:noreply, socket}
  end

end
