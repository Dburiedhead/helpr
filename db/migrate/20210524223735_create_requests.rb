class CreateRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :requests do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.decimal :latitude, null: false
      t.decimal :longitude, null: false
      t.string :request_type, null: false
      t.references :user, null: false, foreign_key: true
      t.boolean :fulfilled, null: false, default: false
      
      t.timestamps
    end
  end
end
