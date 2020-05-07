import React, {useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getImages} from "../actions/media";

const CarouselImage = ({id, getImages, media, showArrows}) => {
    useEffect(() => {
        getImages(id);
    }, [getImages]);

    return (
        <div className={'row'}>
            <div className={'col-md-10 offset-md-2'}>
                <Carousel
                    showThumbs={false}
                    showArrows={showArrows}
                >
                    {media.medias && media.medias.map(image => (
                            <div key={image.id}>
                                <img src={`https://gmd-server.xyz/api/media/${image.image_path}`} key={image.id}/>
                            </div>
                        )
                    )}
                </Carousel>
            </div>
        </div>
    )
};

CarouselImage.propTypes = {
    id: PropTypes.object.isRequired,
    getImages: PropTypes.func.isRequired,
    media: PropTypes.object.isRequired,
    showArrows: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => ({
    id: props.id,
    media: state.media
});

export default connect(mapStateToProps, {getImages})(CarouselImage);