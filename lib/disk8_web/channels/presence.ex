defmodule Disk8Web.Presence do
  @moduledoc false

  use Phoenix.Presence, otp_app: :disk8,
    pubsub_server: Disk8.PubSub
end
