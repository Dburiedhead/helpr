class ShownRequestsCleanupJob < ApplicationJob
  queue_as :default

  def perform(*request, counter, request_status)
    p 'Hello! from ShownRequestsCleanupJob'
    p 'Set request status to hidden'
    puts "REQUEST JOB IS #{request[0]}"
    puts "COUNTER JOB IS #{counter} "
    puts "STATUS JOB IS #{request_status} "
    # puts "REQUEST JOB IS #{counter} "
    # if counter = 0
    #   if request.fulfilled = false
    #     if request.status = opened
    #       if request.updated_at > 24.hours.ago
    #         request.status = hidden
    #       end
    #     end
    #   end
    # end
    # Do something later
  end
end
