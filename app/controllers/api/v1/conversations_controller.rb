class Api::V1::ConversationsController < ApplicationController
    before_action :set_conversation, only: [:show, :destroy]

    def index
        @conversations = Conversation.all
        render json: @conversations
    end

    def show
        @conversation = Conversation.find(params[:id])
        # render json: ConversationSerializer.new(@conversation)
        render json: @conversation
    end
    
    def create
        @conversation = Conversation.new(conversation_params)
        if @conversation.save
            serialized_data = ActiveModelSerializers::Adapter::Json.new(ConversationSerializer.new(conversation)).serializable_hash
            ActionCable.server.broadcast 'conversations_channel', serialized_data
            head :ok
        end
    end
      
    private
        def set_conversation
            @conversation = Conversation.find(params[:id])
        end

        def conversation_params
            params.require(:conversation).permit(:title, :request_id)
        end
end
