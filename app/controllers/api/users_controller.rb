class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])

    if @user
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  
  def create
    @user = User.new(user_params)
    # @user.photo.attach(io: File.open("#{Rails.root}/app/assets/images/default_profile_picture.jpg"), filename: "default_profile_picture.jpg")
    if @user.save
      sign_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:user][:id])

    if @user.update(user_params)
      render :edit
    else
      debugger
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    # params.require(:user).permit(:username, :password, :email, :name, :biography, :image_url)
    params.require(:user).permit(:username, :password, :email, :name, :biography, :profile_picture)
  end
end

# $.ajax({
#   method: "POST",
#   url: "/api/users",
#   data: { user: { username: "Loyd", password: "starwars", email: "aaa" } }
# })