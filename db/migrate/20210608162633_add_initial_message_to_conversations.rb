class AddInitialMessageToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :initial_message, :text
  end
end
