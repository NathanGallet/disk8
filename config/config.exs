# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :disk8,
  ecto_repos: [Disk8.Repo]

# Configures the endpoint
config :disk8, Disk8Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Gt7N9C7/uKV7RJMAb707kj5b0ilG3vO+d+Vq3mB0lrDcDRlKu4f4vjAlH5WyqZlU",
  render_errors: [view: Disk8Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Disk8.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
