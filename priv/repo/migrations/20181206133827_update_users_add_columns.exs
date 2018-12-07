defmodule Disk8.Repo.Migrations.UpdateUsersAddColumns do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :password, :string
      add :public_key, :text
      add :private_key, :string
    end
  end
end
