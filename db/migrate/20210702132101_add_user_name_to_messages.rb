class AddUserNameToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :user_name, :string
  end
end
