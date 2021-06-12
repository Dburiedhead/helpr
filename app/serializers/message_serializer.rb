class MessageSerializer < ActiveModel::Serializer
  # attributes :id, :conversation_id, :text, :created_at
  attributes :id, :user_id, :conversation_id, :text, :created_at
end
