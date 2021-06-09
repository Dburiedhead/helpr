class Api::V1::MessagesController < ApplicationController
    def index
        @messages = message.all
        render json: messages
    end

    def create
        @message = current_user.messages.new(message_params)
        conversation = Conversation.find(params[:conversation_id])
        if message.save
            puts "successfully saved a message!"
            ConversationsChannel.broadcast_to(conversation, {
                conversation: ConversationSerializer.new(conversation),
                users: UserSerializer.new(conversation.users),
                messages: MessageSerializer.new(conversation.messages)
            })
        end
        render json: MessageSerializer.new(message)        
    end

    private
        def message_params
            params.require(:message).permit(:content, :user_id, :conversation_id)
        end
end
