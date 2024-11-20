import PropTypes from 'prop-types';

const NewsItem = ({ title, description, src, url }) => {
  return (
    <div
      className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2"
      style={{ maxWidth: '360px' }}
    >
      <img
        src={src}
        style={{ height: '200px', width: '345px' }}
        className="card-img-top"
        alt="News thumbnail"
      />
      <div className="card-body">
        <h5 className="card-title">
          {title ? title.slice(0, 50) : 'Untitled'}
        </h5>
        <p className="card-text">
          {description
            ? description.slice(0, 90)
            : 'It is information about something that has just happened.'}
        </p>
        <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
};

// Prop validation
NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string.isRequired, // Images are usually required
  url: PropTypes.string.isRequired,
};

// Default props
NewsItem.defaultProps = {
  title: 'Default Title',
  description: 'Default description for the news.',
};

export default NewsItem;
