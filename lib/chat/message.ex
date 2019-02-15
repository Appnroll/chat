defmodule Chat.Message do
  use Ecto.Schema
  import Ecto.Query
  import Ecto.Changeset

  schema "messages" do
    field :message, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:name, :message])
    |> validate_required([:name, :message])
  end

  def get_messages() do
    Chat.Message
    |> order_by(asc: :inserted_at)
    |> Chat.Repo.all()
  end
end
