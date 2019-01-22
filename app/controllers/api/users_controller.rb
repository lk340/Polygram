class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end

# $.ajax({
#   method: "POST",
#   url: "/api/users",
#   data: { user: { username: "Loyd", password: "starwars", email: "aaa" } }
# })