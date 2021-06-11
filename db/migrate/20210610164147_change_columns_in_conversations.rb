class ChangeColumnsInConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :selected, :boolean, default: false, null: false
    add_reference :conversations, :request, foreign_key: { to_table: :requests}, null: false
    change_column_null  :conversations, :title, false
    change_column_null  :conversations, :helpr_id, false
    change_column_null  :conversations, :requester_id, false
  end
end
