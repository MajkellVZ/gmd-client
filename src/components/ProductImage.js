import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import axios from 'axios';

const ProductImage = ({id}) => {
    useEffect(() => {
        getMedia(id)
    }, [id]);

    const [formData, setFormData] = useState({
        media: null,
        id: null
    });

    const {media} = formData;

    const getMedia = async (id) => {
        const res = await axios.get(`http://localhost:5000/api/media/single_image/product/${id}`);
        console.log(res.data);
        res.data && setFormData({...formData, media: res.data, id: id})
    };

    return (
        <div>
            {media ?
                <img className="card-img-top" src={`http://localhost:5000/api/media/${media.image_path}?${Date.now()}`}
                     key={Date.now()} alt="Card image"/> :
                <img className="card-img-top"
                     src={`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS820ZLjEZOgW3rRxKEINY9KVmxTCh75dRo_RoO6tw591SLZQAX&${Date.now()}`}
                     alt="Card image"/>}
        </div>
    )
};

ProductImage.propTypes = {
    id: PropTypes.object.isRequired
};

export default ProductImage;