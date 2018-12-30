defmodule Disk8.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      Disk8.Repo,
      Disk8Web.Endpoint,
      Disk8Web.Presence,
      Disk8Web.Redix
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # :one_for_one - if a child process terminates, only that process is restarted.
    opts = [strategy: :one_for_one, name: Disk8.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Disk8Web.Endpoint.config_change(changed, removed)
    :ok
  end
end
