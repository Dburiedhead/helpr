class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :messages, :requester_id, :helpr_id, :request_id, :created_at, :updated_at
end
