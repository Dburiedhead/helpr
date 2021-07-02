require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  test "text should exist" do
    message = Message.new
    assert_not_nil message.text, "Message needs a text"
  end

  test "conversation_id should exist" do
    message = Message.new
    assert_not_nil message.conversation_id, "Message needs a conversation_id"
  end

  test "user_id should exist" do
    message = Message.new
    assert_not_nil message.user_id, "Message needs a user_id"
  end
end
