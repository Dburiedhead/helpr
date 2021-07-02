require 'test_helper'

class ConversationTest < ActiveSupport::TestCase
  test "requester_id should exist" do
    conversation = Conversation.new
    assert_not_nil conversation.requester_id, "Conversation needs a requester_id"
  end

  test "helpr_id should exist" do
    conversation = Conversation.new
    assert_not_nil conversation.helpr_id, "Conversation needs a helpr_id"
  end

  test "request_id should exist" do
    conversation = Conversation.new
    assert_not_nil conversation.request_id, "Conversation needs a request_id"
  end
end
