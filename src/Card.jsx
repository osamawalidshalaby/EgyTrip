import { Camera, Heart } from "lucide-react";
import { useState } from "react";

export default function Card({card}) {
    const [active , setActive] = useState(false)
    return (
        <div className="col-lg-4 col-md-6">
                <div className="tour-card">
                    <div className="card-image pharaoh-bg" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${card.image})` }}>
                        <span className="featured-badge">FEATURED</span>
                        <button className={`${active ? 'text-white bg-danger ' : ''}  heart-icon`}>
                            <Heart onClick={() => setActive(active => !active)}/>
                        </button>
                        <div className="media-icons">
                            <span className={` media-icon`} >
                                <Camera /> 
                            </span>
                        </div>
                    </div>
                    <div className="card-content">
                        <h3 className="tour-title">{card.title}</h3>
                        <div className="price-section">
                            <span className="price-label">From</span>
                            <span className="price">{card.price}</span>
                        </div>
                        <button className="explore-btn">
                            Explore
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
    )
}