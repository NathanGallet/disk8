defmodule Disk8Web.Redix do
  @moduledoc """
  Redis module.
  """


  @doc """
  Returns a child spec to use Redix in supervision trees.

  pool_size = 5

  """
  @pool_size 5
  def child_spec(_args) do
    # Specs for the Redix connections.
    children =
    for i <- 0..(@pool_size - 1) do
      Supervisor.child_spec({Redix, name: :"redix_#{i}"}, id: {Redix, i})
    end

    # Spec for the supervisor that will supervise the Redix connections.
    %{
      id: RedixSupervisor,
      type: :supervisor,
      start: {Supervisor, :start_link, [children, [strategy: :one_for_one]]}
    }
  end

  @doc """
  Execute every commands.

  ## Example

    iex> Disk8Web.Redix.command(["PING"])
    {:ok, "PONG"}

    iex> Disk8Web.Redix.command(["YOLO"])
    {:error, %Redix.Error{message: "ERR unknown command `YOLO`, with args beginning with: "}}

  """
  def command(command) do
    Redix.command(:"redix_#{random_index()}", command)
  end

  @doc """
  Set key to hold the string value.

  ## Example

    iex> Disk8Web.Redix.set("key", "this_is_the_value")
    {:ok, "OK"}

  """
  def set(key, value) do
    command(["SET", key, value])
  end

  @doc """
  Get the value of key.

  ## Example

    iex> Disk8Web.Redix.set("my_key", "this_is_the_value")
    {:ok, "OK"}

    iex> Disk8Web.Redix.get("my_key")
    {:ok, "this_is_the_value"}

    iex> Disk8Web.Redix.get("wrong_key")
    {:ok, nil}

    iex> Disk8Web.Redix.get("key")
    {:ok, "this_is_the_value"}

  """
  def get(key) do
    command(["GET", key])
  end

  @doc """
  Returns the values of all specified keys.

  ## Example

    iex> Disk8Web.Redix.mset(["key1", "value1", "key2", "value2"])
    {:ok, "OK"}

    iex> Disk8Web.Redix.mget(["key1", "key2"])
    {:ok, ["value1", "value2"]}

  """
  def mget(keys) do
    command(["MGET"] ++ keys)
  end

  @doc """
  Sets the given keys to their respective values.

  ## Example

    iex> Disk8Web.Redix.mset(["key_1", "value_1", "key_2", "value_2"])
    {:ok, "OK"}

  """
  def mset(keys) do
    command(["MSET"] ++ keys)
  end

  @doc """
  Returns the remaining time to live of a key that has a timeout.
  Keys expire after 24 hours.

  ## Return Values
    1 if the timeout was set.
    0 if key does not exis

  ## Example

  iex> Disk8Web.Redix.set_ttl("key_1")
  {:ok, 1}

  iex> Disk8Web.Redix.set_ttl("wrong_key")
  {:ok, 0}

  """
  @timeout 86_400
  def set_ttl(key) do
    command(["EXPIRE", key, @timeout])
  end

  @doc """
  Returns the remaining time to live of a key that has a timeout.
  Keys expire after 24 hours.

  ## Return Values

    The command returns -2 if the key does not exist.
    The command returns -1 if the key exists but has no associated expire.

  ## Example

  iex> Disk8Web.Redix.set_ttl("key_1")
  {:ok, 1}

  iex> Disk8Web.Redix.get_ttl("key_2")
  {:ok, -1}

  iex> Disk8Web.Redix.get_ttl("wrong_key")
  {:ok, -2}

  Otherwise, it will return {:ok, remaining_time}
  """
  def get_ttl(key) do
    command(["TTL", key])
  end

  # Return a number between 0 and @pool_size.
  defp random_index() do
    rem(System.unique_integer([:positive]), @pool_size)
  end
end
