export const AboutPage = () => {
  return (
    <>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Left side*/}
        <div className="flex flex-col justify-start h-full w-[50%] px-8 py-20">
          <h2 className="text-2xl md:text-5xl lg:text-6xl px-2 py-2 font-bold tracking-tight">
            Passionate About
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}
              Exploration
            </span>
          </h2>
          <p className="px-2 py-2 text-lg text-muted-foreground leading-relaxed">
            We are Julius and Lola, two students based in Würzburg. Last year
            we've decided to start a new hobby, which we believe everybody has
            inside their veins: travelling! So we've booked our first adventure
            besides from "holidays", to the beautifull islands of Norway -
            lofotens. Bevore beginning that trip, Julius bought a camera, and so
            the lust of travelling and exploring the world grew even further.
          </p>
          <p className="px-2 py-2 text-lg text-muted-foreground leading-relaxed">
            On this blog, we want to share the spirit of travelling and
            showcasing our best photos we took while being around (as well as
            local).
          </p>
          <h2 className="text-2xl md:text-5xl lg:text-6xl px-2 py-2 font-bold tracking-tight">
            The
            <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
              {" "}
              Gear
            </span>{" "}
            we use
          </h2>
          <p className="px-2 py-2 text-lg text-muted-foreground leading-relaxed">
            All started with an good old Sony Alpha 6000 camera and the well
            known kit-lens it comes with. With that setup we still captured some
            beautiful shots on lofoten (it's hard to shoot bad pictures there
            some need to say...), but over time, we wanted to have more
            professional gear - especially gear that you can also use on bad
            weather!
          </p>
          <p className="px-2 py-2 text-lg text-muted-foreground leading-relaxed">
            Thus, our next iteration was the Fujifilm X-T3, which has shortly
            been replaced with it's successor, the X-T5.
          </p>
          <h2 className="text-2xl md:text-5xl lg:text-6xl px-2 py-2 font-bold tracking-tight">
            Follow us on
            <span
              className="
              bg-gradient-to-r from-indigo-500 via-red-500 to-yellow-500 
              bg-[length:200%_100%] bg-clip-text text-transparent 
              transition-[background-position] duration-500 
              bg-left hover:bg-right
              cursor-pointer
            "
            >
              {" "}
              <a href="https://www.instagram.com/">Instagram</a>
            </span>
          </h2>
          <p className="px-2 py-2 text-lg text-muted-foreground leading-relaxed">
            Our recent photos and videos are uploaded on Instagram, while this
            website is not updated as often. Come and leave a follow!
          </p>
          <div className="px-2 py-2 flex items-center justify-center">
            <a
              href="https://www.instagram.com/"
              className="[&>svg]:h-15 [&>svg]:w-40 bg-white hover:-translate-y-2 hover:scale-110 bg-gradient-to-r from-indigo-500 via-red-500 to-yellow-500 transition-color ease-in-out duration-500 rounded-full "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
          </div>
        </div>
        {/* Right side - only for the picture
        TODO: Upload picture from us! 
        */}
        <div className="flex items-center justify-center w-[50%] h-full">
          <div className="h-[80%] w-[80%] rounded-3xl shadow-2xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2835&auto=format&fit=crop"
              alt="Travel adventure"
            />
          </div>
        </div>
      </div>
    </>
  );
};
