
export default function Nav2() {
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: "gainsboro" }}>
        <div className="container align-items-center">
          <a className="navbar-brand fw-bold me-2" href="#">
            <img src="/public/OfficialLogo.png" alt="Visit Egypt Logo" width="60" />
          </a>

          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavDesktop"
            aria-controls="offcanvasNavDesktop"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-none d-lg-flex w-100 align-items-center">
            <ul className="navbar-nav mx-auto mb-0">
              <li className="nav-item"><a className="nav-link" href="#">Tour Packages</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Places To Visit</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Events</a></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="moreDropdown" role="button" data-bs-toggle="dropdown">
                  More
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Visit Egypt Free Guide</a></li>
                  <li><a className="dropdown-item" href="#">Useful Information</a></li>
                  <li><a className="dropdown-item" href="#">Blog</a></li>
                </ul>
              </li>
              <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
            </ul>

            <div className="d-flex gap-2 ms-3">
              <div className="dropdown">
                <a
                  href="#"
                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center fs-5 p-0 dropdown-toggle no-caret"
                  style={{ aspectRatio: "1/1", width: "50px" }}
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-search"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end p-3">
                  <input type="text" className="form-control" placeholder="Search..." />
                </div>
              </div>

              <div className="dropdown">
                <a
                  href="#"
                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center fs-5 p-0 dropdown-toggle no-caret"
                  style={{ aspectRatio: "1/1", width: "50px" }}
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-user"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#"><i className="fas fa-sign-in-alt me-2 text-secondary"></i> Login</a></li>
                  <li><a className="dropdown-item" href="#"><i className="fas fa-user-plus me-2 text-secondary"></i> Register</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavDesktop" aria-labelledby="offcanvasNavDesktopLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold" id="offcanvasNavDesktopLabel">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link" href="#">Tour Packages</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Places To Visit</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Events</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}


