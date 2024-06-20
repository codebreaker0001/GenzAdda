
import Post from "../modles/posts.js";
import User from "../modles/user.js";


export const createPost = async (req, res) => {
    try {
        const {userId,description , picturePath} = req.body;
        const user = await User.findById(userId);
        
        const newPost = new Post({
            userId,
            firstName:user.firstName,
            lastName:user.lastName,
            location:user.location,
            occupation:user.occupation,
            description,
            picturePath,
            userPicturePath:user.picturePath,
            likes:{},
            comments:[]
        })
        
        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export const getFeedPost = async (req, res) => {
    try {


        const post = await Post.find();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};


export const getUserPost = async (req,res) =>{
    try {
        const {userId} = req.params;

        const post = await Post.find({userId});

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

export const likedPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isLiked = Boolean(post.likes.get(userId));
        
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};


export const addComments =  async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, comment } = req.body;

        // Find the post by ID
        const post = await Post.findById(postId);

        const user  = await User.findById(userId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Add the new comment
        const newComment =  `${user.firstName} ${user.lastName} : ${comment}`;

        post.comments.push(newComment);

        // Save the updated post
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
