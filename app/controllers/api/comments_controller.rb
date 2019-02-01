class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end
  
  def update
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      render :edit
    else
      render json: @comment.errors.full_messages, status: 404
    end
  end
  
  def destroy
    @comment = Comment.find(params[:id])

    if @comment
      @comment.destroy
      render :delete
    else
      render json: @comment.errors.full_messages, status: 404
    end
  end
  
  private
  def comment_params
    params.require(:comment).permit(:comment)
  end
  
end
