import React, { useEffect, useState } from 'react';
import './Carousel.css';

const Carousel = ()=> {
    const [images, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    const fetchImages = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await res.json();

        const result = data.filter((i)=> i.id < 8).map((it)=>it.url)
        console.log(result);
        setImages(result);
    }
    
    useEffect(()=>{
        fetchImages();
    }, []);

    
    useEffect(()=>{
    const imagesLoop = setInterval(()=>{
        handleClick('right')
    }, 2000);


    return(()=>{
        clearInterval(imagesLoop);
    })
    }, [index]);


    const handleClick = (dir) => {
       // console.log('curr index', index)
        let lastInd = images.length - 1;
        if(dir === 'left') {
            if(index === 0) {
                setIndex(lastInd)
            } else {
                setIndex((ind)=> ind - 1)
            }
        } else if(dir === 'right') {
            if(index === lastInd) {
                setIndex(0)
            } else {
                setIndex((ind)=> ind + 1)
            }
        }
    }




    return (

        <>
        <div className='w-100 slider-container'>

        <div className='slider-wp d-flex'>
            <button className='me-2 btn left' onClick={()=>handleClick('left')}>{'<'}</button>
            <img src={images[index]} alt='carousel-images' className='slider-image' />
            <button className='ms-2 btn right' onClick={()=>handleClick('right')}>{'>'}</button>
        </div>
        </div>




        {/* <div id="carouselExampleIndicators slider-container" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner w-100">
    <div className="carousel-item active">
      <img src={images[index]} className="d-block w-100" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> */}

        
</>
    )
}

export default Carousel;