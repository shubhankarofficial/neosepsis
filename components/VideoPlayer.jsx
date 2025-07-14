const VideoPlayer = ({ video }) => {
    return (
      <div className="flex items-center mb-8">  
        <div className="flex-1 min-w-0 mr-8"> 
          <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
          <video controls width="100%">
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-600">{video.description}</p>
        </div>
      </div>
    );
  };
  
  export default VideoPlayer;