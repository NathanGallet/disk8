defmodule Disk8Web.RoomChannel do
  @moduledoc """
  The Room socket

  """
  use Disk8Web, :channel
  alias Disk8Web.Presence

  def join("room:lobby", _message, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "wrong channel name"}}
  end

  # Callback function
  def handle_in("new_user", %{}, socket) do
    name = socket.assigns.guardian_default_resource.name
    public_key = socket.assigns.guardian_default_resource.public_key

    broadcast!(socket, "new_user", %{user: name, public_key: public_key})
    {:noreply, socket}
  end

  def handle_in("message", %{"message" => message}, socket) do
    user = socket.assigns.guardian_default_resource.name
    broadcast!(socket, "message", %{user: user , message: message})
    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    push(socket, "presence_state", Presence.list(socket))
    {:ok, _} = Presence.track(socket, socket.assigns.guardian_default_resource.name, %{
          online_at: inspect(System.system_time(:second))
                              })
    {:noreply, socket}
  end
end
