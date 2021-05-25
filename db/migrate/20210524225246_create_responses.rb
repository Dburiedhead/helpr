class CreateResponses < ActiveRecord::Migration[6.0]
  def change
    create_table :responses do |t|
      t.text :message, null: false
      t.references :user, null: false, foreign_key: true
      t.boolean :selected, null: false, default: false
      t.references :request, null: false, foreign_key: true
      t.timestamps
    end
  end
end
