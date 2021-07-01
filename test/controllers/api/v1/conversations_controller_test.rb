require 'test_helper'

class Api::V1::ConversationsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  # index
  test "should get index as json" do
    get :index
    assert_equal "application/json", response.content_type include()
  end

  test "should return success" do
    assert_response :success
    get :index
  end

  # show
  test "should return conversation" do
    conversation = conversations(:one)
    get conversation_url(conversation)
    assert_response :success
  end
  
  test "should show conversation that includes current user" do
    get :show
    assert_equal current_user.id, conversation.helpr_id || conversation.requester_id
  end
  
  # create
  test "should create conversation" do
    assert_difference('Conversation.count') do
      post '/api/v1/conversations', params: { conversation: { helpr_id: dianka.id, requester_id: juliette.id, title: requests(:one).title, selected: false } }, as: :json
    end
    
    assert_response :suces
  end
end
