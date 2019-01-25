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
    debugger
    @post = Post.new(post_params)
    # debugger
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def edit
    @post = post.find(params[:id])
  end

  def update
    @post = Post.new(post_params)

    if @post
      render :edit
    else
      render json: @post.errors.full_messages, status: 404
    end
  end

  def destroy
    @post = Post.find(params[:id])

    if @post
      @post.destroy
      render :show
    else
      render json: @post.errors.full_messages, status: 404
    end
  end

  private
  def post_params
    params.require(:post).permit(:caption, :image_url, :user_id, :image, images: [])
  end
end
