class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
    render :index
  end

  def show
    @post = Post.find(params[:id])

    if @post
      render :show
    else
      render json: @post.errors.full_messages, status: 404
    end
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  # def edit
  #   @post = post.find(params[:id])
  # end

  def update
    @post = Post.new(post_params)

    if @post.save
      render :edit
    else
      render json: @post.errors.full_messages, status: 404
    end
  end

  def destroy
    @post = Post.find(params[:id])

    if @post
      @post.destroy
      render :delete
    else
      render json: @post.errors.full_messages, status: 404
    end
  end

  private
  def post_params
    params.require(:post).permit(:caption, :user_id, :photo)
  end
end
