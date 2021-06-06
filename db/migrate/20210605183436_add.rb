class Add < ActiveRecord::Migration[6.0]
  def change
    add_column :requests, :response_counter, :integer, default: 0
  end
end
