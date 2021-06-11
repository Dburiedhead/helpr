class Api::V1::MessagesController < ApplicationController
    before_action :authenticate_user!
    # before_action :set_message, only: [:show, :create]

    def index
        @messages = Message.all
        render json: @messages
    end
    
    def create
        puts "CURRENT USER IS :: #{current_user}"
        @message = current_user.messages.build(message_params)
        puts "CONVERSATION ID IS :: #{Conversation.find(message_params[:conversation_id])}"
        conversation = Conversation.find(message_params[:conversation_id])
        if @message.save
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
        # def set_message
        #     @message = Message.find(params[:id])
        # end
        def message_params
            params.require(:message).permit(:text, :conversation_id)
        end
end
