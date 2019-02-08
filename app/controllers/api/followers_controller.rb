class Api::FollowersController < ApplicationController
  def create
    @follower = Follower.new(follower_params)

    if @follower.save
      render :show
    else
      render json: @follower.errors.full_messages, status: 422
    end
  end

  def destroy
    @follower = Follower.find(params[:id])

    if @follower
      @follower.destroy
      render :delete
    else
      render json: @follower.errors.full_messages, status: 404
    end
  end

  private
  def follower_params
    params.require(:follower).permit(:user_id, :follower_id)
  end
  
end