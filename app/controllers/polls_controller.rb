class PollsController < ApplicationController
  before_action :logged_in?, except: [:index]
  def index
    @polls = Poll.all
    render status: :ok, json: {polls: @polls}
  end

  def create
    params[:poll][:user_id] = current_user.id
    params[:poll][:users_id]= current_user.id
    puts poll_params
    @poll = Poll.new(poll_params)
    if @poll.save
      render status: :ok, json: { notice: "Poll successfully created!", poll: @poll }
    else
      render status: :unprocessable_entity, json: { errors: @poll.errors.full_messages }
    end
  end

  def show
    @poll = Poll.find(params[:id])
    @options = @poll.options
    render status: :ok, json: { poll: @poll, options: @options}
  end

    private
    
    def poll_params
      params.required(:poll).permit(:question, :user_id, options_attributes: [:name])
    end

  
end