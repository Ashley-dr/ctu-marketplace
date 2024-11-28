/* eslint-disable no-unused-vars */
import { Divider, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function Keyoffering() {
  return (
    <div className="mx-5 font-thin font-quicksand mt-10 mb-10 justify-self-center ssm:w-[330px] md:w-[500px] lg:w-[1200px]">
      <figure>
        <article>
          <p className="text-3xl font-semibold font-poppins mb-16">
            Key Offerings
          </p>
        </article>
        <article className="grid mb-5">
          <p className=" ssm:text-xs lg:text-sm mb-5">What we Provide</p>
          <p className="text-lg ssm:text-sm">
            Our platform offers a range of features to enhance your trading
            experience. <br /> From Secure transacions to personalized
            recommendations, we strive to make your <br /> online shopping
            journey enjoyable and rewarding.
          </p>
        </article>
        <Divider />
        <figure className="grid ssm:grid-cols-1 lg:grid-cols-2 mt-5">
          <article className="">
            <img
              className="bg-no-repeat bg-cover bg-center bg-fixed w-[500px] ssm:h-10 lg:h-[600px] opacity-20"
              src="https://i.pinimg.com/736x/8a/f2/dc/8af2dc6970ec293264e724f88ccb1b7b.jpg"
              alt=""
            />
          </article>
          <article>
            <article className="mb-5 mt-5">
              <article>
                <p className="text-xs mb-5 font-thin">Safety</p>
                <p className="text-sm mb-5 font-semibold">
                  Secure Transactions
                </p>
                <p className="">
                  Ensuring the safety of our users is our top priority. We
                  implement robust security measures to protect your personal
                  information and transactions, giving you peace of mind while
                  buying, selling, and trading on our platform.
                </p>
              </article>
            </article>
            <Divider />
            <article className="mb-5  mt-5">
              <article>
                <p className="text-xs mb-5 font-thin">Convenience</p>
                <p className="text-sm mb-5 font-semibold">Easy Navigation</p>
                <p className="">
                  We prioritize user experience by providing intuitive
                  navigation and search functionalities. Whether youre buying or
                  selling, our platform is designed for seamless interactions
                  and hassle-free transactions.
                </p>
              </article>
            </article>
            <Divider />
            <article className="mb-5  mt-5">
              <article>
                <p className="text-xs mb-5 font-thin">Community</p>
                <p className="text-sm mb-5 font-semibold">
                  Fostering Connections
                </p>
                <p className="">
                  Join our community-driven platform to connect with fellow
                  students, teachers, and staff members. By engaging in
                  sustainable commerce practices, you contribute to a vibrant
                  and supportive marketplace that benefits the entire CTU Danao
                  community.
                </p>
              </article>
              <figure></figure>
            </article>
            <Divider />
          </article>
        </figure>
      </figure>
    </div>
  );
}

export default Keyoffering;
