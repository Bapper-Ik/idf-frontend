import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-900 py-16">
        <div className="mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">About Us</h2>
          <p className="texr-lg sm:text-3xl text-green-300 px-3 mb-8 text-center">
            The nature of IKARA DA'AWA FOUNDATION is a non-profitable and
            political organization, but purely religious, humanitarian and
            charitable in nature
          </p>
          <span className="uppercase text-gray-100 text-center block text-2xl font-mono">
            No.25, Kubau road gra, ikara, kaduna state, nigeria
          </span>
          <span className="text-center text-gray-100 text-lg">
            ikaradaawahfoundation@gmail.com, +234-703-817-9293
          </span>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 mx-3">
              <h3 className="text-2xl font-bold underline pb-2 text-green-800">
                Our Mission
              </h3>
              <p className="text-gray-600 text-2xl pb-4 font-bold">
                To spread Islamic teachings and support the local community
                through education, outreach, and charitable activities.The
                organization was established with the following missions:
              </p>
              <ul>
                <li className="list-disc text-lg leading">
                  to provide educational and special supports to the reverts to
                  islam and less priveleged populace
                </li>
                <li className="list-disc text-lg ">
                  to contribute to the self-reliance and empowerment of
                  vulnerable and under privileged individuals and reverts,
                  through skills.
                </li>
                <li className="list-disc text-lg ">
                  to render humanitarian service assistance such as:
                  construction of boreholes, schools, mosques, distribution of
                  learning matrerials, food stuffs and drugs to the needers
                </li>
                <li className="list-disc text-lg ">
                  to propagate islamic teachings, and organize islamic training
                  workshops among other islamic organizations
                </li>
                <li className="list-disc text-lg ">
                  to encourage, inspire and nuture the youths to become
                  knowledgeable through organizing islamic and other academic
                  competitions among other islamic schools.
                </li>
                <li className="list-disc text-lg ">
                  to encourage free teaching of morality, DA'AWAH and other
                  religious values such as: neighbourhood, peaceful means of
                  resolving conflict among the muslim ummah
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 mx-3">
              <h3 className="text-2xl font-bold underline pb-4 text-green-800">
                Our Vision
              </h3>
              <p className="text-gray-900 text-lg leading-10">
                "To illuminate the world with the light of Islam, empowering
                individuals and communities to live a purposeful life, guided by
                the Quran and the teachings of the Prophet Muhammad (peace be
                upon him), and to foster a global community of compassionate,
                knowledgeable, and spiritually upright Muslims."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
            Meet Our Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center mx-4 sm:mx-0">
              <img
                src="/idf-1-removebg-preview.png"
                alt="Team Member 1"
                className="w-full object-contain rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-bold">
                Late. Sheikh Muhammad Bello Hamza Ikara
              </h3>
              <p className="text-gray-600">Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center mx-4 sm:mx-0">
              <img
                src="/idf-4-removebg-preview.png"
                alt="Team Member 2"
                className="w-full object-contain rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-bold">
                Malam Abdulhamid Dahir Ikara
              </h3>
              <p className="text-gray-600">President</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center mx-4 sm:mx-0">
              <img
                src="/idf-3-removebg-preview.png"
                alt="Team Member 3"
                className="w-full object-contain rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-bold">Malam Muhammad Sarki Ikara</h3>
              <p className="text-gray-600">Secretary</p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center mx-4 sm:mx-0">
              <img
                src="/idf-5-removebg-preview.png"
                alt="Team Member 4"
                className="w-full object-contain rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-bold">Malam Muhammad</h3>
              <p className="text-gray-600">Chief Imam</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
            What People are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mx-4 sm:mx-0">
              <blockquote className="text-lg text-gray-600">
                "Ikara Da'awah Foundation has been instrumental in supporting
                our community's educational needs."
              </blockquote>
              <cite className="text-gray-800">
                — John Smith, Local Community Leader
              </cite>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mx-4 sm:mx-0">
              <blockquote className="text-lg text-gray-600">
                "Their dedication to spreading Islamic teachings is truly
                inspiring."
              </blockquote>
              <cite className="text-gray-800">
                — Aisha Muhammad, Community Member
              </cite>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mx-4 sm:mx-0">
              <blockquote className="text-lg text-gray-600">
                "We appreciate their commitment to supporting local charitable
                initiatives."
              </blockquote>
              <cite className="text-gray-800">
                — Ahmed Ali, Local Business Owner
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-900 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8">
            Support Ikara Da'awah Foundation's efforts to educate, uplift, and
            serve the community.
          </p>
          <Link
            to="#"
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full text-lg transition duration-300"
          >
            Donate
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
