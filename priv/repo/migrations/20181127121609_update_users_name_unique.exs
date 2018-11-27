defmodule Disk8.Repo.Migrations.UpdateUsersNameUnique do
  use Ecto.Migration

  def change do
    create unique_index(:users, [:name])
  end
end
