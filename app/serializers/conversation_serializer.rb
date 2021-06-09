class ConversationSerializer < ActiveModel::Serializer
  # attributes :id, :title

  attributes :id, :title, :messages
  # attribute :users do |conversation|
  #   UserSerializer.new(room.users.uniq)
  # end
end
