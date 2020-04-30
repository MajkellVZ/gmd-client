import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getImages, createMedia, deleteMedia} from "../actions/media";
import NavBar from "../components/NavBar";
import Alert from "../components/Alert";

const Media = ({id, media, getImages, createMedia, deleteMedia}) => {
    useEffect(() => {
        getImages(id);
    }, [getImages]);

    const [formData, setFormData] = useState({
        media: []
    });

    const onChooseImage = (e) => {
        setFormData({...formData, media: e.target.files});
    };

    const onUpload = async () => {
        await createMedia(id, formData);
        await getImages(id);
    };

    const onDelete = (media_id) => {
        deleteMedia(media_id);
        getImages(id);
    };

    return (
        <div>
            <NavBar/>
            <Alert/>
            <Fragment>
                <br/>
                <input type={"file"} name={"media"} onChange={e => onChooseImage(e)} multiple={true}/>
                <input type={"submit"} value={"Upload"} onClick={() => onUpload()}/>
                <br/>
                {media.medias && media.medias.map(img => (
                    <div>
                        <img alt={id} src={`http://localhost:5000/api/media/${img.image_path}`}
                             style={{width: '200px'}}/>
                        <input type={"submit"} className={'btn btn-danger'} value={'x'}
                               onClick={() => onDelete(img.id)}/>
                    </div>
                ))}
            </Fragment>
        </div>
    )
};

Media.propTypes = {
    id: PropTypes.object.isRequired,
    getImages: PropTypes.func.isRequired,
    media: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    createMedia: PropTypes.func.isRequired,
    deleteMedia: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
    id: props.match.params.id,
    auth: state.auth,
    media: state.media,
});

export default connect(mapStateToProps, {getImages, createMedia, deleteMedia})(Media);