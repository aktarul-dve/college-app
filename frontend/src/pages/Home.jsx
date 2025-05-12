import React from 'react';
import { Helmet } from 'react-helmet';
import Carousel from '../Home/Carousel';
import About_College from '../Home/About_College';
import Notice from '../Home/Notice';
import Albums from '../Home/Albums';
import News_Events from '../Home/News_Events';

function Home() {
  return (
    <div>
      <Helmet>
        <title>নেকমরদ বঙ্গবন্ধু সরকারি কলেজ</title>
        <meta name="description" content="Official homepage of Thakurgaon Govt. College. Get updates on notices, news, events and more." />
        <meta name="keywords" content="Thakurgaon College, Govt College, College BD, TGC Notice, Student Result" />
      </Helmet>

      <Carousel/>
      <About_College/>
      <Notice/>
      <Albums/>
      <News_Events/>
    </div>
  );
}

export default Home;
