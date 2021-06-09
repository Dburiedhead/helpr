class RemoveUserFromConversations < ActiveRecord::Migration[6.0]
  def change
    remove_column :conversations, :user_id
  end
end
