defmodule Disk8Web.RoomChannel do
  @moduledoc """
  The Room socket

  """
  use Disk8Web, :channel
  alias Disk8.Accounts
  alias Disk8Web.Presence

  def join("room:lobby", _message, socket) do
    send(self(), :after_join)
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

  def handle_info(:after_join, socket) do
    push(socket, "presence_state", Presence.list(socket))
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
          online_at: inspect(System.system_time(:second))
                              })
    {:noreply, socket}
  end
end
