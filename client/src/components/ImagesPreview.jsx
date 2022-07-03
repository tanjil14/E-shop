const ImagesPreview = ({ url, heading }) => {
  return (
    <div>
      {url && (
        <div>
          <h1 className="right-heading">{heading}</h1>
          <div className="preview-image">
            <img src={url} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesPreview;
