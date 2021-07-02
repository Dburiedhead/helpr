class Api::V1::MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
        @messages = Message.all
        render json: @messages
    end
    
    def create
        @message = Message.new(message_params)
        @message.user = current_user
        @message.user_name = current_user.first_name
        @message.save
        conversation = Conversation.find(message_params[:conversation_id])
        if @message.save
            serialized_data = ActiveModelSerializers::Adapter::Json.new(MessageSerializer.new(@message)).serializable_hash
            MessagesChannel.broadcast_to conversation, serialized_data
            render json: @message
            
        end
    end

    private

        def message_params
            params.require(:message).permit(:text, :user_id, :user_name, :conversation_id)
        end
end
