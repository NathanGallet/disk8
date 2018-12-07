defmodule Disk8.AccountsTest do
  use Disk8.DataCase

  alias Disk8.Accounts

  describe "users" do
    alias Disk8.Accounts.User

    # Customs attributes
    @valid_attrs %{
      name: "Name",
      password: "iopiop",
      public_key: "AAAAB3NzaC1yc2EAAAADAQABAAABAQDb0kO0jaJB1f0xqYZH4ifd2QUc54Q9KcvPHWxVf4sj3Yy6lc8cT9Qsml/9PrBO2laU+siypX5UiOlg2vIFTJ9xnDDfVnNBFsm5CIHX1MKC8veoYjMEELs3WzirsXMAFpyLpIhN+wLNAFs5BvSrnmT5AaWMVjqSgZwkLOOJ8PzQ+kII368eV7B+yYzIazoph10lQbW72yjY630hwllmSfZr2v1tZACoZkqwd1VnsXuCMInIvNuEaY4B6VAF12l1xLc3WO27ZHpVACIIURbg0EFWGzDocFFQjw8+MSYXKjYdhObq3piDA8pbs6Ev0fLxzwWg7ukBEDKAsknLLRn3NEqn",
      private_key: "bRg0TgdfeIB9dKoclkiV7ZgLIVO2JDCf7+UsPDav6ak="}
    @update_attrs %{name: "Updated Name"}
    @invalid_attrs %{name: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert(Accounts.list_users() == [user])
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert(Accounts.get_user!(user.id) == user)
    end

    test "create_user/1 with valid data creates a user" do
      assert({:ok, %User{} = user} = Accounts.create_user(@valid_attrs))
      assert(user.name == "Name")
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert({:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs))
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert({:ok, user} = Accounts.update_user(user, @update_attrs))
      assert(%User{} = user)
      assert(user.name == "Updated Name")
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert({:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs))
      assert(user == Accounts.get_user!(user.id))
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert({:ok, %User{}} = Accounts.delete_user(user))
      assert_raise(Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end)
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert(%Ecto.Changeset{} = Accounts.change_user(user))
    end
  end
end
