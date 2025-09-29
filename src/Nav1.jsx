
function Nav1() {
  return (
    <div className="py-3" style={{ backgroundColor: "#313041" }}>
      <div className="container">

        <div className="d-flex d-lg-none">
          <a href="#" className="text-light me-3 social-link">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-light me-3 social-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-light me-3 social-link">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-light social-link">
            <i className="fab fa-pinterest"></i>
          </a>
        </div>


        <div className="d-none d-lg-flex flex-wrap justify-content-between align-items-center small text-light">
          <div className="mb-2 mb-lg-0">
            <i className="fas fa-phone-alt text-warning"></i>
            <a href="tel:+13393373434" className="contact-link ms-1">
              +1 (339) 337-3434
            </a>
            <span className="ms-3">
              <i className="fas fa-envelope text-warning"></i>
              <a href="mailto:info@visitegypt.com" className="contact-link ms-1">
                info@visitegypt.com
              </a>
            </span>
          </div>

          <div className="fw-bold mb-2 mb-lg-0 text-center">
            The Official Site of Visit Egypt
          </div>

          <div className="d-flex align-items-center">
            <a href="#" className="text-light ms-3 social-link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-light ms-2 social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="btn btn-warning btn-sm ms-3 fw-bold">
              PLAN YOUR TRIP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav1;
