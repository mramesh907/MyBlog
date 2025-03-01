import React from 'react'
import appWriteService from '../appwrite/config.js'
import {Link} from 'react-router-dom'

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/posts/${$id}`}>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          className="rounded-t-lg"
          src={appWriteService.getImage(featuredImage)}
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </div>
      </div>
    </Link>
  )
}

export default PostCard