import React from 'react'
import ReactPlayer from 'react-player'
import StarYellow from "@assets/images/icons/star_yellow.png";
const VideoPlayer = ({url}: any) => {
  return (
    <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={url}
          width='100%'
          height='450px'
          controls
        />
      </div>
  )
}

export default VideoPlayer