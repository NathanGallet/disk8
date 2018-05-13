defmodule Disk8Web.RoomChannel do
  @moduledoc """
  The Room socket

  """
  use Disk8Web, :channel
  require Logger

  def join("room:lobby", _message, socket) do
    Logger.debug("Join lobby room")
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
