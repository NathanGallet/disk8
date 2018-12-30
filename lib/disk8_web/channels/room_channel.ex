defmodule Disk8Web.RoomChannel do
  @moduledoc """
  The Room socket for all communication between users
  """

  use Disk8Web, :channel
  alias Disk8Web.Presence

  # Connection to the main room
  def join("room:lobby", _message, socket) do
    # Notify presence
    send(self(), :after_join)

    # Get user name from the token
    user = socket.assigns.guardian_default_resource.name

    # All user suscribe to private room in order to pm them
    Disk8Web.Endpoint.subscribe("private_room:" <> user)
    {:ok, socket}
  end

  # The is no other room than lobby yet
  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "wrong channel name"}}
  end

  @doc """
  Exchange public key and informations when user are connected.
  The channel that owns the socket will not receive the published message.
  """
  def handle_in("new_user", %{"is_first_user" => is_first_user}, socket) do
    # Get name and public_key from token
    name = socket.assigns.guardian_default_resource.name
    public_key = socket.assigns.guardian_default_resource.public_key

    # Send information to all user from pid
    broadcast_from!(socket, "new_user", %{user: name, public_key: public_key, is_first_user: is_first_user})
    {:noreply, socket}
  end

  @doc """
  Send message to all the user on the socket even the channel's owner
  """
  def handle_in("message", %{"message" => message}, socket) do
    # Get name from the token
    user = socket.assigns.guardian_default_resource.name
    broadcast!(socket, "message", %{user: user , message: message})
    {:noreply, socket}
  end

  def handle_in("private_message", %{"message" => message, "user" => user}, socket) do
    Disk8Web.Endpoint.broadcast!("private_room:" <> user, "message", %{
    user: socket.assigns.user,
    message: message
  })
    {:noreply, socket}
  end

  @doc false
  # Refresh the presence
  def handle_info(:after_join, socket) do
    push(socket, "presence_state", Presence.list(socket))
    {:ok, _} = Presence.track(socket, socket.assigns.guardian_default_resource.name,
      %{
        online_at: inspect(System.system_time(:second))
      })
    {:noreply, socket}
  end
end
