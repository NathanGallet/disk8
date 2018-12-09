use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :disk8, Disk8Web.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :disk8, Disk8.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "disk8_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# Reduce the number of rounds so it does not slow down tests
config :bcrypt_elixir, log_rounds: 4
