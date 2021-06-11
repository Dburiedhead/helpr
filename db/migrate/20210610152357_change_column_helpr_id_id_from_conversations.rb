class ChangeColumnHelprIdIdFromConversations < ActiveRecord::Migration[6.0]
  def change
    rename_column :conversations, :helpr_id_id, :helpr_id
    rename_column :conversations, :requester_id_id, :requester_id
  end
end
