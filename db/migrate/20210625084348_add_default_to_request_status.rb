class AddDefaultToRequestStatus < ActiveRecord::Migration[6.0]
  def change
    change_column_default  :requests, :request_status, "opened"
  end
end
