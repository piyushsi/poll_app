class VotesController < ApplicationController
  before_action :logged_in?
  def create
    @poll = Poll.find(params[:vote][:poll_id])
    @vote = Vote.find_by( poll_id: @poll.id,users_id:current_user.id)
    unless has_user_voted?(@vote)
      params[:vote][:users_id] = current_user.id
      @vote = Vote.new(vote_params)

      if @vote.save
        @option = @poll.options.detect{ |option| option.id == @vote.options_id}
        @option.increment!(:vote_count)
        render status: :ok, json: { notice: "You have voted successfully" }
      else
        render status: :unprocessable_entity, json: { errors: @vote.errors.full_messages }
      end
    end
  end


  private
  def has_user_voted?(vote)
    vote
  end

  def vote_params
    params.required(:vote).permit(:poll_id, :options_id, :users_id)
  end
end