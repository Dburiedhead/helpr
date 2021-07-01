class Api::V1::MessagesController < ApplicationController
    before_action :authenticate_user!

    def index
        @messages = Message.all
        render json: @messages
    end
    
    def create
        @message = Message.new(message_params)
        @message.user = current_user
        @message.save
        conversation = Conversation.find(message_params[:conversation_id])
        if @message.save
            puts "successfully saved a message!"
            serialized_data = ActiveModelSerializers::Adapter::Json.new(MessageSerializer.new(@message)).serializable_hash
            MessagesChannel.broadcast_to conversation, serialized_data
            puts "SERIALIZED DATA #{@message.conversation_id}"
            render json: @message
            
        end
    end

    private
        # def set_message
        #     @message = Message.find(params[:id])
        # end

        def message_params
            params.require(:message).permit(:text, :user_id, :conversation_id)
        end
end
