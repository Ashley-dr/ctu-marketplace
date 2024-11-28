/* eslint-disable no-unused-vars */
import { Img } from "@chakra-ui/react";
import React from "react";

function About() {
  return (
    <div className="font-quicksand">
      <figure>
        <article className="grid space-y-2 justify-self-center m-5">
          <p className="text-center text-2xl font-extrabold">The Team</p>
          <p className="text-center font-thin">Who we Are</p>
        </article>
      </figure>
      <figure className="grid space-y-5 mb-20">
        <figure className="grid grid-cols-2 justify-items-center justify-self-center space-x-10">
          <figure>
            <Img
              src="https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/373551365_6290098851111853_477359827692032976_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEidcEGSL2LWOmlbKOJ9Zh35etTZmRTDBLl61NmZFMMEtzvXU4x43-ZmYj_z6fgcwCHT47CkX4CYDJJUg3VximE&_nc_ohc=qgzROx1JrJAQ7kNvgEsph3e&_nc_zt=23&_nc_ht=scontent.fmnl13-1.fna&_nc_gid=AHXUaj26aFtPRI2i3cdzIWv&oh=00_AYAxpKv-BEuEzNvM2N953XVEe-tOU3c4VRZoMIlPd4OumA&oe=674DECA8"
              className="bg-cover bg-fixed bg-no-repeat ssm:h-44 ssm:w-64 lg:h-80 lg:w-80  "
            />
          </figure>
          <figure className="border-r-0 border-l-0 border-b-0 border   flex items-center justify-center">
            <article className=" space-y-2 font-poppins">
              <p className="ssm:text-[15px] lg:text-xl font-semibold">
                Ashley Rodriguez
              </p>
              <p className="ssm:text-[10px] lg:text-sm font-thin">Developer</p>
              <p className="ssm:text-[8px] lg:text-sm font-extralight">
                09425388991 / ashleydurano1234@gmail.com
              </p>
            </article>
          </figure>
        </figure>

        <figure className="grid grid-cols-2  justify-items-center justify-self-center">
          <figure className="border-r-0 border-l-0 border-b-0 border flex items-center justify-center">
            <article className="space-y-2 font-poppins">
              <p className="ssm:text-[15px] lg:text-xl font-semibold">
                Mary Luz Econas
              </p>
              <p className="ssm:text-[10px] lg:text-sm font-thin">
                Capstone Leader
              </p>
              <p className="ssm:text-[8px] lg:text-sm font-extralight">
                09xxx / xxx4@gmail.com
              </p>
            </article>
          </figure>
          <figure className="">
            <Img
              src="https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/459942202_2276280529390425_2176406076236823835_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeHz11Vglqlpj44cjjJAaZFSJdaSY-nIwzAl1pJj6cjDMBCVRkEUn5ZjbPuCQvQzbShJ41EebTlTVY1Ra22Xwgys&_nc_ohc=HyTqSOJHVAUQ7kNvgEdn_14&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&_nc_gid=AvHYsy7F6qvaC93_0Ts7ra4&oh=00_AYBHu-G6Hpsc8GAw4jwIMvHUnvSvgwVwhFtnnbKeLgcLsQ&oe=674E0DA5"
              className="bg-cover bg-fixed bg-no-repeat ssm:h-44 ssm:w-64 lg:h-80 lg:w-80"
            />
          </figure>
        </figure>

        <figure className="grid grid-cols-2 justify-items-center justify-self-center space-x-10">
          <figure>
            <Img
              src="https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-6/458700236_3935126786721710_6169484424007131161_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGSIUL8UcgzNnpoUoi0a4mz_ftIbS8w45X9-0htLzDjlY7SlWKJiXoVEDcA3_Grwir1-7v9UAdZWuzo4PkOMeHI&_nc_ohc=7x_D-oG3kBIQ7kNvgEvP0H_&_nc_zt=23&_nc_ht=scontent.fceb6-1.fna&_nc_gid=A9H3YK-snn9XL-a26XbVNvI&oh=00_AYBYCCxCtYU-93pLXgHX8nEBrYAK3W3eXzcb5CZphI0nAw&oe=674E0A6B"
              className="bg-cover bg-fixed bg-no-repeat ssm:h-44 ssm:w-64 lg:h-80 lg:w-80  "
            />
          </figure>
          <figure className="border-r-0 border-l-0 border-b-0 border   flex items-center justify-center">
            <article className=" space-y-2 font-poppins">
              <p className="ssm:text-[15px] lg:text-xl font-semibold">
                Shane V. Feje
              </p>
              <p className="ssm:text-[10px] lg:text-sm font-thin">
                Documentation / Researcher
              </p>
              <p className="ssm:text-[8px] lg:text-sm font-extralight">
                09xxxxx / xxxx@gmail.com
              </p>
            </article>
          </figure>
        </figure>

        <figure className="grid grid-cols-2  justify-items-center justify-self-center">
          <figure className="border-r-0 border-l-0 border-b-0 border flex items-center justify-center">
            <article className="space-y-2 font-poppins">
              <p className="ssm:text-[15px] lg:text-xl font-semibold">
                Dean Joshua Repalam
              </p>
              <p className="ssm:text-[10px] lg:text-sm font-thin">
                Documentation / Researcher
              </p>
              <p className="ssm:text-[8px] lg:text-sm font-extralight">
                09xxxxx / xxxx@gmail.com
              </p>
            </article>
          </figure>
          <figure className="">
            <Img
              src="https://scontent.fceb6-1.fna.fbcdn.net/v/t1.6435-9/41804310_2030077360655697_7687624519309066240_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHkCoUQ2Hi2OHyml6JZ67PruGt9Q2BDZ4-4a31DYENnj7HTaiixAf0cDScB0h0BUjmXrGfFBiNBA6ZYJBfF8uON&_nc_ohc=gtVqwipF4eQQ7kNvgEov6V8&_nc_zt=23&_nc_ht=scontent.fceb6-1.fna&_nc_gid=AByEL3N_k5YPZVc2V4Dzq-j&oh=00_AYAxQhC8xFtmO7_iMwzzHjgg4lfU3rVCjhOs8svuDZpy9w&oe=676F9244"
              className="bg-cover bg-fixed bg-no-repeat ssm:h-44 ssm:w-64 lg:h-80 lg:w-80"
            />
          </figure>
        </figure>

        <figure className="grid grid-cols-2 justify-items-center justify-self-center space-x-10">
          <figure>
            <Img
              src="https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/454648102_2031726283952495_5237482912463017706_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHvpjFhL1-4BHhTMt_MQ3AdBGjZh3YiC8YEaNmHdiILxi0BTG-JjufvArR7_zhx6dU6W3NDFenXsrEZDoqSHbhh&_nc_ohc=aE24d3UVAZoQ7kNvgGsvghV&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&_nc_gid=A8CEupixIaI87gb7O5JxvLo&oh=00_AYDF_ja46sgSrztrvfBNuyplIhH_mVb7WnL9mRi8sf6IWA&oe=674E1337"
              className="bg-cover bg-fixed bg-no-repeat ssm:h-44 ssm:w-64 lg:h-80 lg:w-80  "
            />
          </figure>
          <figure className="border-r-0 border-l-0 border-b-0 border   flex items-center justify-center">
            <article className=" space-y-2 font-poppins">
              <p className="ssm:text-[15px] lg:text-xl font-semibold">
                Jahasel Jhims Villamor
              </p>
              <p className="ssm:text-[10px] lg:text-sm font-thin">
                Documentation / Researcher
              </p>
              <p className="ssm:text-[8px] lg:text-sm font-extralight">
                09xxxxx / xxxx@gmail.com
              </p>
            </article>
          </figure>
        </figure>
      </figure>
    </div>
  );
}

export default About;
