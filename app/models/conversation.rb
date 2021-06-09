class Conversation < ApplicationRecord
  belongs_to :request

  has_many :messages
  has_many :users, through: :messages
end
