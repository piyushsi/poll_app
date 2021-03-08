class VotesController < ApplicationController
  before_action :logged_in?
  def create
    @poll = Poll.find(params[:vote][:poll_id])

    unless has_user_voted?(@poll)
      params[:vote][:users_id] = current_user.id
      puts (vote_params)
      @vote = Vote.new(vote_params)

      if @vote.save
        @option = @poll.options.detect{ |option| option.id == @vote.option_id}
        @option.increment!(:vote_count)
        render status: :ok, json: { notice: "You have voted successfully" }
      else
        render status: :unprocessable_entity, json: { errors: @vote.errors.full_messages }
      end
    end
  end


  private
  def has_user_voted?(poll)
    poll.users_id && poll.users_id.include?(current_user.id)
  end

  def vote_params
    params.required(:vote).permit(:poll_id, :options_id, :users_id)
  end
end