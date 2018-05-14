defmodule Disk8Web.RoomChannel do
  @moduledoc """
  The Room socket

  """
  use Disk8Web, :channel
  alias Disk8.Accounts

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "wrong channel name"}}
  end

  # Callback function
  def handle_in("new_user", %{"id" => id}, socket) do
    user = Accounts.get_user!(id)
    broadcast!(socket, "new_user", %{user: user.name})
    {:noreply, socket}
  end

  def handle_in("message", %{"message" => message, "id" => id}, socket) do
    user = Accounts.get_user!(id)
    broadcast!(socket, "message", %{user: user.name, message: message})
    {:noreply, socket}
  end
end
