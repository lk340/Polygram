class SessionsController < ApplicationController
  def create
    username = params[:user][:username]
    password = params[:user][:password]
    @user = User.find_by_credentials(username, password)

    if @user
      sign_in(@user)
      render :show
    else
      render json: "Wrong username, email, and/or password. Please try again."
    end
  end

  def destroy
    sign_out
    render :index
  end
end
