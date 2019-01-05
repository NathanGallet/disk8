defmodule Disk8.Repo.Migrations.CreateUserChannels do
  use Ecto.Migration

  def change do
    create table(:joined_channels) do
      add(:id_channel, references(:channels))
      add(:id_user, references(:users))

      timestamps()
    end
  end
end
