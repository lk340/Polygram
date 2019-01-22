class Api::SessionsController < ApplicationController
  def create
    # sign in
    username = params[:user][:username]
    password = params[:user][:password]
    email = params[:user][:email]
    @user = User.find_by_credentials(username, password, email)

    if @user
      sign_in(@user)
      render "api/users/show"
    else
      render json: "Invalid username, email, and/or password. Please try again.", status: 401
    end
  end

  def destroy
    # sign out
    if current_user
      sign_out
      render json: {}
      # render json: current_user.id
    else
      render json: ["You're not logged in!"], status: 404
    end
  end
end

# $.ajax({
#   method: "DELETE",
#   url: "/api/session",
#   data: { user: { username: "Loyd", password: "starwars", email: "aaa" } }
# })