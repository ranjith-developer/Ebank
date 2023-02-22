import './index.css'

const NotFound = () => (
  <div className="nf-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
      alt="not found"
      className="nf-image"
    />
    <h1 className="nf-msg">Page Not Found</h1>
    <p className="nf-info">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
