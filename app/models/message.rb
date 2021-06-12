class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :user
  validates_presence_of :text, :conversation_id, :user_id

  # after_create_commit {
  #   MessageBroastJob.perform_later(self)
  # }
end
