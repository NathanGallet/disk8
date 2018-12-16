defmodule Disk8.Repo do
  use Ecto.Repo,
    otp_app: :disk8,
    adapter: Ecto.Adapters.Postgres
end
