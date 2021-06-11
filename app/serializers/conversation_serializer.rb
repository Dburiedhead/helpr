class ConversationSerializer < ActiveModel::Serializer
  # attributes :id, :title

  attributes :id, :title, :messages, :requester_id, :helpr_id
  # attribute :users do |conversation|
  #   UserSerializer.new(room.users.uniq)
  # end
end
