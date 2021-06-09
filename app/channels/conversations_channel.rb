class ConversationsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @conversation = Conversation.find_by(id: params[:conversation])
    stream_from @conversation
  end

  def received(data)
    ConversationsChannel.broadcast_to(@conversation, {conversation: @conversation, users: @conversation.users, messages: @conversation.messages})
  end
  
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
