import React from 'react';
import heroImage from '../assets/heroimage.webp';

const Hero = () => {
  return (
    <section className='d-flex justify-content-center align-items-center min-vh-100 position-relative'
    style={{
        backgroundImage:`url(${heroImage})`,
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat'
    }}>
        <div className='position-absolute bg-dark w-100 h-100 opacity-50'></div>
        <div className='container position-relative text-center text-white'>
            <div className='row justify-content-center'>
                <div className='col-lg-8'>
                   <h1 className='fw-bold mb-4'>Welcome to MailFlow</h1>
                   <p className='lead mb-5 fs-4'>Create stunning email campaigns that drive results</p>
                   <div className='hero-buttons'>
                    <a href='/auth' className='btn btn-primary btn-lg fw-semibold px-5 py-3 me-3 mb-3'>Sign Now</a>
                    <a href='/demo' className='btn btn-lg btn-outline-light px-5 py-3 mb-3 fw-semibold'>Demo</a>
                   </div>

                </div>
            </div>
        </div>

    </section>
  );
};

export default Hero;