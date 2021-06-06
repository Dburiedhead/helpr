class AddColumnToRequest < ActiveRecord::Migration[6.0]
  def change
    add_column :requests, :request_status, :string
  end
end
