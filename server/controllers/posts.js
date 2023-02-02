import Post from '../models/Post.js'

// create

export const createPost = async (request, response) => {
  try {
    const { userId, description, picturePath } = request.body
    const user = await User.findbyId(userId)
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    })
    await newPost.save()

    const post = await Post.find()
    response.status(201).json(post)
  } catch (error) {
    response.status(409).json({ message: error.message })
  }
}

// read 
export const getFeedPosts = async (request, response) => {
  try {
    const post = await Post.find()
    response.status(200).json(post)
  } catch (error) {
    response.status(404).json({ message: error.message })
  }
}

export const getUserPosts = async (request, response) => {
  try {
    const { userId } = await request.params
    const post = await Post.find({ userId })
    response.status(200).json(post)
  } catch (error) {
    response.status(404).json({ message: error.message })
  }
}

// update 
export const likePost = async (request, response) => {
  try {
    const { id } = request.params;
    const { userId } = request.body;
    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )

    response.status(200).json(updatedPost)
  } catch (error) {
    response.status(404).json({ message: error.message })
  }
}