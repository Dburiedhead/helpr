class Conversation < ApplicationRecord
  belongs_to :request
  belongs_to :requester, :foreign_key => :requester_id, class_name: "User"
  belongs_to :helpr, :foreign_key => :helpr_id, class_name: "User"

  has_many :messages, dependent: :destroy
  has_many :users, through: :messages

  validates_presence_of :requester_id, :helpr_id, :request_id

end
