import Images from "../../assets/Images";
import "./NotFound.scss";

function NotFound() {
    return (
        <div className="not-found">
            <img
                src={Images.not_found}
                className="not-found-image"
                alt="not-found"
            />
        </div>
    );
}

export default NotFound;
