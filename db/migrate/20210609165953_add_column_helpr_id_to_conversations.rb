class AddColumnHelprIdToConversations < ActiveRecord::Migration[6.0]
  def change
    remove_column :conversations, :request_id
    remove_column :conversations, :initial_message
    add_reference :conversations, :helpr_id, foreign_key: { to_table: :users}
    add_reference :conversations, :requester_id, foreign_key: { to_table: :users}

  end
end
