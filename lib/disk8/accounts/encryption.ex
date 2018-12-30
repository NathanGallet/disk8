defmodule Disk8.Accounts.Encryption do
  @moduledoc false

  alias Comeonin.Bcrypt

  # Use functions from comeonin for more informations
  # see : https://hexdocs.pm/comeonin/api-reference.html
  def password_hashing(password), do: Bcrypt.hashpwsalt(password)
  def validate_password(password, hash), do: Bcrypt.checkpw(password, hash)
end
