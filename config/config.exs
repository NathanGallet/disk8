# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :disk8,
  ecto_repos: [Disk8.Repo]

# Configures the endpoint
config :disk8, Disk8Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "2ir/JjGwk/ofouSw6TrDsnoFvUW8K4sr5TD0Es4jazTDWvAmeeFnjvcz5Gv2Rn56",
  render_errors: [view: Disk8Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Disk8.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Configuration for Guardian
config :disk8, Disk8Web.Guardian,
  issuer: "Disk8",
  secret_key: "IvCK5zSyNt9jaGKm1Yi+PaeXxx4lSxXZ0TVs+HMUUb8sog1iBxpBhM+XeWWCwPmn",
  allowed_algos: ["HS256"],
  ttl: {30, :days},
  allowed_drift: 2000,
  verify_issuer: true

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
